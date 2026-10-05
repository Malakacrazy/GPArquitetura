import { Link } from 'react-router-dom';
import { m as motion } from 'motion/react';
import { blogUrlFor } from '../../sanity/client';
import { formatPostDate } from './formatPostDate';

interface PostCardProps {
  post: any;
  index?: number;
}

export const PostCard = ({ post, index = 0 }: PostCardProps) => (
  <Link
    to={`/blog/${post.slug.current}`}
    className="block no-underline"
    onClick={() => window.scrollTo(0, 0)}
  >
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group cursor-pointer hover:bg-[var(--color-primary)] hover:p-6 md:hover:p-8 transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[var(--color-accent)] mb-6 md:mb-8">
        {post.coverImage && (
          <img
            src={blogUrlFor(post.coverImage).width(800).url()}
            alt={post.coverImage.alt || post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <div className="space-y-3 md:space-y-4">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)] group-hover:text-[var(--color-background)] transition-colors duration-500">
          {[post.category, formatPostDate(post.publishedAt)].filter(Boolean).join(' · ')}
        </p>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-dark)] group-hover:text-[var(--color-background)] transition-colors duration-500">
          {post.title}
        </h3>
        <p className="text-base md:text-lg text-[var(--color-text-muted)] group-hover:text-[var(--color-background)] leading-relaxed transition-colors duration-500">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  </Link>
);
