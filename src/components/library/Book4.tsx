/**
 * Book4 Component
 *
 * Fourth book in the library showcase. Wrapper around BookDetail
 * that passes the fourth book from the assets configuration.
 *
 * @module components/library/Book4
 * @since 1.0.0
 * @see BookDetail - Base component that renders the book
 * @see books - Book data from config/assets
 */
import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

/**
 * Renders the fourth book in the library
 *
 * @returns Book detail component for book 4
 */
export function Book4() {
  const book = books[3];

  return <BookDetail book={book} index={3} />;
}