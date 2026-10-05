import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal';
import { blogUrlFor } from '../../sanity/client';
import { readingMinutes } from './postMeta';

interface PostCardProps {
  post: any;
  index?: number;
}

/** Story card, same look as the smaller cards of the blog page ("Leia também") */
export const PostCard = ({ post, index = 0 }: PostCardProps) => {
  const minutes = readingMinutes(post.chars);

  return (
    <Reveal delay={(index % 3) * 0.1}>
      <Link
        to={`/blog/${post.slug.current}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group block no-underline"
      >
        <div
          className={`aspect-[16/10] overflow-hidden rounded-[16px] bg-[var(--color-accent)] ${
            index % 2 === 1 ? 'rounded-br-[120px]' : ''
          }`}
        >
          {post.coverImage && (
            <img
              src={blogUrlFor(post.coverImage).width(1000).url()}
              alt={post.coverImage.alt || post.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="mt-5 flex items-center justify-between text-xs tracking-[0.1em] uppercase">
          <span className="text-[var(--color-primary)]">{post.category}</span>
          {minutes && <span className="text-[var(--color-text-muted)] normal-case tracking-normal">{minutes} min</span>}
        </div>
        <h3 className="mt-3 text-2xl md:text-3xl tracking-tight text-[var(--color-text-dark)] transition-colors duration-500 group-hover:text-[var(--color-primary)]">
          {post.title}
        </h3>
      </Link>
    </Reveal>
  );
};
