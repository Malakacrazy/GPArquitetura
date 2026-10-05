# Blog CMS (Sanity Studio)

Studio standalone do blog (projeto `bdmwaevv`, dataset `production`). O site consome os posts via `blogClient` em `src/sanity/client.js`.

```bash
cd studio-blog-cms
npm install
npx sanity login
npx sanity dev                    # Studio local
npx sanity schemas deploy         # publica o schema no Content Lake
npx sanity deploy                 # publica o Studio (pede o hostname, ex.: studioaraci-blog)
npx sanity cors add https://studioaraci.com.br
npx sanity cors add http://localhost:5173
```
