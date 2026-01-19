# react-native-neobrutalism

Customizable Neo-Brutalism UI components library for React Native.

> **Early Alpha**
>
> This library is in active development and should be considered alpha. I'm still learning the ins and outs of React Native library tooling, so you may encounter rough edges or unexpected issues. If something breaks or doesn't work as expected, please [open an issue](https://github.com/codebykarthick/react-native-neobrutalism/issues) — I'm committed to fixing bugs and improving the library as quickly as I can. Your feedback and patience are greatly appreciated!

## Features

- Bold borders, offset shadows, and vibrant colors following neobrutalism design
- Full theme customization via context provider
- Smooth animations powered by react-native-reanimated
- Cross-platform support (iOS, Android, Web)
- TypeScript support with complete type definitions

## Installation

```bash
# Using npm
npm install react-native-neobrutalism

# Using yarn
yarn add react-native-neobrutalism
```

### Peer Dependencies

```bash
# Optional (for animations)
npm install react-native-reanimated
```

For `react-native-reanimated` setup, follow the [official installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/).

**Expo users:** Add the reanimated babel plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};
```

## Quick Start

Wrap your application with `NeobrutalismThemeProvider`:

```tsx
import { NeobrutalismThemeProvider, Button } from 'react-native-neobrutalism';

export default function App() {
  return (
    <NeobrutalismThemeProvider>
      <Button label="Click me" onPress={() => console.log('Pressed!')} />
    </NeobrutalismThemeProvider>
  );
}
```

## Theme Customization

### Custom Theme Provider

Override any theme values by passing a `theme` prop:

```tsx
import { NeobrutalismThemeProvider } from 'react-native-neobrutalism';

<NeobrutalismThemeProvider
  theme={{
    colors: {
      primary: '#FF6B6B',
      primaryForeground: '#FFFFFF',
    },
    shadow: {
      offsetX: 6,
      offsetY: 6,
      color: '#333333',
    },
    border: {
      width: 3,
      radius: 12,
    },
  }}
>
  <App />
</NeobrutalismThemeProvider>
```

### Using the Theme Hook

Access and update theme values dynamically:

```tsx
import { useNeobrutalismTheme } from 'react-native-neobrutalism';

function MyComponent() {
  const { theme, setTheme } = useNeobrutalismTheme();

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Button
        label="Toggle Theme"
        onPress={() => setTheme({ colors: { primary: '#88AAEE' } })}
      />
    </View>
  );
}
```

### Default Theme Values

```ts
{
  colors: {
    primary: '#88AAEE',
    primaryForeground: '#000000',
    secondary: '#E0E0E0',
    secondaryForeground: '#000000',
    warning: '#FFDC58',
    warningForeground: '#000000',
    danger: '#FF6B6B',
    dangerForeground: '#000000',
    success: '#A3E635',
    successForeground: '#000000',
    background: '#FFFFFF',
    foreground: '#000000',
    border: '#000000',
  },
  shadow: {
    offsetX: 4,
    offsetY: 4,
    color: '#000000',
  },
  border: {
    width: 2,
    color: '#000000',
    radius: 5,
  },
  spacing: {
    xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32,
  },
  animation: {
    duration: 100,
    useNativeDriver: true,
  },
}
```

## Documentation

For complete component documentation, usage examples, and interactive demos, visit our [Storybook](https://codebykarthick.github.io/react-native-neobrutalism).

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
