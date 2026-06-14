import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ThemeProvider removed per request: theme switching disabled
import { RootLayout } from '@/components/RootLayout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Cadastro } from '@/pages/Cadastro';
import { Dashboard } from '@/pages/Dashboard';
import { Amortizacao } from '@/pages/Amortizacao';
import { Perfil } from '@/pages/Perfil';

/**
 * App Component
 * Configuração principal da aplicação seguindo o padrão Next.js
 * 
 * Estrutura:
 * RootLayout (fontes e configurações globais)
 *   └─ ThemeProvider (tema claro/escuro)
 *       └─ BrowserRouter (roteamento)
 *           └─ Routes (páginas)
 */
function App() {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/amortizacao" element={<Amortizacao />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}

export default App;
