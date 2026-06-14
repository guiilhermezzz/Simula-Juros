# 🎯 Guia de Demonstração - Simula Juros

## 🌟 Bem-vindo ao Simula Juros!

Esta é uma aplicação completa de calculadora de juros simples e compostos, totalmente funcional e responsiva.

## 🚀 Começando

### 1️⃣ Explorando a Home Page

Ao acessar a aplicação, você verá:

- **Hero Section**: Apresentação da plataforma com CTA para cadastro/login
- **Cards Animados**: Carrossel infinito mostrando os benefícios da plataforma
- **Seção CTA**: Chamada para ação para criar conta

**Funcionalidades da Home:**
- ✅ Tema claro/escuro (botão no canto superior direito)
- ✅ Navegação responsiva
- ✅ Animações suaves
- ✅ Links para todas as páginas

### 2️⃣ Criando uma Conta

1. Clique em **"Cadastro"** no header
2. Preencha os dados:
   - Nome completo
   - E-mail
   - Senha (mínimo 6 caracteres)
   - Confirmar senha
3. Clique em **"Criar Conta"**
4. Você será redirecionado automaticamente para o Dashboard

**Nota:** A autenticação é simulada (mock) e armazena os dados no localStorage.

### 3️⃣ Fazendo Login

1. Clique em **"Login"** no header
2. Digite qualquer e-mail/username e senha
3. Clique em **"Entrar"**
4. Acesso ao Dashboard liberado

### 4️⃣ Usando a Calculadora (Dashboard)

Esta é a página principal da aplicação! Aqui você pode:

#### 📊 Configurar Simulação

**Valor Inicial:**
- Digite o valor que deseja investir
- Formato automático em BRL (R$)
- Exemplo: R$ 10.000,00

**Taxa de Juros:**
- Digite a porcentagem
- Escolha entre:
  - **Mensal**: Taxa aplicada por mês
  - **Anual**: Taxa convertida para mensal (÷12)
- Exemplo: 5% a.m.

**Período:**
- Digite o tempo
- Escolha entre:
  - **Meses**: Período direto
  - **Anos**: Convertido para meses (×12)
- Mostra total aproximado em dias

**Tipo de Juros:**
- **Simples**: Juros calculados apenas sobre o capital inicial
  - Fórmula: J = C × i × t
  - Crescimento linear
  
- **Composto**: Juros sobre juros (rendimento exponencial)
  - Fórmula: M = C × (1 + i)^t
  - Crescimento exponencial

#### 📈 Visualizando Resultados

A calculadora mostra em tempo real:

1. **Montante Final**: Valor total após o período
2. **Total de Juros**: Quanto você ganhou
3. **Gráfico de Evolução**: Visualização do crescimento

#### ⚖️ Comparando Juros Simples vs Compostos

1. Configure os valores desejados
2. Clique no botão **"Comparar Juros Simples vs Compostos"**
3. Modal abrirá mostrando:
   - **Tabela Comparativa**: Valores lado a lado
   - **Diferença em R$**: Quanto você ganha a mais com juros compostos
   - **Percentual de Diferença**: Ganho relativo
   - **Gráfico Sobreposto**: Visualização das duas curvas

### 5️⃣ Acessando o Perfil

1. Clique no **Avatar** no canto superior esquerdo do Dashboard
2. Ou acesse diretamente `/perfil`

**Informações Disponíveis:**
- 👤 Nome completo
- 📧 E-mail
- 📅 Data de cadastro
- 📊 Número de simulações (mock)
- 📈 Estatísticas de uso

**Ações Disponíveis:**
- ✏️ Editar Perfil (funcionalidade demonstrativa)
- 🔑 Alterar Senha (funcionalidade demonstrativa)
- 🚪 Sair da Conta

## 🎨 Testando a Responsividade

### Desktop (1024px+)
- Layout em 2 colunas no Dashboard
- Cards lado a lado
- Navegação completa com texto

### Tablet (768px - 1023px)
- Layout adaptativo
- Grid de 2 colunas quando possível
- Ícones + texto na navegação

### Mobile (< 768px)
- Layout em coluna única
- Cards empilhados
- Navegação com apenas ícones
- Textos reduzidos

### Smartwatch (< 640px)
- Interface ultra-compacta
- Elementos essenciais apenas
- Touch-friendly

## 💡 Exemplos de Simulação

### Exemplo 1: Investimento de Curto Prazo
```
Valor Inicial: R$ 5.000,00
Taxa: 1% a.m.
Período: 12 meses
Tipo: Composto

Resultado:
- Montante: R$ 5.634,13
- Juros: R$ 634,13
```

### Exemplo 2: Investimento de Longo Prazo
```
Valor Inicial: R$ 10.000,00
Taxa: 10% a.a.
Período: 5 anos
Tipo: Composto

Resultado:
- Montante: R$ 16.105,10
- Juros: R$ 6.105,10
```

### Exemplo 3: Comparação Simples vs Composto
```
Valor Inicial: R$ 1.000,00
Taxa: 5% a.m.
Período: 24 meses

Juros Simples:
- Montante: R$ 2.200,00
- Juros: R$ 1.200,00

Juros Compostos:
- Montante: R$ 3.225,10
- Juros: R$ 2.225,10

Diferença: R$ 1.025,10 a mais com compostos!
```

## 🌓 Tema Claro/Escuro

1. Clique no ícone de sol/lua no header
2. O tema alterna entre:
   - ☀️ Claro: Fundo branco, texto escuro
   - 🌙 Escuro: Fundo azul escuro, texto claro
3. Preferência salva no localStorage

## 🔐 Dados Persistentes

A aplicação armazena no localStorage:
- Informações do usuário logado
- Preferência de tema
- Sessão de login

Para resetar, limpe o localStorage do navegador.

## 🎯 Features Especiais

### 1. Máscaras e Formatação
- ✅ Valor monetário formatado automaticamente
- ✅ Porcentagem com símbolo %
- ✅ Números sempre validados

### 2. Validações
- ✅ Senhas devem ter mínimo 6 caracteres
- ✅ Senhas devem coincidir no cadastro
- ✅ E-mail deve ser válido
- ✅ Valores numéricos obrigatórios

### 3. Feedback Visual
- ✅ Estados de loading nos botões
- ✅ Transições suaves
- ✅ Hover effects
- ✅ Focus states para acessibilidade

### 4. Animações
- ✅ Cards deslizantes na home (carrossel infinito)
- ✅ Fade in/out do modal
- ✅ Transição de tema
- ✅ Hover nos botões e cards

## 🎓 Conceitos Financeiros

### Juros Simples
- Calculado apenas sobre o capital inicial
- Crescimento linear
- Fórmula: J = C × i × t
- Ideal para: Empréstimos de curto prazo

### Juros Compostos
- Calculado sobre capital + juros acumulados
- Crescimento exponencial
- Fórmula: M = C × (1 + i)^t
- Ideal para: Investimentos de longo prazo

### Por que Compostos rendem mais?
Os juros compostos criam um efeito "bola de neve":
- Mês 1: Juros sobre R$ 1.000
- Mês 2: Juros sobre R$ 1.050 (capital + juros anteriores)
- Mês 3: Juros sobre R$ 1.102,50
- E assim sucessivamente...

## 🐛 Solução de Problemas

### Não consigo fazer login
- Qualquer e-mail/senha funciona (é um mock)
- Verifique se está preenchendo ambos os campos

### Gráfico não aparece
- Verifique se preencheu todos os campos
- Valores devem ser numéricos positivos

### Tema não muda
- Aguarde 1-2 segundos para transição
- Limpe o cache do navegador se persistir

### Página em branco após login
- Verifique o console do navegador
- Recarregue a página (F5)

## 📱 Testar em Diferentes Dispositivos

### Chrome DevTools
1. Pressione F12
2. Clique no ícone de dispositivo móvel
3. Teste diferentes resoluções:
   - iPhone SE (375px)
   - iPhone 14 Pro (393px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1920px)

## 🎉 Aproveite!

Explore todas as funcionalidades, teste diferentes valores, compare resultados e descubra como o poder dos juros compostos pode transformar seus investimentos!

---

**Dica Final:** Para a melhor experiência, teste a comparação com valores altos e períodos longos (ex: R$ 100.000 por 10 anos) e veja a diferença impressionante entre juros simples e compostos! 🚀
