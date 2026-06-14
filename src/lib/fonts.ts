/**
 * Sistema de Fontes tweakcn
 * Inspirado em next/font/google, adaptado para React + Vite
 * 
 * Este arquivo simula o comportamento de next/font/google,
 * carregando as fontes do Google Fonts e gerando variáveis CSS.
 */

export interface FontConfig {
  subsets: string[];
  variable: string;
  weight?: string | string[];
  style?: string | string[];
  display?: string;
}

export interface Font {
  className: string;
  style: {
    fontFamily: string;
  };
  variable: string;
}

/**
 * Roboto - Sans-serif principal
 * Fonte geométrica moderna, ideal para corpo de texto
 */
export const Roboto = (config: FontConfig): Font => {
  return {
    className: 'font-sans',
    style: {
      fontFamily: "'Roboto', ui-sans-serif, system-ui, sans-serif",
    },
    variable: config.variable || '--font-sans',
  };
};

/**
 * Playfair Display - Serif para títulos
 * Fonte display elegante, perfeita para headings
 */
export const Playfair_Display = (config: FontConfig): Font => {
  return {
    className: 'font-serif',
    style: {
      fontFamily: "'Playfair Display', ui-serif, Georgia, serif",
    },
    variable: config.variable || '--font-serif',
  };
};

/**
 * Fira Code - Monospace para código e valores
 * Fonte mono moderna com ligaduras, ideal para números
 */
export const Fira_Code = (config: FontConfig): Font => {
  return {
    className: 'font-mono',
    style: {
      fontFamily: "'Fira Code', ui-monospace, 'Courier New', monospace",
    },
    variable: config.variable || '--font-mono',
  };
};

/**
 * Configurações de fontes do projeto
 */
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

/**
 * Gera as classes CSS para aplicar no body
 */
export const getFontVariables = () => {
  return `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`;
};

/**
 * URLs das fontes Google para preload
 */
export const GOOGLE_FONTS_URLS = {
  roboto: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  playfair: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  firaCode: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap',
};
