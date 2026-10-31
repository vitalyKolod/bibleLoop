export const colors = {
  background: '#071420',
  backgroundElevated: '#0E2232',
  surface: '#112435',
  surfaceElevated: '#17384D',
  border: '#243B50',
  primaryGold: '#F4C665',
  primaryGoldStrong: '#FFD77A',
  secondaryBlue: '#58A6D8',
  textPrimary: '#F7F4EC',
  textSecondary: '#A9BDCA',
  textMuted: '#728B9C',
  success: '#70D69B',
  error: '#E88B83',
  warning: '#F2AD4C',
  goldTint: '#302D25',
  goldBorder: '#887044',
  successTint: '#112F29',
  errorTint: '#32212D',
  artworkGold: '#BA8040',
  artworkIvory: '#FFE6AF',
  surfaceStrong: '#1A3449',
  borderGold: '#826A42',
  primaryGoldBright: '#FFD77A',
  successSurface: '#112F29',
  errorSurface: '#32212D',
  artworkDusk: '#50413D',
  artworkBrown: '#795037',
  transparent: 'transparent',
} as const;
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 48,
  hero: 64,
} as const;
export const radius = { sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, hero: 28, full: 999 } as const;
export const typography = { small: 12, body: 16, title: 22, heading: 30, display: 38 } as const;
export const motion = { fast: 140, normal: 240, slow: 400 } as const;

export const shadows = {
  gold: {
    shadowColor: colors.primaryGold,
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
} as const;
