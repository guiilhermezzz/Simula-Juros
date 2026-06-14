/**
 * FontLoader Component
 * Carrega as fontes Google de forma otimizada
 * Simula o comportamento de next/font/google
 */

import { useEffect } from 'react';
import { GOOGLE_FONTS_URLS } from '@/lib/fonts';

/**
 * FontLoader - Componente para carregar fontes Google
 * 
 * Features:
 * - Preconnect para performance
 * - Carregamento assíncrono
 * - Display swap para FOUT otimizado
 * - Cache no navegador
 */
export function FontLoader() {
  useEffect(() => {
    // Função para adicionar preconnect
    const addPreconnect = (href: string, crossorigin = false) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      if (crossorigin) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    };

    // Função para carregar fonte
    const loadFont = (href: string, id: string) => {
      // Verificar se já existe
      if (document.getElementById(id)) {
        return;
      }

      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = function() {
        // @ts-ignore
        this.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Adicionar preconnects
    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://fonts.gstatic.com', true);

    // Carregar fontes
    loadFont(GOOGLE_FONTS_URLS.roboto, 'google-font-roboto');
    loadFont(GOOGLE_FONTS_URLS.playfair, 'google-font-playfair');
    loadFont(GOOGLE_FONTS_URLS.firaCode, 'google-font-fira-code');

    // Adicionar fallback para fontes
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Roboto-fallback';
        src: local('Arial');
        ascent-override: 92.77%;
        descent-override: 24.41%;
        line-gap-override: 0%;
        size-adjust: 100%;
      }
      
      @font-face {
        font-family: 'Playfair Display-fallback';
        src: local('Georgia');
        ascent-override: 95%;
        descent-override: 25%;
        line-gap-override: 0%;
        size-adjust: 100%;
      }
      
      @font-face {
        font-family: 'Fira Code-fallback';
        src: local('Courier New');
        ascent-override: 100%;
        descent-override: 25%;
        line-gap-override: 0%;
        size-adjust: 100%;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
