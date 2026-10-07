<div align="center">

<img src="public/brand/horizontal-terracota.png" alt="Studio Araci" width="320" />

**Site do Studio Araci: escritório autoral de arquitetura e interiores em São Paulo, fundado por Giulia Parente.**

*Tudo começa pelo que você sente.*

[![Vercel](https://img.shields.io/badge/Vercel-deploy-black?style=flat-square&logo=vercel)](https://studioaraci.com.br)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Sanity](https://img.shields.io/badge/CMS-Sanity-F03E2F?style=flat-square&logo=sanity)](https://www.sanity.io)

[studioaraci.com.br](https://studioaraci.com.br)

</div>

---

## Sumário

- [Sobre](#sobre)
- [Páginas](#páginas)
- [Stack](#stack)
- [Começando](#começando)
- [Scripts](#scripts)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Identidade visual](#identidade-visual)
- [Conteúdo (Sanity)](#conteúdo-sanity)
- [SEO e analytics](#seo-e-analytics)
- [Desempenho](#desempenho)
- [Deploy](#deploy)
- [Licença e créditos](#licença-e-créditos)

---

## Sobre

Site institucional e portfólio do Studio Araci. Apresenta o estúdio, os projetos de arquitetura e interiores, o serviço de visualização 3D e a biblioteca de referências. Os projetos são gerenciados no Sanity; o restante do conteúdo vive no código.

A marca segue o Manual da Marca desenvolvido pela agência Fogueira (paleta de 12 tons, três famílias tipográficas e a assinatura horizontal com símbolo, nome e slogan).

## Páginas

| Rota | Conteúdo |
|------|----------|
| `/` | Home: apresentação, o que fazemos, projetos, processo e obras em destaque |
| `/about` | O estúdio, a equipe, conquistas e a Giulia |
| `/about/library` | Biblioteca de livros de referência |
| `/portfolio` | Lista de projetos (grade e lista) |
| `/portfolio/:slug` | Página de cada projeto (conteúdo do Sanity) |
| `/3d-visualization` | Serviço de visualização 3D |
| `/contact` | Contato |
| `/privacy`, `/tos` | Política de Privacidade e Termos de Uso |
| `*` | 404 |

Apenas a home é carregada no bundle inicial. As demais páginas, e as seções abaixo da dobra da home, são carregadas sob demanda.

## Stack

- **React 18** + **TypeScript** (páginas e componentes)
- **Vite 6** (build e dev server) com **Tailwind CSS 4**
- **React Router 7**
- **Motion** (`motion/react`) com `LazyMotion`: componentes `m` leves, recursos de animação carregados à parte
- **Sanity** (`@sanity/client`, `@sanity/image-url`) como CMS dos projetos
- **Radix UI** (accordion, dialog, label), **lucide-react**, **react-slick**
- **react-hook-form** + **zod** + **react-international-phone** (formulário de orçamento)
- **Vercel** (hospedagem, Analytics e Speed Insights)

## Começando

Pré-requisitos: Node.js 18+ e npm.

```bash
git clone https://github.com/Malakacrazy/GPArquitetura.git
cd GPArquitetura
npm install
npm run dev
```

O servidor de desenvolvimento abre em `http://localhost:3000`. Sem variáveis de ambiente, o site usa o projeto Sanity padrão definido em `src/sanity/client.js`.

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Gera o sitemap (`prebuild`), faz o build do Vite, pré-renderiza as rotas (`prerender`) e envia as URLs ao IndexNow (`postbuild`) |
| `npm run prerender` | Gera o HTML estático por rota em `build/` (título, meta tags e JSON-LD de cada página) |
| `npm run generate-sitemap` | Gera `public/sitemap.xml` com as páginas fixas e os projetos do Sanity |
| `npm run submit-indexnow` | Envia as URLs do sitemap ao IndexNow |

Observações:

- O `generate-sitemap` consulta o Sanity. Sem acesso à rede, ele gera só as páginas fixas e avisa; não faça commit desse `sitemap.xml` reduzido.
- Falha no IndexNow não derruba o build (o `postbuild` só avisa). Ele precisa que o arquivo da chave (`public/GPArquitetura-3d9f8c2e1a7b4d6f.txt`) esteja acessível no domínio publicado.

## Variáveis de ambiente

Opcionais, em um arquivo `.env` na raiz:

```env
VITE_SANITY_PROJECT_ID=dffchnvy
VITE_SANITY_DATASET=production
VITE_SANITY_BLOG_PROJECT_ID=bdmwaevv
VITE_SANITY_BLOG_DATASET=production
```

Se não forem definidas, esses são os valores padrão. O blog usa um projeto Sanity próprio (`bdmwaevv`), separado do portfólio. O Studio do blog fica em `studio-blog-cms/` (veja o README da pasta).

### Publicar posts: webhook Sanity → Vercel

O texto de um post aparece no site assim que ele é publicado no Sanity, mas o HTML pré-renderizado (título, descrição, JSON-LD para o Google) e o `sitemap.xml` só são gerados no build. Para um novo deploy sair sozinho a cada publicação:

1. **Vercel:** Project Settings → Git → **Deploy Hooks** → crie um hook (nome, por exemplo, `Sanity blog`, branch `main`) e copie a URL. Ela funciona como uma senha: quem a tiver dispara builds. Não commite nem cole em chats.
2. **Sanity:** em [sanity.io/manage](https://www.sanity.io/manage), abra o projeto `bdmwaevv` → **API** → **Webhooks** → **Create webhook** e preencha:
   - **URL:** a URL do Deploy Hook do Vercel
   - **Dataset:** `production`
   - **Trigger on:** Create, Update e Delete
   - **Filter:** `_type == "post"`
   - **HTTP method:** `POST`
   - **Drafts:** deixe desmarcado (rascunhos não disparam build)
   - **Projection:** em branco, e deixe o webhook habilitado
3. **Teste:** publique (ou despublique) um post no Studio. Em poucos segundos aparece um deploy novo no painel do Vercel; no log do build procure por `Found N blog posts`.

Sem o webhook o site continua funcionando: posts novos abrem normalmente, mas sem o HTML pré-renderizado e fora do sitemap até o próximo deploy manual (Vercel → Deployments → Redeploy).

### Newsletter

O formulário do blog envia o e-mail para `api/subscribe.js` (função serverless do Vercel), que grava um documento `subscriber` em um **dataset privado** do projeto do blog, para que os e-mails nunca fiquem legíveis pela API pública. Configuração:

```bash
cd studio-blog-cms
npx sanity datasets create newsletter --visibility private
npx sanity tokens add "Newsletter (Vercel)" --role editor   # copie o token exibido
```

No Vercel (Project Settings → Environment Variables), defina `SANITY_NEWSLETTER_TOKEN` com o token. Opcional: `SANITY_NEWSLETTER_DATASET` (padrão `newsletter`). Para ver os inscritos:

```bash
npx sanity documents query '*[_type == "subscriber"] | order(createdAt desc)' --dataset newsletter
```

Antispam (em `api/subscribe.js`, sem serviço externo): verificação de origem, campo-isca, token assinado que o formulário busca ao carregar (rejeita envios com menos de 3 s ou mais de 2 h), limite de 5 envios por IP a cada 10 min (por instância, melhor esforço), lista de e-mails descartáveis e checagem DNS (MX) do domínio. Origens extras podem ser liberadas em `NEWSLETTER_ALLOWED_ORIGINS` (separadas por vírgula); o domínio do site, o deploy atual do Vercel e `localhost` já são aceitos.

Sem o token, o formulário mostra uma mensagem de erro. O `vite dev` não serve `/api`; use `vercel dev` para testar localmente.

### Importar artigos do BabyLoveGrowth

`api/sync-babylovegrowth.js` busca os artigos na [API do BabyLoveGrowth](https://www.babylovegrowth.ai/docs/integrations/api) e cria no Sanity os posts que o blog ainda não tem. Roda sozinha uma vez por dia (Vercel Cron, `vercel.json`, 09:00 UTC); no plano Hobby o Vercel não permite cron mais frequente que isso.

Configuração, no Vercel (Project Settings → Environment Variables):

| Variável | Valor |
|----------|-------|
| `BABYLOVEGROWTH_API_KEY` | chave gerada no BabyLoveGrowth (Settings → Publishing → API → Connect) |
| `SANITY_BLOG_TOKEN` | token com acesso de escrita ao blog: `cd studio-blog-cms && npx sanity tokens add "BabyLoveGrowth (Vercel)" --role editor` |
| `CRON_SECRET` | texto aleatório longo; o Vercel o envia como `Authorization: Bearer ...` ao chamar o cron e o endpoint recusa quem não o tiver |

Antes de deixar o cron rodar, confira o que seria importado (não grava nada):

```bash
curl -H "Authorization: Bearer $CRON_SECRET" "https://studioaraci.com.br/api/sync-babylovegrowth?dryRun=1"
```

Para importar na hora, é o mesmo comando sem `?dryRun=1`. A resposta lista `imported`, `skipped`, `pending` (o que ficou para a próxima execução) e `errors`; com erro a resposta é 500, e o erro aparece nos logs da função.

Como funciona:

- **Só cria, nunca sobrescreve.** Um artigo é pulado se o blog já tem um post com o mesmo slug ou o mesmo título, ou se ele já foi importado antes. Edições feitas no Studio ficam como estão, e um post apagado no Studio não volta (os ids importados ficam no documento `blg-sync-state`).
- **Publica direto.** O post entra publicado, com a data de criação do artigo no BabyLoveGrowth, as imagens enviadas ao Sanity e o conteúdo convertido para Portable Text (HTML cru nunca é guardado). Como o post é publicado, o webhook Sanity → Vercel (seção acima) dispara o deploy que gera o HTML pré-renderizado e o sitemap.
- **Categoria.** A API não informa categoria, então o Cloudflare Workers AI escolhe a categoria, preferindo Interiores, Processo, Reforma e Investidores mas podendo criar uma nova (`api/_lib/classifyCategory.js`) a partir do título e da descrição. Precisa de `CLOUDFLARE_ACCOUNT_ID` e `CLOUDFLARE_API_TOKEN` (token com permissão Workers AI) na Vercel; sem elas, ou se a chamada falhar, o post entra sem categoria e dá para definir no Studio. Só vale para posts novos.
- **Limites.** Cada execução para de iniciar novos artigos depois de 40 s e deixa o restante para o dia seguinte.
- **Mudanças no BabyLoveGrowth depois da importação não são refletidas:** a API não informa data de atualização, então atualizar um artigo já importado é manual no Studio.

A conversão fica em `api/_lib/htmlToPost.js` e é a mesma usada por `studio-blog-cms/scripts/html-to-sanity.mjs`, que importa arquivos `.html` exportados do painel (veja o cabeçalho do arquivo). Testes: `node --test "api/_lib/*.test.js"`.

## Estrutura do projeto

```
├── public/
│   ├── brand/            # Logos e símbolo (terracota e branco)
│   ├── images/           # Imagens estáticas
│   ├── videos/           # Vídeos de fundo (mp4 e webm)
│   ├── icons/            # Ícones da interface
│   ├── sw.js             # Service worker (cache de assets)
│   ├── robots.txt, sitemap.xml, llms.txt, site.webmanifest
│   └── favicon*, apple-touch-icon.png, android-chrome-*.png
├── scripts/              # prerender, sitemap e IndexNow
├── sanity-studio/        # Sanity Studio (schema dos projetos)
├── src/
│   ├── components/       # home, about, portfolio, portfolio3d, library, contact, legal, shared...
│   ├── config/           # assets.ts, contact.ts, faq.ts (fontes únicas de verdade)
│   ├── hooks/            # useSEO, useProjects
│   ├── pages/            # Uma página por rota
│   ├── sanity/           # Cliente Sanity e urlFor
│   ├── styles/           # globals.css: tokens de marca e Tailwind
│   └── utils/            # preload de mídia, adaptador do Sanity, IndexNow, service worker
├── index.html            # Shell HTML, meta tags e scripts de analytics
└── vercel.json           # Rewrites SPA e cabeçalhos de segurança
```

Contatos, redes sociais e dados da empresa ficam em `src/config/contact.ts`; os caminhos de imagens e vídeos em `src/config/assets.ts`.

## Identidade visual

Os tokens ficam em `src/styles/globals.css` e são usados pelo site por meio das variáveis `--color-*` e `--font-*`.

### Paleta

| Papel | Cor | Hex |
|-------|-----|-----|
| Fundo da página | Papel | `#FAF7F4` |
| Principal e acentos | Terracota | `#9F4F39` |
| Acento de luz | Dourado Mineral | `#AA9C79` |
| Texto | Grafite da Maré | `#434B57` |
| Texto secundário | Baleia Azul | `#5E6979` |
| Superfícies suaves | Areia Clara / Duna Suave | `#E8DED4` / `#CDB8A3` |

Os 12 tons oficiais estão como variáveis `--araci-*` no mesmo arquivo. A Terracota é o único acento de fato; texto pequeno sobre terracota deve ser branco.

### Tipografia

| Uso | Fonte |
|-----|-------|
| Títulos | Bodoni Moda |
| Subtítulos | Italiana |
| Corpo e interface | Poppins |

As fontes vêm do Google Fonts (links em `index.html` e em `scripts/prerender.js`).

### Logo

Em `public/brand/`. O componente `src/components/shared/BrandLogo.tsx` usa a assinatura horizontal (símbolo, nome e slogan) nos heros. O loader e o botão do menu usam o símbolo e o nome em arquivos separados. O logo tem versões `-sm` para uso em tela; não reduza os arquivos grandes por CSS para tamanhos muito pequenos.

## Conteúdo (Sanity)

Os projetos do portfólio são gerenciados no Sanity (projeto `dffchnvy`, dataset `production`).

```bash
cd sanity-studio
npm install
npm run dev      # Studio local
```

O Studio também carrega a tag do Google (configurada em `sanity-studio/sanity.cli.ts`), que passa a valer quando ele é publicado de novo (`sanity deploy`).

## SEO e analytics

- Meta tags, Open Graph e Twitter Cards por página (`src/hooks/useSEO.ts`); a home usa título sem o sufixo da marca (`absoluteTitle`)
- HTML pré-renderizado por rota, com JSON-LD `ArchitecturalBusiness` (`scripts/prerender.js`)
- `sitemap.xml`, `robots.txt`, `llms.txt` e IndexNow
- Canonical e URLs em `https://studioaraci.com.br`

| Ferramenta | ID |
|------------|----|
| Google Tag Manager | `GTM-WRK33L84` (inclui o Google Analytics `G-BWV35TXN66`; não há gtag direto no HTML) |
| Contentsquare | `387fba793be53` |
| CookieHub | banner de consentimento (LGPD, GDPR, CCPA) |

## Desempenho

- Divisão de código por rota (`React.lazy`) e das seções abaixo da dobra da home
- `LazyMotion`: bundle inicial de aproximadamente 307 KB (101 KB gzip)
- Service worker (`public/sw.js`) para cache de imagens, fontes e vídeos. Ao alterar um arquivo estático com o mesmo nome, aumente `CACHE_VERSION` ou renomeie o arquivo
- Vídeos com fonte `webm` e `mp4`

Ao medir no PageSpeed, os maiores pesos restantes são os vídeos de fundo, as imagens do Sanity e os scripts de terceiros (GTM e Contentsquare).

## Deploy

O deploy é feito na **Vercel**, com `npm run build` e saída em `build/`. O `vercel.json` define os rewrites da SPA e os cabeçalhos de segurança (incluindo a CSP, que lista os domínios de analytics, Sanity e CookieHub; ao adicionar um serviço de terceiros, inclua o domínio nela).

O domínio `studioaraci.com.br` (e `www`) precisa estar adicionado ao projeto na Vercel, com o DNS apontado, para que o certificado seja emitido.

## Licença e créditos

Software proprietário, desenvolvido para o Studio Araci.

- **Estúdio**: Studio Araci, Giulia Parente (Arquiteta, CEO e Founder)
- **Identidade visual**: Fogueira
- **Desenvolvimento**: Matheus Malaquias
- **Fontes**: [Google Fonts](https://fonts.google.com) · **Ícones**: [Lucide](https://lucide.dev)
