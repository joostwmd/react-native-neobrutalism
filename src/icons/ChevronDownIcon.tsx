import type { JSX } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';

/**
 * Chevron down icon for collapsible triggers and dropdowns.
 *
 * @example
 * ```tsx
 * <ChevronDownIcon size={16} color="#000000" />
 * ```
 */
export function ChevronDownIcon({
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
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
