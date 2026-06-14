import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn('Supabase credentials not found. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para ativar Supabase.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl || '', supabaseAnonKey || '');

function createLocalUser(email: string, name: string, password?: string) {
  const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created_at = new Date().toISOString();
  const user = {
    id,
    email,
    created_at,
    user_metadata: { name },
    app_metadata: { provider: 'local' },
  };

  try {
    const usersStr = localStorage.getItem('local-users');
    const users = usersStr ? JSON.parse(usersStr) : {};
    users[email] = { id, name, password: password ?? null, created_at };
    localStorage.setItem('local-users', JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to persist local user', e);
  }

  localStorage.setItem('sb-auth-user', JSON.stringify(user));
  return user;
}

export const mockAuth = {
  signIn: async (email: string, password?: string) => {
    if (supabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: password || '' });
        if (error) {
          return { data: null, error };
        }
        if (data?.user) {
          mockAuth.setUser(data.user);
          return { data: { user: data.user }, error: null };
        }
      } catch (e) {
        console.warn('Supabase signIn failed, usando fallback local', e);
      }
    }

    try {
      const usersStr = localStorage.getItem('local-users');
      const users = usersStr ? JSON.parse(usersStr) : {};
      const entry = users[email];
      if (!entry) {
        return { data: null, error: { message: 'E-mail ou senha incorretos.' } };
      }

      // If password stored, validate it. Otherwise allow login by email.
      if (entry.password && password !== entry.password) {
        return { data: null, error: { message: 'E-mail ou senha incorretos.' } };
      }

      const user = { id: entry.id, email, created_at: entry.created_at, user_metadata: { name: entry.name }, app_metadata: { provider: 'local' } };
      localStorage.setItem('sb-auth-user', JSON.stringify(user));
      return { data: { user }, error: null };
    } catch (e) {
      console.error('Local signIn error', e);
      return { data: null, error: { message: 'Erro ao fazer login.' } };
    }
  },

  signUp: async (email: string, password?: string, name?: string) => {
    if (supabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || '',
          options: { data: { name: name ?? '' } },
        });

        if (error) {
          return { data: null, error };
        }

        if (data?.user) {
          mockAuth.setUser(data.user);
          return { data: { user: data.user }, error: null };
        }

        // Supabase criou uma conta, mas não retornou o usuário imediatamente.
        // Deixe o cliente tratar o fluxo comum de confirmação / login.
        return { data: null, error: null };
      } catch (e) {
        console.warn('Supabase signUp failed, usando fallback local', e);
      }
    }

    try {
      const usersStr = localStorage.getItem('local-users');
      const users = usersStr ? JSON.parse(usersStr) : {};
      if (users[email]) {
        return { data: null, error: { message: 'Já existe uma conta com esse e-mail.' } };
      }

      const user = createLocalUser(email, name ?? '', password);
      return { data: { user }, error: null };
    } catch (e) {
      console.error('Local signUp error', e);
      return { data: null, error: { message: 'Erro ao criar conta.' } };
    }
  },

  signOut: async () => {
    try {
      if (supabaseConfigured) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('sb-auth-user');
      return { error: null };
    } catch (e) {
      console.error('Local signOut error', e);
      return { error: e };
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const user = mockAuth.getUser();
    const email = user?.email;

    if (!email) {
      return { data: null, error: { message: 'Usuário não encontrado.' } };
    }

    if (supabaseConfigured) {
      try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password: currentPassword,
        });

        if (loginError || !loginData?.user) {
          return { data: null, error: { message: 'Senha atual incorreta.' } };
        }

        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          return { data: null, error };
        }

        if (data?.user) {
          mockAuth.setUser(data.user);
        }

        return { data, error: null };
      } catch (e) {
        console.error('Supabase changePassword error', e);
        return { data: null, error: { message: 'Erro ao alterar a senha.' } };
      }
    }

    try {
      const usersStr = localStorage.getItem('local-users');
      const users = usersStr ? JSON.parse(usersStr) : {};
      const entry = users[email];

      if (!entry) {
        return { data: null, error: { message: 'Usuário local não encontrado.' } };
      }

      if (entry.password !== currentPassword) {
        return { data: null, error: { message: 'Senha atual incorreta.' } };
      }

      entry.password = newPassword;
      users[email] = entry;
      localStorage.setItem('local-users', JSON.stringify(users));

      return { data: { user }, error: null };
    } catch (e) {
      console.error('Local changePassword error', e);
      return { data: null, error: { message: 'Erro ao alterar a senha.' } };
    }
  },

  updateName: async (name: string) => {
    const user = mockAuth.getUser();
    const email = user?.email;

    if (!email) {
      return { data: null, error: { message: 'Usuário não encontrado.' } };
    }

    if (supabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.updateUser({ data: { name } });
        if (error) {
          return { data: null, error };
        }

        if (data?.user) {
          mockAuth.setUser(data.user);
          return { data: { user: data.user }, error: null };
        }

        return { data: null, error: { message: 'Não foi possível atualizar o nome.' } };
      } catch (e) {
        console.error('Supabase updateName error', e);
        return { data: null, error: { message: 'Erro ao atualizar o nome.' } };
      }
    }

    try {
      const usersStr = localStorage.getItem('local-users');
      const users = usersStr ? JSON.parse(usersStr) : {};
      const entry = users[email];

      if (!entry) {
        return { data: null, error: { message: 'Usuário local não encontrado.' } };
      }

      entry.name = name;
      users[email] = entry;
      localStorage.setItem('local-users', JSON.stringify(users));

      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          name,
        },
      };

      mockAuth.setUser(updatedUser);
      return { data: { user: updatedUser }, error: null };
    } catch (e) {
      console.error('Local updateName error', e);
      return { data: null, error: { message: 'Erro ao atualizar o nome.' } };
    }
  },

  getUser: () => {
    const userStr = localStorage.getItem('sb-auth-user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user: any) => {
    if (user) {
      localStorage.setItem('sb-auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sb-auth-user');
    }
  },
};
