import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { mergeConfig } from 'vite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import remarkGfm from 'remark-gfm';
import inject from '@rollup/plugin-inject';

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-native-web-vite'),
    options: {
      pluginReactOptions: {
        babel: {
          plugins: [
            '@babel/plugin-transform-export-namespace-from',
            'react-native-reanimated/plugin',
          ],
        },
      },
    },
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        // Inject Buffer for react-native-svg
        inject({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],

      resolve: {
        alias: {
          // runtime resolution
          'react-native': 'react-native-web',
          // Point buffer to the npm package
          buffer: join(__dirname, '../node_modules/buffer/index.js'),
        },
      },

      optimizeDeps: {
        // pre-bundling resolution (THIS was missing)
        alias: {
          'react-native': 'react-native-web',
        },
        include: ['buffer'],
        esbuildOptions: {
          // Node.js buffer needs to be made available
          define: {
            global: 'globalThis',
          },
        },
      },

      build: {
        commonjsOptions: {
          // Ensure buffer is transformed properly
          transformMixedEsModules: true,
        },
      },
    });
  },
};

export default config;
