/**
 * Book2 Component
 *
 * Second book in the library showcase. Wrapper around BookDetail
 * that passes the second book from the assets configuration.
 *
 * @module components/library/Book2
 * @since 1.0.0
 * @see BookDetail - Base component that renders the book
 * @see books - Book data from config/assets
 */
import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

/**
 * Renders the second book in the library
 *
 * @returns Book detail component for book 2
 */
export function Book2() {
  const book = books[1];

  return <BookDetail book={book} index={1} />;
}