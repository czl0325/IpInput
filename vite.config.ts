import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions(), {
    name: 'dts',
    generateBundle(_, bundle) {
      const declarations = Object.values(bundle)
      .filter((chunk) => chunk.type === 'chunk')
      .map((chunk) => {
        const name = path.basename(chunk.fileName, '.js');
        return `export * from './types/${name}';`
      })
      .join('\n')
      const dtsContent = `${declarations}`;
      this.emitFile({
        type: 'asset',
        fileName: 'IpInput.d.ts',
        source: dtsContent,
      })
    }
  }],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/IpInput.ts'),
      name: 'IpInput',
      fileName: (format) => `IpInput.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
})
