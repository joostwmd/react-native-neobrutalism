import type { JSX } from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';

/**
 * Check/checkmark icon for checkbox and selection states.
 *
 * @example
 * ```tsx
 * <CheckIcon size={16} color="#000000" />
 * ```
 */
export function CheckIcon({
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
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
