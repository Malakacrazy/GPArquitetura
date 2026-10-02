import {defineCliConfig} from 'sanity/cli'

const GA_SNIPPET = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BWV35TXN66"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-BWV35TXN66');
    </script>
  `

export default defineCliConfig({
  api: {
    projectId: 'dffchnvy',
    dataset: 'production'
  },
  // Inject the Google tag into the Studio's HTML shell
  vite: (config) => ({
    ...config,
    plugins: [
      ...(config.plugins || []),
      {
        name: 'inject-google-tag',
        transformIndexHtml: (html: string) => html.replace('</head>', `${GA_SNIPPET}</head>`),
      },
    ],
  }),
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
