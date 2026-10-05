import { Link } from 'react-router-dom';
import { m as motion } from 'motion/react';
import { blogUrlFor } from '../../sanity/client';
import { formatPostDate } from './postMeta';

interface PostCardProps {
  post: any;
  index?: number;
  /** Large layout used for the first post on the blog page */
  featured?: boolean;
}

/** Same hover treatment as the portfolio images: rounded corners, slow zoom and a blurred terracotta label */
export const PostCard = ({ post, index = 0, featured = false }: PostCardProps) => {
  const meta = [post.category, formatPostDate(post.publishedAt)].filter(Boolean).join(' · ');

  return (
    <Link
      to={`/blog/${post.slug.current}`}
      className="group block no-underline"
      onClick={() => window.scrollTo(0, 0)}
    >
      <motion.article
        initial={{ opacity: 0, y: featured ? 40 : 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: featured ? 0 : (index % 3) * 0.1 }}
        className={featured ? 'flex flex-col gap-6 md:gap-8' : 'flex flex-col gap-4 md:gap-6'}
      >
        <div
          className={`relative w-full overflow-hidden rounded-[12px] bg-[var(--color-accent)] ${
            featured ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[4/5]'
          }`}
        >
          {post.coverImage && (
            <img
              src={blogUrlFor(post.coverImage).width(featured ? 1920 : 900).url()}
              alt={post.coverImage.alt || post.title}
              loading={featured ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Hover overlay */}
          <div
            className="absolute left-2 bottom-2 mr-2 bg-[var(--color-primary)]/50 rounded-[12px] p-4 pointer-events-none duration-[600ms] ease-out opacity-0 translate-y-5 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <p className="text-white text-xs font-bold tracking-[0.2em] uppercase">Ler artigo</p>
          </div>
        </div>

        <div className={featured ? 'grid md:grid-cols-2 gap-4 md:gap-12' : 'space-y-3'}>
          <div className="space-y-3">
            {meta && (
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)]">{meta}</p>
            )}
            <h3
              className={`font-medium tracking-tight text-[var(--color-text-dark)] transition-colors duration-500 group-hover:text-[var(--color-primary)] ${
                featured ? 'text-2xl md:text-4xl lg:text-5xl leading-tight' : 'text-xl md:text-2xl'
              }`}
            >
              {post.title}
            </h3>
          </div>
          <p
            className={`text-[var(--color-text-muted)] font-light leading-relaxed ${
              featured ? 'text-base md:text-lg md:self-end' : 'text-base'
            }`}
          >
            {post.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
};
