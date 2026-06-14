/**
 * useFonts Hook
 * Hook personalizado para acessar as configurações de fontes
 * Inspirado no padrão next/font
 */

import { fontSans, fontSerif, fontMono } from '@/lib/fonts';

/**
 * Hook para acessar as fontes configuradas
 * 
 * @returns Objeto com as configurações de todas as fontes
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const fonts = useFonts();
 *   
 *   return (
 *     <div className={fonts.sans.className}>
 *       <h1 className={fonts.serif.className}>Título</h1>
 *       <code className={fonts.mono.className}>Código</code>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFonts() {
  return {
    sans: fontSans,
    serif: fontSerif,
    mono: fontMono,
  };
}

/**
 * Hook para obter as variáveis CSS de fonte
 * 
 * @returns String com todas as variáveis CSS
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const fontVars = useFontVariables();
 *   
 *   return <div className={fontVars}>Content</div>;
 * }
 * ```
 */
export function useFontVariables() {
  return `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`;
}

/**
 * Hook para verificar se as fontes estão carregadas
 * 
 * @returns Boolean indicando se as fontes estão prontas
 */
export function useFontsLoaded() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // Verificar se document.fonts está disponível
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('400 16px Roboto'),
        document.fonts.load('400 16px "Playfair Display"'),
        document.fonts.load('400 16px "Fira Code"'),
      ]).then(() => {
        setLoaded(true);
      });
    } else {
      // Fallback: assumir carregado após 1s
      setTimeout(() => setLoaded(true), 1000);
    }
  }, []);

  return loaded;
}

// Importar React para o hook useFontsLoaded
import React from 'react';
