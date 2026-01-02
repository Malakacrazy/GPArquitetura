/**
 * Centralized Asset Configuration
 * 
 * All media assets are stored in the /public folder and served via Vercel CDN.
 * This is the SINGLE SOURCE OF TRUTH for all asset paths across the application.
 * 
 * Benefits of Vercel CDN:
 * - Automatic global CDN distribution
 * - Image optimization (when using next/image or Vercel's image optimization)
 * - Faster load times with edge caching
 * - No external dependencies on Wix/other CDNs
 * 
 * Organization:
 * - images: All static images organized by page/feature
 * - videos: All video assets organized by page/feature
 * - icons: Local icon assets
 * - preload*: Lists for preloading critical assets per page
 */

// Base path for assets (empty string for Vercel, can be changed for other deployments)
const ASSET_BASE = '';

// =============================================================================
// SHARED ICONS (Local assets in /public/icons/)
// =============================================================================

export const icons = {
  menu: `${ASSET_BASE}/icons/menu.png`,
  arrow: `${ASSET_BASE}/icons/arrow.png`,
  whatsapp: `${ASSET_BASE}/icons/whatsapp.png`,
  email: `${ASSET_BASE}/icons/email.png`,
  location: `${ASSET_BASE}/icons/location.png`,
  instagram: `${ASSET_BASE}/icons/instagram.png`,
  linkedin: `${ASSET_BASE}/icons/linkedin.png`,
  pinterest: `${ASSET_BASE}/icons/pinterest.png`,
  // About Us page specific icons
  projects: `${ASSET_BASE}/icons/projects.png`,
  awards: `${ASSET_BASE}/icons/awards.png`,
  satisfaction: `${ASSET_BASE}/icons/satisfaction.png`,
} as const;

// =============================================================================
// SHARED VIDEOS (Used across multiple pages)
// =============================================================================

export const videos = {
  // Navigation menu background video (used on all pages)
  navigationBackground: {
    mp4: `${ASSET_BASE}/videos/nav-bg.mp4`,
    webm: `${ASSET_BASE}/videos/nav-bg.webm`,
  },

  // Footer background video (used on all pages)
  footerBackground: {
    mp4: `${ASSET_BASE}/videos/footer-bg.mp4`,
    webm: `${ASSET_BASE}/videos/footer-bg.webm`,
  },

  // ==========================================================================
  // HOME PAGE VIDEOS
  // ==========================================================================
  home: {
    projectsBackground: {
      mp4: `${ASSET_BASE}/videos/projects-bg.mp4`,
      webm: `${ASSET_BASE}/videos/projects-bg.webm`,
    },
  },

  // ==========================================================================
  // ABOUT US PAGE VIDEOS
  // ==========================================================================
  about: {
    team: {
      giuliaparente: {
        mp4: `${ASSET_BASE}/videos/team/giuliaparente.mp4`,
        webm: `${ASSET_BASE}/videos/team/giuliaparente.webm`,
      },
    },
    library: {
      mp4: `${ASSET_BASE}/videos/library-bg.mp4`,
      webm: `${ASSET_BASE}/videos/library-bg.webm`,
    },
  },

  // ==========================================================================
  // PORTFOLIO 3D PAGE VIDEOS
  // ==========================================================================
  portfolio3d: {
    heroBackground: {
      mp4: `${ASSET_BASE}/videos/hero-3drendering-bg.mp4`,
      webm: `${ASSET_BASE}/videos/hero-3drendering-bg.webm`,
    },
    expertiseAnimation: {
      mp4: `${ASSET_BASE}/videos/expertise-animation.mp4`,
      webm: `${ASSET_BASE}/videos/expertise-animation.webm`,
    },
  },
} as const;

// =============================================================================
// IMAGES
// =============================================================================

export const images = {
  // ==========================================================================
  // HOME PAGE IMAGES
  // ==========================================================================
  home: {
    hero: {
      background: `${ASSET_BASE}/images/hero-bg.webp`,
    },
    carousel: [
      {
        id: 1,
        src: `${ASSET_BASE}/images/carousel-1.webp`,
        alt: 'Luxury staircase with marble detailing',
      },
      {
        id: 2,
        src: `${ASSET_BASE}/images/carousel-2.webp`,
        alt: 'Minimalist interior with natural lighting',
      },
      {
        id: 3,
        src: `${ASSET_BASE}/images/carousel-3.webp`,
        alt: 'Modern interior design showcase',
      },
    ],
    projects: {
      interior: `${ASSET_BASE}/images/project-interior.webp`,
      architecture: `${ASSET_BASE}/images/project-architecture.webp`,
    },
    decorations: {
      threadLine: `${ASSET_BASE}/images/decoration.svg`,
    },
    // Note: Featured works now loaded from Sanity CMS
  },

  // ==========================================================================
  // ABOUT US PAGE IMAGES
  // ==========================================================================
  about: {
    hero: {
      background: `${ASSET_BASE}/images/hero-about-us-bg.webp`,
    },
    team: {
      giuliaparente: {
        photo: `${ASSET_BASE}/images/team/giuliaparente.webp`,
        poster: `${ASSET_BASE}/images/team/giuliaparente.webp`,
      },
    },
    // Bookshelf thumbnails (for AboutPage bookshelf section)
    bookThumbnails: [
      {
        id: 1,
        title: 'Emotional Design: Why We Love (or Hate) Everyday Things',
        description: 'Don Norman mostra que não nos conectamos com objetos só pela função, mas pelas emoções que eles despertam — e é isso que define se amamos ou odiamos o design do dia a dia.',
        image: `${ASSET_BASE}/images/books/emotional-design.webp`,
        link: '/about/library#book-1',
      },
      {
        id: 2,
        title: 'As Formas da Alegria: O Surpreendente Poder dos Objetos',
        description: "Revela como objetos, cores e formas aparentemente simples têm o poder de gerar felicidade, bem-estar e conexão emocional no nosso cotidiano.",
        image: `${ASSET_BASE}/images/books/joyful.webp`,
        link: '/about/library#book-2',
      },
      {
        id: 3,
        title: 'Neuroarquitetura: Projetando ambientes para os desafios contemporâneos',
        description: 'Mostra como ambientes bem projetados influenciam o cérebro, o comportamento e as emoções, ajudando a responder aos desafios humanos e sociais do mundo contemporâneo.',
        image: `${ASSET_BASE}/images/books/neuroarquitetura.webp`,
        link: '/about/library#book-4',
      },
      {
        id: 4,
        title: 'Neuroarquitetura: a neurociência no ambiente construído',
        description: "Explica como princípios da neurociência aplicados ao espaço físico impactam emoções, cognição e bem-estar, tornando a arquitetura uma ferramenta ativa de qualidade de vida.",
        image: `${ASSET_BASE}/images/books/neuroarquitetura-neurociencia.webp`,
        link: '/about/library#book-3',
      },
      {
        id: 5,
        title: 'Manual do Arquiteto Descalço',
        description: "Defende uma arquitetura essencial e sensível, que nasce da observação do lugar, do corpo e da experiência humana antes da forma ou da tecnologia.",
        image: `${ASSET_BASE}/images/books/descalco.webp`,
        link: '/about/library#book-6',
      },
      {
        id: 6,
        title: 'Os Olhos da Pele: A Arquitetura e os Sentidos',
        description: 'Revela que a arquitetura é vivida com todo o corpo — e que espaços memoráveis são aqueles que despertam os sentidos, não apenas a visão.',
        image: `${ASSET_BASE}/images/books/eyes-of-the-skin.webp`,
        link: '/about/library#book-5',
      },
    ],
  },

  // ==========================================================================
  // LIBRARY PAGE IMAGES (Book detail slides)
  // ==========================================================================
  library: {
    books: [
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
        title: 'As Formas da Alegria: O Surpreendente Poder dos Objetos',
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
        title: 'Os Olhos da Pele: A Arquitetura e os Sentidos',
        description: 'Juhani Pallasmaa defende que devemos projetar arquitetura para todo o corpo, não apenas para os olhos. Ele explica que todos os sentidos, incluindo a visão, são extensões do tato – o nosso corpo é a interface essencial com o espaço. Pallasmaa resume bem: "Eu me experimento na cidade; a cidade existe por meio de minha experiência corporal. A cidade e meu corpo se complementam e se definem. Eu moro na cidade, e a cidade mora em mim". Para mim, este livro reforça que cada material, luz e textura em um edifício toca emoções e memória: um espaço acolhedor envolve nossa pele, ouvidos e olfato tanto quanto nossos olhos. Isso alinha-se diretamente à minha visão em neuroarquitetura, pois mostra que ambientes multisensoriais criam experiências mais ricas e impactantes para as pessoas.',
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
        description: 'Esse clássico propõe uma arquitetura arraigada na simplicidade, na sustentabilidade e na sabedoria popular. Ele define o "arquiteto descalço" como aquele que abandona convenções modernas e aprende diretamente com a natureza e a comunidade: "a natureza é a verdadeira professora – o vento ensina sobre ventilação, o sol sobre iluminação e a chuva sobre o aproveitamento da água". O livro é repleto de esquemas simples e convida qualquer pessoa a construir com as próprias mãos usando materiais locais, promovendo autonomia. Para mim, essa obra inspiradora ressalta que projetar espaços habitáveis envolve sensibilidade ambiental e social: pensar localmente e construir de modo consciente gera espaços mais saudáveis e também emocionalmente ressonantes, pois fortalecem o sentido de pertencimento e de harmonia com o lugar.',
        images: [
          `${ASSET_BASE}/images/books/descalco/slide1.webp`,
          `${ASSET_BASE}/images/books/descalco/slide2.webp`,
          `${ASSET_BASE}/images/books/descalco/slide3.webp`,
          `${ASSET_BASE}/images/books/descalco/slide4.webp`,
        ],
      },
    ],
  },

  // ==========================================================================
  // PORTFOLIO PAGE IMAGES
  // ==========================================================================
  portfolio: {
    hero: {
      background: `${ASSET_BASE}/images/hero-portfolio-bg.webp`,
    },
    // Note: Project images are loaded from Sanity CMS
  },

  // ==========================================================================
  // PORTFOLIO 3D PAGE IMAGES
  // ==========================================================================
  portfolio3d: {
    hero: {
      background: `${ASSET_BASE}/images/hero-3drendering-bg.webp`,
    },
    ourExpertise: {
      interiorRendering: `${ASSET_BASE}/images/expertise-interior-rendering.webp`,
      exteriorRendering: `${ASSET_BASE}/images/expertise-exterior-rendering.webp`,
      virtualTour: `${ASSET_BASE}/images/expertise-virtual-tour.webp`,
      productBrand: `${ASSET_BASE}/images/expertise-product-brand.webp`,
    },
    caseStudies: {
      row1: {
        aerialCampus: `${ASSET_BASE}/images/case-aerial-campus.webp`,
        coupleBalcony: `${ASSET_BASE}/images/case-couple-balcony.webp`,
      },
      row2: {
        bedroomPatio: `${ASSET_BASE}/images/case-bedroom-patio.webp`,
        modernKitchen: `${ASSET_BASE}/images/case-modern-kitchen.webp`,
        bedroomCity: `${ASSET_BASE}/images/case-bedroom-city.webp`,
      },
      row3: {
        skyscraper: `${ASSET_BASE}/images/case-skyscraper.webp`,
        forestHouse: `${ASSET_BASE}/images/case-forest-house.webp`,
      },
      row4: {
        apartmentEntrance: `${ASSET_BASE}/images/case-apartment-entrance.webp`,
        apartmentBuilding: `${ASSET_BASE}/images/case-apartment-building.webp`,
        luxuryInterior: `${ASSET_BASE}/images/case-luxury-interior.webp`,
      },
    },
    howItWorks: {
      technicalSpec: `${ASSET_BASE}/images/how-technical-spec.webp`,
      workProcess: `${ASSET_BASE}/images/how-work-process.webp`,
      preview1: `${ASSET_BASE}/images/how-preview-1.webp`,
      preview2: `${ASSET_BASE}/images/how-preview-2.webp`,
      finalRenders: `${ASSET_BASE}/images/how-final-renders.webp`,
    },
  },

  // ==========================================================================
  // CONTACT PAGE IMAGES
  // ==========================================================================
  contact: {
    hero: {
      background: `${ASSET_BASE}/images/hero-contact-bg.webp`,
    },
  },

  // ==========================================================================
  // 404 PAGE IMAGES
  // ==========================================================================
  notFound: {
    hero: {
      src: `${ASSET_BASE}/images/hero-notFound-bg.webp`,
      alt: 'Modern interior architecture',
    },
  },
} as const;

// =============================================================================
// CONVENIENCE EXPORTS (for backward compatibility)
// =============================================================================

// Export books array directly for library components
export const books = images.library.books;

// =============================================================================
// PRELOAD LISTS (for Loader component)
// Organized by page for selective preloading
// =============================================================================

export const preloadAssets = {
  // Shared assets preloaded on all pages
  shared: {
    images: [] as string[],
    videos: [
      videos.navigationBackground.mp4,
      videos.footerBackground.mp4,
    ],
  },

  // Home page specific assets
  home: {
    images: [
      images.home.hero.background,
      ...images.home.carousel.map(img => img.src),
      images.home.projects.interior,
      images.home.projects.architecture,
      images.home.decorations.threadLine,
    ],
    videos: [
      videos.home.projectsBackground.mp4,
    ],
  },

  // About page specific assets
  about: {
    images: [
      images.about.hero.background,
      images.about.team.giuliaparente.photo,
      ...images.about.bookThumbnails.map(book => book.image),
    ],
    videos: [
      videos.about.team.giuliaparente.mp4,
      videos.about.library.mp4,
    ],
  },

  // Library page specific assets
  library: {
    images: [
      ...images.library.books.flatMap(book => book.images),
    ],
    videos: [] as string[],
  },

  // Portfolio page specific assets
  portfolio: {
    images: [
      images.portfolio.hero.background,
    ],
    videos: [] as string[],
  },

  // Portfolio 3D page specific assets
  portfolio3d: {
    images: [
      images.portfolio3d.hero.background,
      images.portfolio3d.ourExpertise.interiorRendering,
      images.portfolio3d.ourExpertise.exteriorRendering,
      images.portfolio3d.ourExpertise.virtualTour,
      images.portfolio3d.ourExpertise.productBrand,
      // Case Studies
      images.portfolio3d.caseStudies.row1.aerialCampus,
      images.portfolio3d.caseStudies.row1.coupleBalcony,
      images.portfolio3d.caseStudies.row2.bedroomPatio,
      images.portfolio3d.caseStudies.row2.modernKitchen,
      images.portfolio3d.caseStudies.row2.bedroomCity,
      images.portfolio3d.caseStudies.row3.skyscraper,
      images.portfolio3d.caseStudies.row3.forestHouse,
      images.portfolio3d.caseStudies.row4.apartmentEntrance,
      images.portfolio3d.caseStudies.row4.apartmentBuilding,
      images.portfolio3d.caseStudies.row4.luxuryInterior,
      // How It Works
      images.portfolio3d.howItWorks.technicalSpec,
      images.portfolio3d.howItWorks.workProcess,
      images.portfolio3d.howItWorks.preview1,
      images.portfolio3d.howItWorks.preview2,
      images.portfolio3d.howItWorks.finalRenders,
    ],
    videos: [
      videos.portfolio3d.heroBackground.mp4,
      videos.portfolio3d.expertiseAnimation.mp4,
    ],
  },

  // Contact page specific assets
  contact: {
    images: [
      images.contact.hero.background,
    ],
    videos: [] as string[],
  },

  // 404 page specific assets
  notFound: {
    images: [
      images.notFound.hero.src,
    ],
    videos: [] as string[],
  },
} as const;

// =============================================================================
// COMBINED PRELOAD LISTS (for preloadMedia.ts)
// =============================================================================

// All images to preload
export const preloadImages: string[] = [
  ...preloadAssets.shared.images,
  ...preloadAssets.home.images,
  ...preloadAssets.about.images,
  ...preloadAssets.library.images,
  ...preloadAssets.portfolio.images,
  ...preloadAssets.portfolio3d.images,
  ...preloadAssets.contact.images,
  ...preloadAssets.notFound.images,
];

// All videos to preload
export const preloadVideos: string[] = [
  ...preloadAssets.shared.videos,
  ...preloadAssets.home.videos,
  ...preloadAssets.about.videos,
  ...preloadAssets.library.videos,
  ...preloadAssets.portfolio.videos,
  ...preloadAssets.portfolio3d.videos,
  ...preloadAssets.contact.videos,
  ...preloadAssets.notFound.videos,
];