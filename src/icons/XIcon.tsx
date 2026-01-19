import type { JSX } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';

/**
 * X/close icon for clear buttons and dismiss actions.
 *
 * @example
 * ```tsx
 * <XIcon size={16} color="#000000" />
 * ```
 */
export function XIcon({
  size = 16,
  color = '#000000',
  style,
}: IconProps): JSX.Element {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
