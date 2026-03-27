/**
 * Color definitions for the Neobrutalism theme
 */
export interface NeobrutalismColors {
  /** Primary action color */
  primary: string;
  /** Text color on primary background */
  primaryForeground: string;

  /** Secondary/neutral color */
  secondary: string;
  /** Text color on secondary background */
  secondaryForeground: string;

  /** Warning state color */
  warning: string;
  /** Text color on warning background */
  warningForeground: string;

  /** Danger/destructive state color */
  danger: string;
  /** Text color on danger background */
  dangerForeground: string;

  /** Success state color */
  success: string;
  /** Text color on success background */
  successForeground: string;

  /** Base background color */
  background: string;
  /** Base text color */
  foreground: string;
  /** Border color */
  border: string;
}

/**
 * Shadow configuration for neobrutalism offset shadows
 */
export interface NeobrutalismShadow {
  /** Horizontal offset in pixels */
  offsetX: number;
  /** Vertical offset in pixels */
  offsetY: number;
  /** Shadow color */
  color: string;
}

/**
 * Border configuration
 */
export interface NeobrutalismBorder {
  /** Border width in pixels */
  width: number;
  /** Border color */
  color: string;
  /** Border radius in pixels */
  radius: number;
}

/**
 * Spacing scale
 */
export interface NeobrutalismSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Button size configuration
 */
export interface NeobrutalismButtonSize {
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
  minHeight: number;
}

/**
 * All button sizes
 */
export interface NeobrutalismButtonSizes {
  small: NeobrutalismButtonSize;
  default: NeobrutalismButtonSize;
  large: NeobrutalismButtonSize;
}

/**
 * Animation configuration
 */
export interface NeobrutalismAnimation {
  /** Animation duration in milliseconds */
  duration: number;
  /** Whether to use native driver for better performance */
  useNativeDriver: boolean;
}

/**
 * Complete Neobrutalism theme interface
 */
export interface NeobrutalismTheme {
  colors: NeobrutalismColors;
  shadow: NeobrutalismShadow;
  border: NeobrutalismBorder;
  spacing: NeobrutalismSpacing;
  buttonSizes: NeobrutalismButtonSizes;
  animation: NeobrutalismAnimation;
  /**
   * When set (e.g. after loading a custom font with expo-font), all library
   * text uses this `fontFamily`. Omit to use the platform default.
   */
  fontFamily?: string;
}

/**
 * Theme context value with setter
 */
export interface NeobrutalismThemeContextValue {
  theme: NeobrutalismTheme;
  setTheme: (theme: DeepPartial<NeobrutalismTheme>) => void;
}

/**
 * Deep partial type for theme overrides
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Theme override type for customization
 */
export type NeobrutalismThemeOverride = DeepPartial<NeobrutalismTheme>;
