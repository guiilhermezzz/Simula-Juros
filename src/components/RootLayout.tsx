/**
 * RootLayout Component
 * Equivalente ao layout.tsx do Next.js App Router
 * Aplica as fontes e configurações globais
 */

import React, { useEffect } from 'react';
import { fontSans, fontSerif, fontMono } from '@/lib/fonts';
import { FontLoader } from '@/components/FontLoader';

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Metadata equivalente (para SEO)
 */
export const metadata = {
  title: "Simula Juros — Calculadora de Juros Simples e Compostos",
  description: "Plataforma para simulação de juros simples e compostos com gráficos e comparações.",
};

/**
 * RootLayout - Layout raiz da aplicação
 * Aplica as variáveis de fonte no body seguindo o padrão Next.js
 */
export function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // Atualizar título e descrição
    document.title = metadata.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }

    // Aplicar classes de fonte no body
    const body = document.body;
    body.className = `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`;
    
    // Aplicar estilos CSS inline para as variáveis
    body.style.setProperty(fontSans.variable, fontSans.style.fontFamily);
    body.style.setProperty(fontSerif.variable, fontSerif.style.fontFamily);
    body.style.setProperty(fontMono.variable, fontMono.style.fontFamily);
  }, []);

  return (
    <>
      <FontLoader />
      {children}
    </>
  );
}
