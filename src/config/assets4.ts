/**
 * Centralized asset configuration
 *
 * All media assets are stored in the /public folder and served via Vercel CDN.
 * To update an asset, replace the file in /public and update the path here if needed.
 *
 * Benefits of Vercel CDN:
 * - Automatic global CDN distribution
 * - Image optimization (when using next/image or Vercel's image optimization)
 * - Faster load times with edge caching
 * - No external dependencies on Wix/other CDNs
 */

// Base path for assets (empty string for Vercel, can be changed for other deployments)
const ASSET_BASE = '';

// =============================================================================
// IMAGES
// =============================================================================

export const books = [
  {
    id: '1',
    title: 'Emotional Design: Why We Love (or Hate) Everyday Things',
    description: 'Don Norman explora como nossas emoções moldam a relação com objetos do dia a dia. Norman mostra que produtos visualmente agradáveis parecem mais eficazes porque criam vínculos afetivos positivos com o usuário. Ele descreve três níveis de experiência (visceral, comportamental e reflexivo) para explicar como o design ativa emoções em cada etapa. Para mim, este livro destaca que na arquitetura, o apelo sensorial e emocional dos espaços é decisivo: ambientes bem projetados – esteticamente atraentes e funcionais – despertam prazer e conforto, fortalecendo nosso bem-estar. Essa visão reforça minha prática: projetar edifícios que toquem as pessoas por meio de beleza e usabilidade, criando conexões afetivas duradouras',
    images: [
      `${ASSET_BASE}/images/books/emotional-design/slide1.webp`,
      `${ASSET_BASE}/images/books/emotional-design/slide2.webp`,
      `${ASSET_BASE}/images/books/emotional-design/slide3.webp`,
      `${ASSET_BASE}/images/books/emotional-design/slide4.webp`,
      `${ASSET_BASE}/images/books/emotional-design/slide5.webp`,
    ],
  },
  {
    id: '2',
    title: 'Joyful: The Surprising Power of Ordinary Things to Create Extraordinary Happiness',
    description: 'Ingrid Fetell Lee mostra como pequenos elementos cotidianos podem gerar felicidade. Como diz a sinopse, o livro explora formas pelas quais nosso entorno – objetos comuns, cores, formas e até lugares banais – tem o poder de despertar alegria. Lee defende que incluir intencionalmente cores vivas, luz natural e texturas lúdicas em um ambiente pode elevar o humor das pessoas. Essa ideia impacta meu trabalho porque reforça que a arquitetura deve incorporar elementos surpresa e prazer nos espaços diários. Projetar para a alegria significa criar ambientes que iluminam o dia a dia das pessoas, aproximando as metas de neuroarquitetura (ambientes saudáveis) com resultados emocionais positivos na vida cotidiana.',
    images: [
      `${ASSET_BASE}/images/books/joyful/slide1.webp`,
      `${ASSET_BASE}/images/books/joyful/slide2.webp`,
      `${ASSET_BASE}/images/books/joyful/slide3.webp`,
      `${ASSET_BASE}/images/books/joyful/slide4.webp`,
    ],
  },
  {
    id: '3',
    title: 'Neuroarquitetura: a neurociência no ambiente construído',
    description: 'As autoras estabelecem um novo diálogo entre arquitetura e neurociência, mostrando como nosso sistema nervoso está sempre interagindo com o mundo à nossa volta. Elas explicam, por exemplo, como o cérebro processa o espaço que vivenciamos e como a arquitetura pode, conhecendo esses mecanismos neurais, planejar projetos que tragam saúde e bem-estar. O livro é escrito até para leigos, introduzindo fundamentos da neurociência de forma acessível. Essa abordagem impacta meu trabalho porque mostra que decisões de design – da escolha de cores à acústica – podem ser embasadas no conhecimento científico sobre o cérebro, criando ambientes que reduzem o estresse e aumentam o conforto emocional.',
    images: [
      `${ASSET_BASE}/images/books/neuroarquitetura-neurociencia/slide1.webp`,
      `${ASSET_BASE}/images/books/neuroarquitetura-neurociencia/slide2.webp`,
      `${ASSET_BASE}/images/books/neuroarquitetura-neurociencia/slide3.webp`,
      `${ASSET_BASE}/images/books/neuroarquitetura-neurociencia/slide4.webp`,
    ],
  },
  {
    id: '4',
    title: 'Neuroarquitetura: Projetando ambientes para os desafios contemporâneos',
    description: 'O livro convida o leitor a explorar as conexões profundas entre espaço, cérebro e comportamento humano. Escrito por especialistas, ele mostra como a arquitetura pode – e deve – ser pensada considerando o ser humano em sua totalidade: sensível, emocional, social e sempre em transformação. Ao trazer estudos de caso em escolas, hospitais e cidades, o livro ilustra como fatores como iluminação, estímulos sensoriais e design biofílico podem usar a neurociência para melhorar a qualidade de vida. Para mim, essa obra reforça que projetar espaços exige considerar a ciência do cérebro: entender como os ambientes influenciam o aprendizado, a saúde e o convívio social orienta soluções arquitetônicas mais humanas e acolhedoras.',
    images: [
      `${ASSET_BASE}/images/books/neuroarquitetura/slide1.webp`,
      `${ASSET_BASE}/images/books/neuroarquitetura/slide2.webp`,
      `${ASSET_BASE}/images/books/neuroarquitetura/slide3.webp`,
      `${ASSET_BASE}/images/books/neuroarquitetura/slide4.webp`,
    ],
  },
  {
    id: '5',
    title: 'The Eyes of the Skin: Architecture and the Senses',
    description: 'Juhani Pallasmaa defende que devemos projetar arquitetura para todo o corpo, não apenas para os olhos. Ele explica que todos os sentidos, incluindo a visão, são extensões do tato – o nosso corpo é a interface essencial com o espaço. Pallasmaa resume bem: “Eu me experimento na cidade; a cidade existe por meio de minha experiência corporal. A cidade e meu corpo se complementam e se definem. Eu moro na cidade, e a cidade mora em mim”. Para mim, este livro reforça que cada material, luz e textura em um edifício toca emoções e memória: um espaço acolhedor envolve nossa pele, ouvidos e olfato tanto quanto nossos olhos. Isso alinha-se diretamente à minha visão em neuroarquitetura, pois mostra que ambientes multisensoriais criam experiências mais ricas e impactantes para as pessoas.',
    images: [
      `${ASSET_BASE}/images/books/eyes-of-the-skin/slide1.webp`,
      `${ASSET_BASE}/images/books/eyes-of-the-skin/slide2.webp`,
      `${ASSET_BASE}/images/books/eyes-of-the-skin/slide3.webp`,
      `${ASSET_BASE}/images/books/eyes-of-the-skin/slide4.webp`,
    ],
  },
  {
    id: '6',
    title: 'Manual do Arquiteto Descalço',
    description: 'Esse clássico propõe uma arquitetura arraigada na simplicidade, na sustentabilidade e na sabedoria popular. Ele define o “arquiteto descalço” como aquele que abandona convenções modernas e aprende diretamente com a natureza e a comunidade: “a natureza é a verdadeira professora – o vento ensina sobre ventilação, o sol sobre iluminação e a chuva sobre o aproveitamento da água”. O livro é repleto de esquemas simples e convida qualquer pessoa a construir com as próprias mãos usando materiais locais, promovendo autonomia. Para mim, essa obra inspiradora ressalta que projetar espaços habitáveis envolve sensibilidade ambiental e social: pensar localmente e construir de modo consciente gera espaços mais saudáveis e também emocionalmente ressonantes, pois fortalecem o sentido de pertencimento e de harmonia com o lugar.',
    images: [
      `${ASSET_BASE}/images/books/descalco/slide1.webp`,
      `${ASSET_BASE}/images/books/descalco/slide2.webp`,
      `${ASSET_BASE}/images/books/descalco/slide3.webp`,
      `${ASSET_BASE}/images/books/descalco/slide4.webp`,
    ],
  },
] as const;

// =============================================================================
// VIDEOS
// =============================================================================

export const videos = {
  // Navigation menu background video
  navigationBackground: {
    mp4: `${ASSET_BASE}/videos/nav-bg.mp4`,
    webm: `${ASSET_BASE}/videos/nav-bg.webm`,
  },

  // Footer background video
  footerBackground: {
    mp4: `${ASSET_BASE}/videos/footer-bg.mp4`,
    webm: `${ASSET_BASE}/videos/footer-bg.webm`,
  },
} as const;

// =============================================================================
// ICONS (External CDN - Flaticon)
// These can remain external or be downloaded to /public/icons/
// =============================================================================

export const icons = {
  menu: 'https://cdn-icons-png.flaticon.com/512/13726/13726126.png',
  arrow: 'https://cdn-icons-png.flaticon.com/512/9219/9219998.png',
  whatsapp: 'https://cdn-icons-png.flaticon.com/512/3741/3741717.png',
  email: 'https://cdn-icons-png.flaticon.com/512/3894/3894024.png',
  location: 'https://cdn-icons-png.flaticon.com/512/3894/3894030.png',
  instagram: 'https://cdn-icons-png.flaticon.com/512/3741/3741664.png',
  linkedin: 'https://cdn-icons-png.flaticon.com/512/3741/3741677.png',
  pinterest: 'https://cdn-icons-png.flaticon.com/512/3741/3741684.png',
} as const;

// =============================================================================
// PRELOAD LISTS (for Loader component or performance optimization)
// =============================================================================

export const preloadImages = [
  icons.arrow,
  ...books.flatMap(book => book.images),
];

export const preloadVideos = [
  videos.navigationBackground.mp4,
  videos.footerBackground.mp4,
];
