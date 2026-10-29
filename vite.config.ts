
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import tailwindcss from '@tailwindcss/vite';
  import path from 'path';

  // Preload the fonts used above the fold; their hashed file names are only known at build time
  const CRITICAL_FONTS = [/poppins-latin-300-normal/, /poppins-latin-400-normal/, /italiana-latin-400-normal/];
  function preloadCriticalFonts() {
    return {
      name: 'preload-critical-fonts',
      apply: 'build' as const,
      transformIndexHtml(_html: string, ctx: { bundle?: Record<string, unknown> }) {
        return Object.keys(ctx.bundle ?? {})
          .filter((file) => file.endsWith('.woff2') && CRITICAL_FONTS.some((re) => re.test(file)))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: true, href: '/' + file },
            injectTo: 'head-prepend' as const,
          }));
      },
    };
  }

  export default defineConfig({
    plugins: [react(), tailwindcss(), preloadCriticalFonts()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'lucide-react@0.487.0': 'lucide-react',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });