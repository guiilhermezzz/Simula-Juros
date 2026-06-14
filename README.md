# 💰 Simula Juros - Calculadora de Juros Simples e Compostos

Uma plataforma completa e responsiva para simulação de juros simples e compostos, com gráficos interativos, comparações detalhadas e interface moderna.

## 🚀 Funcionalidades

### ✨ Principais Features

- **Calculadora Avançada**: Simule juros simples e compostos com facilidade
- **Gráficos Interativos**: Visualize a evolução dos seus investimentos com gráficos dinâmicos
- **Comparação Side-by-Side**: Compare juros simples vs compostos em tempo real
- **Tema Claro/Escuro**: Alternância suave entre temas
- **100% Responsivo**: Funciona perfeitamente em desktop, tablet, celular e até smartwatch
- **Autenticação**: Sistema de login e cadastro integrado

### 📱 Páginas

1. **Home** (`/`) - Landing page com hero section e cards animados
2. **Login** (`/login`) - Página de autenticação
3. **Cadastro** (`/cadastro`) - Criação de conta
4. **Dashboard** (`/dashboard`) - Calculadora principal com gráficos
5. **Perfil** (`/perfil`) - Informações do usuário e estatísticas

## 🛠️ Stack Tecnológica

- **Framework**: React 19 + Vite
- **Estilização**: Tailwind CSS 4 (com configuração tweakcn)
- **Componentes UI**: Radix UI + shadcn/ui pattern
- **Roteamento**: React Router DOM
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Autenticação**: Supabase (mock implementado)
- **Formatação de Datas**: date-fns
- **Type Safety**: TypeScript

## 🎨 Design System (tweakcn)

O projeto utiliza um sistema de design customizado inspirado no shadcn/ui, com:

- **Cores**: Paleta verde financeiro para tema claro e escuro
- **Fontes**: 
  - Sans-serif: Roboto
  - Serif: Playfair Display
  - Mono: Fira Code
- **Componentes**: Button, Input, Card, Avatar, Toggle, Dialog, Label
- **Tokens CSS**: Variáveis customizadas para cores, bordas, raios, etc.

## 🚦 Como Executar

### Desenvolvimento

```bash
npm install
npm run dev
```

### Build de Produção

```bash
npm run build
npm run preview
```

## 📊 Funcionalidades da Calculadora

### Inputs Configuráveis

1. **💰 Valor Inicial**: Capital investido (formato monetário BRL)
2. **📈 Taxa de Juros**: Percentual mensal ou anual
3. **⏳ Período**: Tempo em meses ou anos
4. **🧮 Tipo de Juros**: Simples ou Composto

### Informações Exibidas

- **Informações Contextuais**: Cada input possui explicação sobre seu significado
- **Conversão Automática**: Taxa e período se ajustam entre mensal/anual
- **Total em Dias**: Cálculo aproximado do período em dias

### Resultados

- **Montante Final**: Valor total após o período
- **Total de Juros**: Rendimento obtido
- **Gráfico de Evolução**: Visualização do crescimento ao longo do tempo
- **Comparação Interativa**: Modal com tabela e gráfico comparativo

## 🔐 Autenticação

O projeto inclui um sistema de autenticação mock usando localStorage. Para integrar com Supabase real:

1. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Atualize `src/lib/supabase.ts` para usar as credenciais reais

## 📱 Responsividade

Breakpoints otimizados para:
- 📱 Smartphones (sm): 640px+
- 📱 Tablets (md): 768px+
- 💻 Notebooks/Desktops (lg): 1024px+
- 🖥️ Large Screens (xl): 1280px+
- 🖥️ Extra Large (2xl): 1536px+

## 🎯 Destaques Técnicos

### Performance
- Componentes otimizados com React.memo onde apropriado
- Lazy loading de rotas
- Bundle otimizado com Vite

### UX/UI
- Animações suaves com CSS e Framer Motion
- Feedback visual em todas as interações
- Estados de loading e erro tratados
- Formulários validados

### Acessibilidade
- Componentes semânticos
- Suporte a navegação por teclado
- Labels e aria-labels apropriados
- Contraste adequado de cores

## 📝 Estrutura de Pastas

```
src/
├── components/
│   ├── ui/              # Componentes base (button, input, card, etc.)
│   ├── providers/       # Context providers (theme)
│   ├── Header.tsx       # Cabeçalho principal
│   ├── Footer.tsx       # Rodapé
│   ├── ThemeToggle.tsx  # Toggle de tema
│   └── AnimatedCards.tsx # Cards animados da home
├── pages/
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Página de login
│   ├── Cadastro.tsx     # Página de cadastro
│   ├── Dashboard.tsx    # Calculadora principal
│   └── Perfil.tsx       # Perfil do usuário
├── lib/
│   ├── utils.ts         # Utilitários (cn, cálculos, formatação)
│   └── supabase.ts      # Cliente Supabase
├── App.tsx              # Configuração de rotas
└── main.tsx             # Entry point

```

## 🎨 Paleta de Cores

### Tema Claro
- Primary: `oklch(46% 0.14 155)` - Verde financeiro
- Background: `oklch(100% 0 0)` - Branco
- Foreground: `oklch(9% 0 0)` - Quase preto

### Tema Escuro
- Primary: `oklch(56% 0.14 155)` - Verde mais claro
- Background: `oklch(16% 0.01 240)` - Azul escuro
- Foreground: `oklch(98% 0 0)` - Quase branco

## 📄 Licença

Este projeto foi desenvolvido como demonstração de um sistema completo de calculadora financeira.

## 🙏 Agradecimentos

- shadcn/ui por inspirar o design system
- Radix UI pelos componentes primitivos
- Tailwind CSS pela engine de estilos
- Recharts pelos gráficos interativos
