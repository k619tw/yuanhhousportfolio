/**
 * Design tokens for all 3 themes, extracted from the UI package CSS variables.
 * Each theme maps semantic roles to concrete color values for use in Remotion inline styles.
 */

export type ThemeName = 'product-a' | 'product-b' | 'product-c';

export type ThemeTokens = {
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  backgroundCard: string;

  // Brand
  brandPrimary: string;
  brandSecondary: string;

  // Foreground
  fgPrimary: string;
  fgSecondary: string;
  fgBrandOnPrimary: string;
  fgBrandOnSecondary: string;

  // Badges
  successBg: string;
  successFg: string;
  dangerBg: string;
  dangerFg: string;
  warningBg: string;
  warningFg: string;
  promoteBg: string;
  promoteFg: string;
  neutralBg: string;
  neutralFg: string;

  // Toggle
  toggleOn: string;
  toggleOff: string;
  toggleThumb: string;

  // Borders
  borderBrand: string;
  borderTertiary: string;

  // Radii
  radiusCard: number;
  radiusButton: number;
  radiusBadge: number;
  radiusButtonSmall: number;
};

/** Product A — Light / Blue (Professional) */
const productA: ThemeTokens = {
  background: 'rgba(244,245,247,1)',
  backgroundSecondary: 'rgba(255,255,255,1)',
  backgroundCard: 'rgba(255,255,255,1)',
  brandPrimary: 'rgba(0,112,190,1)',
  brandSecondary: 'rgba(241,249,255,1)',
  fgPrimary: 'rgba(33,39,42,1)',
  fgSecondary: 'rgba(107,113,122,1)',
  fgBrandOnPrimary: 'rgba(255,255,255,1)',
  fgBrandOnSecondary: 'rgba(0,112,190,1)',
  successBg: 'rgba(221,252,230,1)',
  successFg: 'rgba(4,67,23,1)',
  dangerBg: 'rgba(255,235,238,1)',
  dangerFg: 'rgba(214,0,35,1)',
  warningBg: 'rgba(251,234,207,1)',
  warningFg: 'rgba(87,13,0,1)',
  promoteBg: 'rgba(238,220,255,1)',
  promoteFg: 'rgba(75,0,120,1)',
  neutralBg: 'rgba(241,242,244,1)',
  neutralFg: 'rgba(33,39,42,1)',
  toggleOn: 'rgba(0,112,190,1)',
  toggleOff: 'rgba(221,225,230,1)',
  toggleThumb: 'rgba(255,255,255,1)',
  borderBrand: 'rgba(0,121,200,1)',
  borderTertiary: 'rgba(50,56,63,0.2)',
  radiusCard: 8,
  radiusButton: 8,
  radiusBadge: 9999,
  radiusButtonSmall: 9999,
};

/** Product B — Dark / Purple+Lime (Evangelion) */
const productB: ThemeTokens = {
  background: 'rgba(50,0,80,1)',
  backgroundSecondary: 'rgba(30,5,50,1)',
  backgroundCard: 'rgba(75,0,120,1)',
  brandPrimary: 'rgba(128,0,200,1)',
  brandSecondary: 'rgba(50,0,80,1)',
  fgPrimary: 'rgba(255,255,255,1)',
  fgSecondary: 'rgba(238,220,255,1)',
  fgBrandOnPrimary: 'rgba(255,255,255,1)',
  fgBrandOnSecondary: 'rgba(160,255,60,1)',
  successBg: 'rgba(35,75,5,1)',
  successFg: 'rgba(190,255,120,1)',
  dangerBg: 'rgba(50,5,10,1)',
  dangerFg: 'rgba(255,150,170,1)',
  warningBg: 'rgba(87,13,0,1)',
  warningFg: 'rgba(248,208,158,1)',
  promoteBg: 'rgba(44,12,26,1)',
  promoteFg: 'rgba(251,211,232,1)',
  neutralBg: 'rgba(75,0,120,1)',
  neutralFg: 'rgba(255,255,255,1)',
  toggleOn: 'rgba(128,0,200,1)',
  toggleOff: 'rgba(75,0,120,1)',
  toggleThumb: 'rgba(255,255,255,1)',
  borderBrand: 'rgba(148,70,225,1)',
  borderTertiary: 'rgba(255,255,255,0.2)',
  radiusCard: 16,
  radiusButton: 16,
  radiusBadge: 9999,
  radiusButtonSmall: 9999,
};

/** Product C — Warm / Cream+Brown (MUJI) */
const productC: ThemeTokens = {
  background: 'rgba(241,239,235,1)',
  backgroundSecondary: 'rgba(247,245,242,1)',
  backgroundCard: 'rgba(247,245,242,1)',
  brandPrimary: 'rgba(110,80,50,1)',
  brandSecondary: 'rgba(245,235,220,1)',
  fgPrimary: 'rgba(50,56,63,1)',
  fgSecondary: 'rgba(107,113,122,1)',
  fgBrandOnPrimary: 'rgba(255,255,255,1)',
  fgBrandOnSecondary: 'rgba(80,58,38,1)',
  successBg: 'rgba(220,228,215,1)',
  successFg: 'rgba(50,60,45,1)',
  dangerBg: 'rgba(255,235,238,1)',
  dangerFg: 'rgba(130,0,22,1)',
  warningBg: 'rgba(245,235,220,1)',
  warningFg: 'rgba(80,58,38,1)',
  promoteBg: 'rgba(241,242,244,1)',
  promoteFg: 'rgba(75,81,88,1)',
  neutralBg: 'rgba(241,242,244,1)',
  neutralFg: 'rgba(50,56,63,1)',
  toggleOn: 'rgba(110,80,50,1)',
  toggleOff: 'rgba(221,225,230,1)',
  toggleThumb: 'rgba(255,255,255,1)',
  borderBrand: 'rgba(190,155,110,1)',
  borderTertiary: 'rgba(50,56,63,0.15)',
  radiusCard: 2,
  radiusButton: 2,
  radiusBadge: 4,
  radiusButtonSmall: 4,
};

export const themes: Record<ThemeName, ThemeTokens> = {
  'product-a': productA,
  'product-b': productB,
  'product-c': productC,
};

export const fonts = {
  primary:
    "'Inter','Hiragino Sans','PingFang TC',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans JP','Noto Sans TC',sans-serif",
} as const;
