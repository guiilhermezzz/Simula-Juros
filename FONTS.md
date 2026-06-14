# 🔤 Guia de Fontes tweakcn - Simula Juros

## 📖 Sistema de Tipografia

O **Simula Juros** utiliza um sistema de três fontes cuidadosamente escolhidas para proporcionar uma experiência visual profissional, legível e moderna.

---

## 🎯 Fontes Utilizadas

### 1. 🏛️ **Roboto** (Sans-serif)

**Variável CSS**: `--font-family-sans`  
**Classe Tailwind**: `font-sans`  
**Designer**: Christian Robertson (Google)  
**Ano**: 2011

#### Características
- Fonte principal para todo corpo de texto
- Geometria moderna e amigável
- Altíssima legibilidade em telas
- 18 estilos (9 pesos × 2 estilos)

#### Pesos Disponíveis
```
100 - Thin
300 - Light
400 - Regular ⭐ (Padrão)
500 - Medium
700 - Bold
900 - Black
```

#### Onde Usar
- ✅ Parágrafos e textos corridos
- ✅ Labels de formulários
- ✅ Botões e CTAs
- ✅ Navegação
- ✅ Descrições e tooltips
- ✅ Mensagens de feedback

#### Exemplos de Uso

```tsx
// Parágrafo normal
<p className="font-sans text-base">
  A nossa plataforma se trata de uma calculadora de juros compostos e simples.
</p>

// Label de formulário
<label className="font-sans text-sm font-medium">
  Valor Inicial
</label>

// Botão
<button className="font-sans font-medium">
  Calcular Juros
</button>

// Texto pequeno
<span className="font-sans text-xs text-muted-foreground">
  💡 Valor investido ou capital inicial da simulação
</span>
```

#### Pesos em Contexto
```tsx
// Thin (100) - Decorativo
<p className="font-sans font-thin text-6xl">100</p>

// Light (300) - Subtítulos delicados
<p className="font-sans font-light text-lg">Subtítulo elegante</p>

// Regular (400) - Corpo de texto
<p className="font-sans font-normal">Texto padrão para leitura</p>

// Medium (500) - Destaque leve
<p className="font-sans font-medium">Texto com leve destaque</p>

// Bold (700) - Títulos e ênfase
<p className="font-sans font-bold text-2xl">Título importante</p>

// Black (900) - Super destaque
<p className="font-sans font-black text-4xl">DESTAQUE MÁXIMO</p>
```

---

### 2. ✒️ **Playfair Display** (Serif)

**Variável CSS**: `--font-family-serif`  
**Classe Tailwind**: `font-serif`  
**Designer**: Claus Eggers Sørensen  
**Ano**: 2011

#### Características
- Fonte de display com alto contraste
- Elegante e sofisticada
- Perfeita para títulos grandes
- Transmite confiança e profissionalismo
- 12 estilos (6 pesos × 2 estilos)

#### Pesos Disponíveis
```
400 - Regular ⭐ (Padrão)
500 - Medium
600 - SemiBold
700 - Bold
800 - ExtraBold
900 - Black
```

#### Onde Usar
- ✅ Títulos principais (H1, H2, H3)
- ✅ Logotipo "Simula Juros"
- ✅ Headings de seções
- ✅ CTAs importantes
- ✅ Destaque de valores importantes
- ❌ Evite em textos longos (cansa a leitura)

#### Exemplos de Uso

```tsx
// Logo
<div className="flex items-center gap-2 font-serif text-2xl font-bold text-primary">
  <TrendingUp />
  <span>Simula Juros</span>
</div>

// Título Hero (H1)
<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
  Simule seus <span className="text-primary">investimentos</span> com precisão
</h1>

// Título de Seção (H2)
<h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
  Por que escolher o Simula Juros?
</h2>

// Título de Card (H3)
<h3 className="font-serif text-2xl font-semibold">
  Calculadora de Juros
</h3>

// Destaque de valor
<p className="font-serif text-5xl font-bold text-primary">
  R$ 16.105,10
</p>
```

#### Hierarquia Tipográfica

```tsx
// H1 - Página
<h1 className="font-serif text-5xl md:text-6xl font-bold">
  Título Principal
</h1>

// H2 - Seção
<h2 className="font-serif text-3xl md:text-4xl font-bold">
  Título de Seção
</h2>

// H3 - Subseção
<h3 className="font-serif text-2xl md:text-3xl font-semibold">
  Subtítulo
</h3>

// H4 - Card/Componente
<h4 className="font-serif text-xl md:text-2xl font-semibold">
  Título de Card
</h4>
```

---

### 3. 💻 **Fira Code** (Monospace)

**Variável CSS**: `--font-family-mono`  
**Classe Tailwind**: `font-mono`  
**Designer**: Nikita Prokopov (Tonsky)  
**Ano**: 2014

#### Características
- Fonte monoespaçada com ligaduras
- Números tabulares (alinhamento perfeito)
- Ideal para valores financeiros
- Design moderno e limpo
- 5 pesos disponíveis

#### Pesos Disponíveis
```
300 - Light
400 - Regular ⭐ (Padrão)
500 - Medium
600 - SemiBold
700 - Bold
```

#### Onde Usar
- ✅ Valores monetários (R$)
- ✅ Porcentagens (%)
- ✅ Números e estatísticas
- ✅ Códigos e snippets
- ✅ Datas e horas
- ✅ Inputs numéricos
- ❌ Evite em textos narrativos

#### Exemplos de Uso

```tsx
// Valores monetários
<span className="font-mono text-4xl font-bold text-primary">
  R$ 10.000,00
</span>

// Porcentagens
<span className="font-mono text-lg">
  5.5%
</span>

// Input de valor
<Input 
  type="text" 
  className="font-mono text-lg" 
  value="R$ 10.000,00"
/>

// Estatísticas
<div className="font-mono text-3xl font-bold">
  {simulationsCount}
</div>

// Código
<code className="font-mono text-sm bg-muted px-2 py-1 rounded">
  const rate = 0.05;
</code>

// Período/Data
<p className="font-mono text-sm">
  12m
</p>
```

#### Casos de Uso Específicos

```tsx
// Dashboard - Montante Final
<CardContent>
  <p className="font-mono text-4xl font-bold text-primary">
    {formatCurrency(result.final)}
  </p>
</CardContent>

// Dashboard - Taxa
<Input
  type="number"
  className="font-mono text-lg"
  value={rate}
/>

// Perfil - Estatísticas
<div className="text-center">
  <p className="font-mono text-3xl font-bold text-primary">
    {simulationsCount}
  </p>
  <p className="font-sans text-sm text-muted-foreground mt-1">
    Simulações
  </p>
</div>

// Comparação - Diferença
<p className="font-mono text-xl font-bold">
  +{((difference / simpleResult.final) * 100).toFixed(2)}%
</p>
```

---

## 🎨 Combinações Perfeitas

### Combinação 1: Título + Descrição

```tsx
<div>
  <h2 className="font-serif text-3xl font-bold mb-2">
    Montante Final
  </h2>
  <p className="font-sans text-muted-foreground mb-4">
    Valor total após o período de investimento
  </p>
  <span className="font-mono text-4xl font-bold text-primary">
    R$ 16.105,10
  </span>
</div>
```

### Combinação 2: Input com Label

```tsx
<div className="space-y-2">
  <label className="font-sans text-sm font-medium">
    Taxa de Juros
  </label>
  <Input 
    type="number" 
    className="font-mono text-lg"
    placeholder="5.5"
  />
  <p className="font-sans text-xs text-muted-foreground">
    💡 Taxa mensal aplicada sobre o capital
  </p>
</div>
```

### Combinação 3: Card Completo

```tsx
<Card>
  <CardHeader>
    <CardTitle className="font-serif text-2xl">
      Simulador de Juros
    </CardTitle>
    <CardDescription className="font-sans text-sm">
      Calcule o retorno do seu investimento
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <label className="font-sans text-sm font-medium">
        Valor Inicial
      </label>
      <Input className="font-mono text-lg" />
    </div>
    <div className="bg-muted p-4 rounded-lg">
      <p className="font-sans text-xs text-muted-foreground mb-1">
        Rendimento Total
      </p>
      <p className="font-mono text-2xl font-bold text-primary">
        R$ 6.105,10
      </p>
    </div>
  </CardContent>
</Card>
```

---

## 📐 Hierarquia Visual

### Tamanhos Tipográficos

```tsx
// Extra Large (Hero)
<h1 className="font-serif text-6xl font-bold">
  96px / 6rem
</h1>

// Large (Títulos principais)
<h2 className="font-serif text-5xl font-bold">
  80px / 5rem
</h2>

// Medium-Large (Títulos de seção)
<h3 className="font-serif text-4xl font-bold">
  64px / 4rem
</h3>

// Medium (Subtítulos)
<h4 className="font-serif text-3xl font-semibold">
  48px / 3rem
</h4>

// Base-Large (Corpo destacado)
<p className="font-sans text-xl">
  20px / 1.25rem
</p>

// Base (Corpo padrão)
<p className="font-sans text-base">
  16px / 1rem
</p>

// Small (Texto secundário)
<p className="font-sans text-sm">
  14px / 0.875rem
</p>

// Extra Small (Legendas)
<p className="font-sans text-xs">
  12px / 0.75rem
</p>
```

---

## 🌈 Aplicação por Contexto

### Home Page
- **Hero Title**: Playfair Display Bold 5xl/6xl
- **Hero Description**: Roboto Regular lg/xl
- **Botões**: Roboto Medium base
- **Cards**: Títulos em Roboto SemiBold, texto em Regular

### Login/Cadastro
- **Banner Title**: Playfair Display Bold 4xl/5xl
- **Labels**: Roboto Medium sm
- **Inputs**: Roboto Regular base
- **Helper Text**: Roboto Regular xs

### Dashboard
- **Page Title**: Playfair Display Bold 3xl/4xl
- **Card Titles**: Playfair Display SemiBold 2xl
- **Labels**: Roboto Medium base
- **Inputs**: Fira Code Regular lg
- **Valores**: Fira Code Bold 4xl
- **Descrições**: Roboto Regular xs

### Perfil
- **Nome**: Playfair Display Bold 3xl
- **Email**: Roboto Regular xl
- **Estatísticas**: Fira Code Bold 3xl
- **Labels**: Roboto Regular base

---

## 💡 Dicas de Uso

### ✅ Boas Práticas

1. **Use Playfair Display para impacto visual**
   ```tsx
   <h1 className="font-serif text-5xl font-bold">
     Título que chama atenção
   </h1>
   ```

2. **Use Roboto para legibilidade**
   ```tsx
   <p className="font-sans leading-relaxed">
     Texto longo que será lido confortavelmente
   </p>
   ```

3. **Use Fira Code para números**
   ```tsx
   <span className="font-mono text-2xl">
     R$ 10.000,00
   </span>
   ```

4. **Combine fontes com propósito**
   ```tsx
   <div>
     <h2 className="font-serif">Título</h2>
     <p className="font-sans">Descrição</p>
     <span className="font-mono">R$ 100</span>
   </div>
   ```

### ❌ Evite

1. **Não use serif em textos longos**
   ```tsx
   // ❌ Ruim
   <p className="font-serif">
     Longo parágrafo de texto que vai cansar a leitura...
   </p>
   ```

2. **Não misture muitos pesos**
   ```tsx
   // ❌ Ruim - muito poluído
   <div className="font-sans">
     <p className="font-thin">Thin</p>
     <p className="font-light">Light</p>
     <p className="font-normal">Normal</p>
     <p className="font-medium">Medium</p>
   </div>
   ```

3. **Não use mono para navegação**
   ```tsx
   // ❌ Ruim
   <nav className="font-mono">
     <a href="/">Home</a>
   </nav>
   ```

---

## 🎯 Checklist de Implementação

- [x] Fontes carregadas via Google Fonts
- [x] Variáveis CSS definidas (`--font-family-*`)
- [x] Classes Tailwind configuradas (`font-sans`, `font-serif`, `font-mono`)
- [x] Aplicação automática em tags HTML (`h1-h6 = serif`, `body = sans`, `code = mono`)
- [x] Pesos de fonte disponíveis (thin a black)
- [x] Suporte a itálico
- [x] Preconnect configurado para performance
- [x] Font-display: swap para carregamento rápido

---

**Resultado**: Um sistema tipográfico robusto, profissional e otimizado para aplicações financeiras! 💰✨
