import type { JSX } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';

/**
 * Minus/horizontal line icon for indeterminate checkbox state.
 *
 * @example
 * ```tsx
 * <MinusIcon size={16} color="#000000" />
 * ```
 */
export function MinusIcon({
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
        d="M5 12H19"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
