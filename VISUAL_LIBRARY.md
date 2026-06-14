# 🎨 Biblioteca Visual tweakcn - Documentação Completa

## 📚 Visão Geral

Esta biblioteca visual foi desenvolvida inspirada no `next/font/google` do Next.js 14+, adaptada para funcionar perfeitamente com **React + Vite + Tailwind CSS 4**. Ela fornece um sistema robusto de gerenciamento de fontes Google com carregamento otimizado, variáveis CSS e classes utilitárias.

---

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
src/
├── lib/
│   └── fonts.ts                    # Configuração principal de fontes
├── components/
│   ├── RootLayout.tsx              # Layout raiz (equivalente ao Next.js)
│   ├── FontLoader.tsx              # Carregador otimizado de fontes
│   └── examples/
│       └── FontShowcase.tsx        # Showcase de fontes
├── hooks/
│   └── useFonts.ts                 # Hooks para usar fontes
└── index.css                       # Tokens CSS e variáveis
```

---

## 🚀 Instalação e Configuração

### 1. Configuração Inicial

A biblioteca já está configurada no projeto. A estrutura segue o padrão Next.js:

```tsx
// src/lib/fonts.ts
import { Roboto, Playfair_Display, Fira_Code } from '@/lib/fonts';

export const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});
```

### 2. Aplicação no RootLayout

```tsx
// src/components/RootLayout.tsx
import { fontSans, fontSerif, fontMono } from '@/lib/fonts';

export function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    const body = document.body;
    body.className = `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`;
  }, []);

  return (
    <>
      <FontLoader />
      {children}
    </>
  );
}
```

### 3. Uso no App.tsx

```tsx
// src/App.tsx
import { RootLayout } from '@/components/RootLayout';

function App() {
  return (
    <RootLayout>
      <ThemeProvider>
        <BrowserRouter>
          {/* Suas rotas */}
        </BrowserRouter>
      </ThemeProvider>
    </RootLayout>
  );
}
```

---

## 📖 Guia de Uso

### Método 1: Classes Tailwind (Recomendado)

```tsx
// Sans-serif
<p className="font-sans">Texto em Roboto</p>

// Serif
<h1 className="font-serif">Título em Playfair Display</h1>

// Monospace
<code className="font-mono">Código em Fira Code</code>
```

### Método 2: Hook useFonts

```tsx
import { useFonts } from '@/hooks/useFonts';

function Component() {
  const fonts = useFonts();

  return (
    <div>
      <h1 className={fonts.serif.className}>Título</h1>
      <p className={fonts.sans.className}>Parágrafo</p>
      <code className={fonts.mono.className}>Código</code>
    </div>
  );
}
```

### Método 3: Variáveis CSS Diretas

```tsx
// Em um componente
<div style={{ fontFamily: 'var(--font-sans)' }}>
  Texto
</div>

// Em CSS/Tailwind
.custom-class {
  font-family: var(--font-serif);
}
```

### Método 4: Hook useFontVariables

```tsx
import { useFontVariables } from '@/hooks/useFonts';

function Component() {
  const fontVars = useFontVariables();

  return <div className={fontVars}>Content</div>;
}
```

---

## 🎨 Fontes Disponíveis

### 1. **Roboto** (Sans-serif)

**Configuração:**
```typescript
const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
```

**Uso:**
```tsx
// Classe Tailwind
<p className="font-sans font-normal">Regular</p>
<p className="font-sans font-medium">Medium</p>
<p className="font-sans font-bold">Bold</p>

// Hook
<p className={fonts.sans.className}>Texto</p>

// Variável CSS
<p style={{ fontFamily: 'var(--font-sans)' }}>Texto</p>
```

**Pesos disponíveis:**
- 100 - Thin
- 300 - Light
- 400 - Regular
- 500 - Medium
- 700 - Bold
- 900 - Black

**Casos de uso:**
- ✅ Corpo de texto
- ✅ Navegação
- ✅ Botões
- ✅ Labels de formulário
- ✅ Descrições
- ✅ Tooltips

---

### 2. **Playfair Display** (Serif)

**Configuração:**
```typescript
const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
```

**Uso:**
```tsx
// Classe Tailwind
<h1 className="font-serif font-bold">Título</h1>
<h2 className="font-serif font-semibold">Subtítulo</h2>

// Hook
<h1 className={fonts.serif.className}>Título</h1>

// Variável CSS
<h1 style={{ fontFamily: 'var(--font-serif)' }}>Título</h1>
```

**Pesos disponíveis:**
- 400 - Regular
- 500 - Medium
- 600 - SemiBold
- 700 - Bold
- 800 - ExtraBold
- 900 - Black

**Casos de uso:**
- ✅ Títulos principais (H1, H2, H3)
- ✅ Logo e branding
- ✅ Headings de seções
- ✅ Destaques importantes
- ❌ Evitar em textos longos

---

### 3. **Fira Code** (Monospace)

**Configuração:**
```typescript
const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});
```

**Uso:**
```tsx
// Classe Tailwind
<span className="font-mono">R$ 10.000,00</span>
<code className="font-mono">const x = 10;</code>

// Hook
<span className={fonts.mono.className}>Valor</span>

// Variável CSS
<span style={{ fontFamily: 'var(--font-mono)' }}>Código</span>
```

**Pesos disponíveis:**
- 300 - Light
- 400 - Regular
- 500 - Medium
- 600 - SemiBold
- 700 - Bold

**Casos de uso:**
- ✅ Valores monetários
- ✅ Porcentagens
- ✅ Números e estatísticas
- ✅ Código-fonte
- ✅ Datas e horas
- ❌ Evitar em textos narrativos

---

## 🔧 API e Interfaces

### Interface FontConfig

```typescript
interface FontConfig {
  subsets: string[];          // Ex: ["latin"]
  variable: string;           // Ex: "--font-sans"
  weight?: string | string[]; // Ex: ["400", "700"]
  style?: string | string[];  // Ex: ["normal", "italic"]
  display?: string;           // Ex: "swap"
}
```

### Interface Font

```typescript
interface Font {
  className: string;          // Ex: "font-sans"
  style: {
    fontFamily: string;       // Ex: "'Roboto', sans-serif"
  };
  variable: string;           // Ex: "--font-sans"
}
```

### Funções de Fonte

```typescript
// Criar configuração de Roboto
Roboto(config: FontConfig): Font

// Criar configuração de Playfair Display
Playfair_Display(config: FontConfig): Font

// Criar configuração de Fira Code
Fira_Code(config: FontConfig): Font
```

---

## 🎯 Hooks Disponíveis

### useFonts()

Retorna todas as configurações de fonte.

```typescript
function useFonts(): {
  sans: Font;
  serif: Font;
  mono: Font;
}
```

**Exemplo:**
```tsx
function Component() {
  const fonts = useFonts();

  return (
    <>
      <h1 className={fonts.serif.className}>Título</h1>
      <p className={fonts.sans.className}>Texto</p>
      <code className={fonts.mono.className}>Código</code>
    </>
  );
}
```

### useFontVariables()

Retorna string com todas as variáveis CSS.

```typescript
function useFontVariables(): string
```

**Exemplo:**
```tsx
function Component() {
  const fontVars = useFontVariables();

  return <div className={fontVars}>Content</div>;
}
```

### useFontsLoaded()

Verifica se as fontes foram carregadas.

```typescript
function useFontsLoaded(): boolean
```

**Exemplo:**
```tsx
function Component() {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return <LoadingSpinner />;
  }

  return <Content />;
}
```

---

## 🎨 Combinações e Padrões

### Padrão 1: Card com Título e Descrição

```tsx
<Card>
  <CardHeader>
    <CardTitle className="font-serif text-2xl font-bold">
      Título do Card
    </CardTitle>
    <CardDescription className="font-sans text-sm">
      Descrição em sans-serif
    </CardDescription>
  </CardHeader>
  <CardContent className="font-mono text-xl">
    R$ 10.000,00
  </CardContent>
</Card>
```

### Padrão 2: Formulário

```tsx
<div className="space-y-2">
  <Label className="font-sans text-sm font-medium">
    Valor Inicial
  </Label>
  <Input 
    type="text" 
    className="font-mono text-lg"
    placeholder="R$ 0,00"
  />
  <p className="font-sans text-xs text-muted-foreground">
    💡 Digite o valor do investimento
  </p>
</div>
```

### Padrão 3: Dashboard de Estatísticas

```tsx
<div className="grid grid-cols-3 gap-4">
  <div className="text-center">
    <p className="font-mono text-3xl font-bold text-primary">
      156
    </p>
    <p className="font-sans text-sm text-muted-foreground">
      Simulações
    </p>
  </div>
  {/* Mais estatísticas... */}
</div>
```

### Padrão 4: Hero Section

```tsx
<section>
  <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
    Título <span className="text-primary">Destaque</span>
  </h1>
  <p className="font-sans text-xl text-muted-foreground mb-8">
    Descrição explicativa do produto ou serviço
  </p>
  <Button className="font-sans font-medium">
    Call to Action
  </Button>
</section>
```

---

## ⚡ Otimizações de Performance

### 1. Preconnect

O `FontLoader` adiciona automaticamente preconnect:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 2. Font Display Swap

Todas as fontes usam `display=swap` para evitar FOIT (Flash of Invisible Text):

```typescript
display: "swap"
```

### 3. Carregamento Assíncrono

As fontes são carregadas de forma assíncrona para não bloquear a renderização:

```typescript
link.media = 'print';
link.onload = function() {
  this.media = 'all';
};
```

### 4. Fallback Fonts

Fontes de fallback otimizadas para métrica similar:

```css
@font-face {
  font-family: 'Roboto-fallback';
  src: local('Arial');
  ascent-override: 92.77%;
  descent-override: 24.41%;
  size-adjust: 100%;
}
```

---

## 🔍 Debugging e Inspeção

### Verificar Fontes Carregadas

```typescript
// No console do navegador
document.fonts.check('400 16px Roboto')
document.fonts.check('400 16px "Playfair Display"')
document.fonts.check('400 16px "Fira Code"')
```

### Ver Variáveis CSS

```typescript
// No console do navegador
getComputedStyle(document.body).getPropertyValue('--font-sans')
getComputedStyle(document.body).getPropertyValue('--font-serif')
getComputedStyle(document.body).getPropertyValue('--font-mono')
```

### Inspecionar Classes

```typescript
// No console do navegador
document.body.className
```

---

## 📊 Comparação com Next.js

| Recurso | Next.js | tweakcn (Vite) |
|---------|---------|----------------|
| Sintaxe | `import { Roboto } from "next/font/google"` | `import { Roboto } from "@/lib/fonts"` |
| Configuração | Igual | Igual |
| Variáveis CSS | Automático | Automático |
| Classes | `.className` | `.className` |
| Otimização | Automática | Manual via FontLoader |
| Preload | Automático | Manual via FontLoader |
| Self-hosting | Sim | Não (usa Google Fonts) |
| Bundle | Incluído | Carregado via CDN |

---

## 🎯 Casos de Uso Reais

### 1. Logo da Aplicação

```tsx
<div className="flex items-center gap-2 font-serif text-2xl font-bold text-primary">
  <TrendingUp />
  <span>Simula Juros</span>
</div>
```

### 2. Valor Monetário

```tsx
<span className="font-mono text-4xl font-bold text-primary">
  R$ 16.105,10
</span>
```

### 3. Descrição de Input

```tsx
<p className="font-sans text-xs text-muted-foreground">
  💡 Valor investido ou capital inicial da simulação
</p>
```

### 4. Título de Página

```tsx
<h1 className="font-serif text-4xl md:text-5xl font-bold">
  Simule seus <span className="text-primary">investimentos</span> com precisão
</h1>
```

---

## 🚀 Showcase Component

Para ver todas as fontes em ação, use o componente `FontShowcase`:

```tsx
import { FontShowcase } from '@/components/examples/FontShowcase';

function App() {
  return <FontShowcase />;
}
```

Acesse em: `/showcase` (se configurar a rota)

---

## ✅ Checklist de Implementação

- [x] Fontes configuradas em `lib/fonts.ts`
- [x] RootLayout aplicando variáveis
- [x] FontLoader otimizado
- [x] Hooks personalizados
- [x] Classes Tailwind funcionando
- [x] Variáveis CSS disponíveis
- [x] Fallback fonts configurados
- [x] Preconnect para performance
- [x] Display swap ativado
- [x] Documentação completa
- [x] Componente showcase
- [x] Exemplos práticos

---

## 📚 Referências

- **Next.js Font Optimization**: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- **Google Fonts**: https://fonts.google.com/
- **Tailwind CSS Custom Fonts**: https://tailwindcss.com/docs/font-family
- **Font Display**: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display

---

**tweakcn Visual Library** - Sistema de fontes profissional para React + Vite, inspirado em Next.js! 🎨✨
