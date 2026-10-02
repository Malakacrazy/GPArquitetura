# GP Arquitetura

<div align="center">

![GP Arquitetura](public/favicon.ico)

**Portfolio website for GP Arquitetura - Architecture and Interior Design Studio based in São Paulo, Brazil**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://studioaraci.com.br)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

[Live Demo](https://studioaraci.com.br) • [Portfolio](https://studioaraci.com.br/portfolio) • [3D Visualization](https://studioaraci.com.br/3d-visualization) • [Contact](https://studioaraci.com.br/contact)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [SEO](#-seo)
- [Design](#-design-system)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏛️ About

GP Arquitetura is a comprehensive portfolio website showcasing architectural projects and 3D visualization services. The site features a modern, elegant design with smooth animations and dynamic content management through Sanity CMS.

### Key Highlights

- **Portfolio Showcase**: Display architectural projects with detailed galleries and information
- **3D Visualization Services**: Dedicated section for rendering and visualization work
- **Dynamic Content**: Projects managed through Sanity CMS
- **Responsive Design**: Optimized for all devices
- **Performance Optimized**: Fast loading with optimized assets

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Modern UI** | Clean, elegant design with earth-tone color palette |
| 🖼️ **Project Gallery** | Grid and list views with detailed project pages |
| 🎬 **Smooth Animations** | Framer Motion powered transitions and effects |
| 📱 **Responsive** | Mobile-first design approach |
| 🔍 **SEO Optimized** | Meta tags, Open Graph, Twitter Cards, JSON-LD |
| 🍪 **Cookie Consent** | Multi-jurisdictional banner with CookieHub |
| 🔒 **Privacy Compliant** | Fully compliant with LGPD, GDPR, and CCPA |
| 📊 **Analytics** | Google Analytics and Hotjar integration |
| 🚀 **Fast Loading** | Optimized images, lazy loading, code splitting |
| 📝 **CMS Integration** | Sanity Studio for content management |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animations
- **React Router 7** - Client-side routing

### Backend / CMS
- **Sanity CMS** - Headless CMS for project content
- **Sanity Image URL** - Image optimization

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Embla Carousel** - Touch-friendly carousels

### Legal & Compliance
- **CookieHub** - Multi-jurisdictional cookie consent  
- **LGPD/GDPR/CCPA** - Compliance frameworks implemented  

### Deployment & Analytics
- **Vercel** - Hosting and deployment
- **Google Analytics** - Traffic analytics
- **Hotjar/Contentsquare** - User behavior tracking

---

## 📁 Project Structure

```
GPArquitetura/
├── public/                 # Static assets
│   ├── icons/             # UI icons
│   ├── images/            # Static images
│   ├── videos/            # Video assets
│   ├── favicon.ico        # Site favicon
│   ├── robots.txt         # Search engine rules
│   ├── sitemap.xml        # XML sitemap
│   └── site.webmanifest   # PWA manifest
├── src/
│   ├── components/        # React components
│   │   ├── 404/          # Not found page
│   │   ├── about/        # About page sections
│   │   ├── contact/      # Contact page
│   │   ├── home/         # Homepage sections
│   │   ├── legal/        # Privacy & ToS
│   │   ├── library/      # Book library
│   │   ├── portfolio/    # Portfolio listing
│   │   ├── portfolio3d/  # 3D services page
│   │   ├── project/      # Project detail
│   │   └── shared/       # Shared components
│   ├── config/           # App configuration
│   ├── hooks/            # Custom React hooks
│   │   ├── useProjects.js
│   │   └── useSEO.ts
│   ├── pages/            # Page components
│   ├── sanity/           # Sanity client config
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global CSS
├── sanity-studio/        # Sanity Studio (CMS)
├── docs/                 # Documentation
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel config
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/GPArquitetura.git
   cd GPArquitetura
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Sanity project credentials.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

### Sanity Studio

```bash
cd sanity-studio
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

---

## 🌐 Deployment

The site is deployed on **Vercel** with automatic deployments from the `main` branch.

### Manual Deployment

```bash
npm run build
vercel --prod
```

### Vercel Configuration

The `vercel.json` includes:
- SPA routing rewrites
- Security headers
- Cache optimization for static assets

---

## 🔍 SEO

Comprehensive SEO implementation including:

- ✅ Dynamic meta tags per page
- ✅ Open Graph tags for social sharing
- ✅ Twitter Cards
- ✅ JSON-LD structured data (ArchitecturalBusiness schema)
- ✅ XML Sitemap
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Google Analytics (G-BWV35TXN66)
- ✅ Hotjar/Contentsquare tracking

---

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#8B7355` | Brand color, accents |
| Background | `#F5F5F0` | Page backgrounds |
| Text Primary | `#1A1A1A` | Headings |
| Text Secondary | `#666666` | Body text |

### Typography

- **Headings**: El Messiri, Italiana
- **Display**: Megrim
- **Body**: System fonts

---

## 🗺️ Roadmap

- [ ] Dark mode toggle
- [ ] Multi-language support (EN/PT)
- [ ] AI-powered project recommendations
- [ ] Client portal

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software developed for GP Arquitetura.

---

## 👥 Credits

- **Design & Development**: Matheus Malaquias
- **Architecture**: GP Arquitetura - Giulia Parente
- **Icons**: [Lucide](https://lucide.dev)
- **Fonts**: [Google Fonts](https://fonts.google.com)

---

<div align="center">

**Built with ❤️ for GP Arquitetura**

**De espaços vazios a histórias habitadas**

[⬆ Back to Top](#gp-arquitetura)

</div>
