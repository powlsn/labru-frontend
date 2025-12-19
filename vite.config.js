import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';

// jQuery und Bootstrap global verfügbar machen
const globalLibrariesPlugin = () => {
  return {
    name: 'global-libraries',
    transform(code, id) {
      if (id.includes('node_modules/jquery')) {
        return {
          code: code + '\nwindow.jQuery = window.$ = jQuery;',
          map: null
        };
      }
    }
  };
};

export default defineConfig({
  root: '.', // Oder 'src' falls dein Code dort liegt

  plugins: [
    globalLibrariesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // SVG Sprite Generator
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/images/svg')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
    // Falls du statische Assets kopieren musst (z.B. Fonts, Icons)
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
          dest: 'webfonts'
        }
      ]
    })
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Falls du jQuery aus node_modules nutzt:
      'jquery': resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        // Asset-Namen beibehalten (ähnlich wie Webpack)
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },

    // Chunk-Größe Warnung erhöhen wenn nötig
    chunkSizeWarningLimit: 1000
  },

  css: {
    postcss: './postcss.config.js',
    devSourcemap: true
  },

  server: {
    port: 3000,
    open: true,
    cors: true
  },

  // Falls du Proxy brauchst (wie webpack-dev-server)
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true
  //     }
  //   }
  // }
});
