/**
 * Book3 Component
 *
 * Third book in the library showcase. Wrapper around BookDetail
 * that passes the third book from the assets configuration.
 *
 * @module components/library/Book3
 * @since 1.0.0
 * @see BookDetail - Base component that renders the book
 * @see books - Book data from config/assets
 */
import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

/**
 * Renders the third book in the library
 *
 * @returns Book detail component for book 3
 */
export function Book3() {
  const book = books[2];

  return <BookDetail book={book} index={2} />;
}