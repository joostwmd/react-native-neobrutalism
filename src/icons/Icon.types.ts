import type { ViewStyle, StyleProp } from 'react-native';

export interface IconProps {
  /** Icon size (width and height) */
  size?: number;
  /** Icon color */
  color?: string;
  /** Optional additional styles */
  style?: StyleProp<ViewStyle>;
}
