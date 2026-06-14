/**
 * FontShowcase Component
 * Demonstra o uso das fontes tweakcn
 * Componente de exemplo e documentação visual
 */

import { useFonts } from '@/hooks/useFonts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function FontShowcase() {
  const fonts = useFonts();

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className={`${fonts.serif.className} text-5xl font-bold`}>
          Sistema de Fontes tweakcn
        </h1>
        <p className={`${fonts.sans.className} text-lg text-muted-foreground`}>
          Inspirado em next/font/google, adaptado para React + Vite
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Roboto - Sans */}
        <Card>
          <CardHeader>
            <CardTitle className={fonts.serif.className}>Roboto</CardTitle>
            <CardDescription className={fonts.sans.className}>Sans-serif</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={fonts.sans.className}>
              <p className="text-xs font-thin">Thin (100)</p>
              <p className="text-xs font-light">Light (300)</p>
              <p className="text-xs font-normal">Regular (400)</p>
              <p className="text-xs font-medium">Medium (500)</p>
              <p className="text-xs font-bold">Bold (700)</p>
              <p className="text-xs font-black">Black (900)</p>
            </div>
            
            <div className={`${fonts.sans.className} text-sm space-y-2`}>
              <p className="font-normal">
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="font-medium">
                A fonte principal para corpo de texto e interfaces.
              </p>
            </div>

            <div className="bg-muted p-3 rounded">
              <code className="text-xs">
                className="{fonts.sans.className}"
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Playfair Display - Serif */}
        <Card>
          <CardHeader>
            <CardTitle className={fonts.serif.className}>Playfair Display</CardTitle>
            <CardDescription className={fonts.sans.className}>Serif</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={fonts.serif.className}>
              <p className="text-xs font-normal">Regular (400)</p>
              <p className="text-xs font-medium">Medium (500)</p>
              <p className="text-xs font-semibold">SemiBold (600)</p>
              <p className="text-xs font-bold">Bold (700)</p>
              <p className="text-xs font-extrabold">ExtraBold (800)</p>
              <p className="text-xs font-black">Black (900)</p>
            </div>
            
            <div className={`${fonts.serif.className} space-y-2`}>
              <h2 className="text-2xl font-bold">
                Título Elegante
              </h2>
              <p className="text-sm font-normal">
                Perfeita para headings e destaques visuais importantes.
              </p>
            </div>

            <div className="bg-muted p-3 rounded">
              <code className="text-xs">
                className="{fonts.serif.className}"
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Fira Code - Mono */}
        <Card>
          <CardHeader>
            <CardTitle className={fonts.serif.className}>Fira Code</CardTitle>
            <CardDescription className={fonts.sans.className}>Monospace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={fonts.mono.className}>
              <p className="text-xs font-light">Light (300)</p>
              <p className="text-xs font-normal">Regular (400)</p>
              <p className="text-xs font-medium">Medium (500)</p>
              <p className="text-xs font-semibold">SemiBold (600)</p>
              <p className="text-xs font-bold">Bold (700)</p>
            </div>
            
            <div className={`${fonts.mono.className} text-sm space-y-2`}>
              <p className="font-normal">
                R$ 10.000,00
              </p>
              <p className="font-medium">
                const rate = 5.5%;
              </p>
              <p className="font-bold text-2xl text-primary">
                16.105,10
              </p>
            </div>

            <div className="bg-muted p-3 rounded">
              <code className="text-xs">
                className="{fonts.mono.className}"
              </code>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exemplo de Uso com Tailwind */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Uso com Classes Tailwind</CardTitle>
          <CardDescription className="font-sans">
            As fontes também estão disponíveis como classes utilitárias
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="font-sans font-semibold">font-sans</p>
              <p className="font-sans text-sm text-muted-foreground">
                Corpo de texto principal
              </p>
              <div className="bg-muted p-2 rounded">
                <code className="text-xs">className="font-sans"</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-serif font-semibold text-xl">font-serif</p>
              <p className="font-sans text-sm text-muted-foreground">
                Títulos e headings
              </p>
              <div className="bg-muted p-2 rounded">
                <code className="text-xs">className="font-serif"</code>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-mono font-semibold">font-mono</p>
              <p className="font-sans text-sm text-muted-foreground">
                Código e valores
              </p>
              <div className="bg-muted p-2 rounded">
                <code className="text-xs">className="font-mono"</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemplo Prático */}
      <Card className="bg-gradient-to-br from-primary/10 to-transparent">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Exemplo Prático</CardTitle>
          <CardDescription className="font-sans">
            Combinando as três fontes em um componente real
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-card rounded-lg p-6 space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              Simulador de Investimentos
            </h3>
            
            <p className="font-sans text-base text-muted-foreground">
              Calcule o retorno do seu investimento com juros compostos
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-sm font-medium">Valor Inicial</label>
                <p className="font-mono text-2xl font-bold text-primary">R$ 10.000,00</p>
              </div>
              <div>
                <label className="font-sans text-sm font-medium">Montante Final</label>
                <p className="font-mono text-2xl font-bold text-primary">R$ 16.105,10</p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-sans text-xs text-muted-foreground mb-2">Código de exemplo:</p>
              <pre className="font-mono text-xs overflow-x-auto">
{`<h3 className="font-serif">Título</h3>
<p className="font-sans">Texto</p>
<span className="font-mono">R$ 100</span>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variáveis CSS */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Variáveis CSS</CardTitle>
          <CardDescription className="font-sans">
            Acesse as fontes via variáveis CSS personalizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-sans text-sm font-medium mb-2">Sans-serif</p>
              <code className="text-xs">var(--font-sans)</code>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                ou var(--font-family-sans)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-sans text-sm font-medium mb-2">Serif</p>
              <code className="text-xs">var(--font-serif)</code>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                ou var(--font-family-serif)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-sans text-sm font-medium mb-2">Monospace</p>
              <code className="text-xs">var(--font-mono)</code>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                ou var(--font-family-mono)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
