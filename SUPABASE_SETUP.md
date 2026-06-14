# Configuração do Supabase

## Pré-requisitos
- Conta no [Supabase](https://supabase.com)
- Node.js e npm instalados

## Passos de Configuração

### 1. Criar um Projeto no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha os dados:
   - **Project Name**: simula-juros
   - **Database Password**: Use uma senha forte
   - **Region**: Escolha a região mais próxima
5. Clique em "Create new project"

### 2. Obter as Credenciais
1. Após criar o projeto, vá para **Settings** > **API**
2. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** (public) → `VITE_SUPABASE_ANON_KEY`

### 3. Configurar o Arquivo `.env`
```bash
# .env (local, não compartilhe)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 4. Criar as Tabelas no Supabase
1. No painel do Supabase, vá para **SQL Editor**
2. Clique em "New Query"
3. Copie e execute o script em `supabase/migrations/001_create_profiles.sql`

### 5. Habilitar Email/Senha no Supabase
1. Vá para **Authentication** > **Providers**
2. Certifique-se que **Email** está ativado
3. Configure conforme necessário

### 6. Testar a Autenticação
1. Abra a aplicação
2. Clique em "Cadastre-se"
3. Crie uma conta com email e senha
4. Faça login com as credenciais

## Estrutura de Autenticação

### Cadastro
- Email e senha validados pelo Supabase Auth
- Perfil do usuário salvo na tabela `profiles`
- Dados criptografados e seguros

### Login
- Autenticação com Supabase Auth
- Validação automática de credenciais
- Sessão salva no localStorage

### Segurança (RLS)
- Usuários só conseguem acessar seus próprios dados
- Implementado através de Row Level Security do Supabase

## Troubleshooting

### Erro: "Supabase credentials not found"
- Verifique se o arquivo `.env` está na raiz do projeto
- Reinicie o servidor de desenvolvimento
- Verifique os nomes das variáveis

### Erro ao cadastrar: "E-mail já existe"
- Significa que o e-mail já foi registrado no Supabase
- Use um e-mail diferente

### Erro de conexão ao Supabase
- Verifique se as credenciais estão corretas
- Confirme se o projeto Supabase está ativo
- Verifique sua conexão de internet

## Próximos Passos Opcionais

- Adicionar verificação de e-mail
- Implementar recuperação de senha
- Adicionar autenticação social (Google, GitHub)
- Salvar preferências de usuário no banco
