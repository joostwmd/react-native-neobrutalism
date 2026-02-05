import type { JSX } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';

/**
 * Chevron right icon for carousel and navigation.
 *
 * @example
 * ```tsx
 * <ChevronRightIcon size={16} color="#000000" />
 * ```
 */
export function ChevronRightIcon({
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
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
