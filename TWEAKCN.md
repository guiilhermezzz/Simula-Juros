# 🎨 tweakcn - Sistema de Design Customizado

## 📚 Visão Geral

O **tweakcn** é um sistema de design inspirado no shadcn/ui, adaptado para trabalhar com **Tailwind CSS 4** e **React + Vite**. Ele utiliza tokens CSS customizados, Google Fonts e componentes Radix UI para criar uma experiência de desenvolvimento consistente e escalável.

## 🔤 Sistema de Fontes

### Fontes Google Fonts Utilizadas

#### 1. **Roboto** (Sans-serif) 
- **Uso**: Fonte principal para corpo de texto
- **Variável CSS**: `--font-family-sans`
- **Classe Tailwind**: `font-sans`
- **Pesos**: 100, 300, 400, 500, 700, 900
- **Por que Roboto?**
  - Alta legibilidade em tamanhos pequenos
  - Ótima para interfaces digitais
  - Design moderno e limpo
  - Suporte completo a caracteres latinos

```tsx
// Exemplo de uso
<p className="font-sans text-base">Texto do corpo</p>
```

#### 2. **Playfair Display** (Serif)
- **Uso**: Títulos, headings e destaques
- **Variável CSS**: `--font-family-serif`
- **Classe Tailwind**: `font-serif`
- **Pesos**: 400, 500, 600, 700, 800, 900
- **Por que Playfair Display?**
  - Elegante e sofisticada
  - Alta legibilidade em tamanhos grandes
  - Contraste perfeito com Roboto
  - Transmite profissionalismo e confiança

```tsx
// Exemplo de uso
<h1 className="font-serif text-4xl font-bold">Título Principal</h1>
```

#### 3. **Fira Code** (Monospace)
- **Uso**: Valores monetários, código, números
- **Variável CSS**: `--font-family-mono`
- **Classe Tailwind**: `font-mono`
- **Pesos**: 300, 400, 500, 600, 700
- **Por que Fira Code?**
  - Ligaduras para código
  - Números tabulares (alinhamento perfeito)
  - Excelente para valores financeiros
  - Design moderno para fonte mono

```tsx
// Exemplo de uso
<span className="font-mono text-2xl">R$ 10.000,00</span>
```

## 🎨 Paleta de Cores (Tokens)

### Tema Claro

```css
--color-background: oklch(100% 0 0);           /* Branco puro */
--color-foreground: oklch(9% 0 0);             /* Quase preto */
--color-primary: oklch(46% 0.14 155);          /* Verde financeiro */
--color-primary-foreground: oklch(100% 0 0);   /* Branco */
--color-secondary: oklch(96% 0.01 240);        /* Cinza muito claro */
--color-muted: oklch(96% 0.01 240);            /* Cinza claro */
--color-accent: oklch(46% 0.14 155);           /* Verde (igual primary) */
--color-destructive: oklch(60% 0.19 27);       /* Vermelho */
--color-border: oklch(91% 0.01 240);           /* Cinza médio */
```

### Tema Escuro

```css
--color-background: oklch(16% 0.01 240);       /* Azul escuro profundo */
--color-foreground: oklch(98% 0 0);            /* Quase branco */
--color-primary: oklch(56% 0.14 155);          /* Verde mais claro */
--color-primary-foreground: oklch(20% 0.08 155); /* Verde escuro */
--color-secondary: oklch(27% 0.01 240);        /* Azul escuro médio */
--color-muted: oklch(27% 0.01 240);            /* Azul escuro médio */
--color-accent: oklch(56% 0.14 155);           /* Verde claro */
--color-destructive: oklch(40% 0.14 27);       /* Vermelho escuro */
--color-border: oklch(27% 0.01 240);           /* Azul escuro médio */
```

## 🧩 Componentes Base

### Button

```tsx
import { Button } from "@/components/ui/button";

// Variantes
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Input

```tsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Digite algo..." />
<Input type="email" placeholder="seu@email.com" />
<Input type="password" placeholder="••••••••" />
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
</Card>
```

### Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

### Toggle

```tsx
import { Toggle } from "@/components/ui/toggle";

<Toggle pressed={isPressed} onPressedChange={setIsPressed}>
  Toggle Me
</Toggle>
```

### Dialog (Modal)

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título do Modal</DialogTitle>
      <DialogDescription>Descrição do modal</DialogDescription>
    </DialogHeader>
    <p>Conteúdo...</p>
  </DialogContent>
</Dialog>
```

### Label

```tsx
import { Label } from "@/components/ui/label";

<Label htmlFor="email">E-mail</Label>
<Input id="email" type="email" />
```

## 🛠️ Utilitários

### cn() - Merge de Classes

```tsx
import { cn } from "@/lib/utils";

// Combinar classes condicionalmente
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)} />
```

### Formatação de Moeda

```tsx
import { formatCurrency } from "@/lib/utils";

formatCurrency(10000); // "R$ 10.000,00"
```

### Cálculos Financeiros

```tsx
import { calculateSimpleInterest, calculateCompoundInterest } from "@/lib/utils";

// Juros Simples
const simple = calculateSimpleInterest(10000, 5, 12);
// { final: 16000, interest: 6000 }

// Juros Compostos
const compound = calculateCompoundInterest(10000, 5, 12);
// { final: 17958.56, interest: 7958.56 }
```

## 🎭 Sistema de Temas

### ThemeProvider

```tsx
import { ThemeProvider } from "@/components/providers/theme-provider";

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

### ThemeToggle

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";

<ThemeToggle />
```

### useTheme Hook

```tsx
import { useTheme } from "@/components/providers/theme-provider";

function Component() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

## 📏 Breakpoints Responsivos

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Celular grande / Smartwatch landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Laptop pequeno */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

### Exemplos de Uso

```tsx
// Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>

// Mostrar/ocultar em diferentes tamanhos
<span className="hidden md:inline">Desktop</span>
<span className="inline md:hidden">Mobile</span>
```

## 🎨 Guia de Estilo

### Hierarquia de Fontes

```tsx
// Títulos principais - Serif
<h1 className="font-serif text-4xl md:text-5xl font-bold">Título H1</h1>
<h2 className="font-serif text-3xl md:text-4xl font-bold">Título H2</h2>
<h3 className="font-serif text-2xl md:text-3xl font-semibold">Título H3</h3>

// Corpo de texto - Sans
<p className="font-sans text-base leading-relaxed">Parágrafo normal</p>
<p className="font-sans text-sm text-muted-foreground">Texto secundário</p>

// Valores e números - Mono
<span className="font-mono text-2xl font-bold text-primary">R$ 10.000,00</span>
<code className="font-mono text-sm bg-muted px-2 py-1 rounded">const x = 10;</code>
```

### Espaçamento Consistente

```tsx
// Container padrão
<div className="container mx-auto px-4 md:px-6 lg:px-8">

// Seções
<section className="py-12 md:py-16 lg:py-24">

// Cards
<div className="space-y-4 md:space-y-6">

// Grids
<div className="grid gap-4 md:gap-6 lg:gap-8">
```

### Cores Semânticas

```tsx
// Sucesso / Finanças
<div className="text-primary">Verde financeiro</div>

// Informação / Neutro
<div className="text-muted-foreground">Texto secundário</div>

// Perigo / Erro
<div className="text-destructive">Mensagem de erro</div>

// Destaque
<div className="bg-accent text-accent-foreground">Destaque</div>
```

## 🔧 Customização

### Adicionar Nova Cor

```css
/* src/index.css */
@theme {
  --color-success: oklch(60% 0.15 140);
  --color-success-foreground: oklch(100% 0 0);
}
```

### Adicionar Nova Animação

```css
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
```

### Adicionar Nova Variante de Componente

```tsx
// components/ui/button.tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        // ... outras variantes
        success: "bg-success text-success-foreground hover:bg-success/90",
      },
    },
  }
);
```

## 📦 Estrutura de Arquivos

```
src/
├── components/
│   ├── ui/                    # Componentes base tweakcn
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── toggle.tsx
│   │   ├── dialog.tsx
│   │   └── label.tsx
│   ├── providers/
│   │   └── theme-provider.tsx # Provider de tema
│   └── ThemeToggle.tsx        # Toggle dark/light
├── lib/
│   ├── utils.ts               # Utilitários (cn, formatters, etc)
│   └── supabase.ts            # Cliente Supabase
└── index.css                  # Tokens e estilos base
```

## 🚀 Melhores Práticas

### 1. Use Variáveis CSS
```tsx
// ✅ Bom
<div className="bg-primary text-primary-foreground" />

// ❌ Evite
<div style={{ backgroundColor: '#22c55e' }} />
```

### 2. Mobile-First
```tsx
// ✅ Bom
<div className="text-sm md:text-base lg:text-lg" />

// ❌ Evite
<div className="text-lg md:text-base sm:text-sm" />
```

### 3. Use Componentes Base
```tsx
// ✅ Bom
<Button variant="outline" size="sm">Click</Button>

// ❌ Evite
<button className="px-3 py-1.5 rounded border...">Click</button>
```

### 4. Combine com cn()
```tsx
// ✅ Bom
<Card className={cn("hover:shadow-lg", isActive && "border-primary")} />

// ❌ Evite
<Card className={`hover:shadow-lg ${isActive ? "border-primary" : ""}`} />
```

### 5. Mantenha Consistência de Fontes
```tsx
// ✅ Bom - Títulos em serif
<h1 className="font-serif">Título</h1>
<p className="font-sans">Texto</p>
<span className="font-mono">R$ 100</span>

// ❌ Evite - Misturar sem propósito
<h1 className="font-mono">Título</h1>
```

## 📖 Referências

- **Tailwind CSS 4**: https://tailwindcss.com/
- **Radix UI**: https://www.radix-ui.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **Google Fonts**: https://fonts.google.com/
- **OKLCH Colors**: https://oklch.com/

---

**tweakcn** - Um sistema de design robusto, flexível e moderno para React + Vite + Tailwind CSS 4.
