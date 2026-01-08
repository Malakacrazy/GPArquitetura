/**
 * Book1 Component
 *
 * First book in the library showcase. Wrapper around BookDetail
 * that passes the first book from the assets configuration.
 *
 * @module components/library/Book1
 * @since 1.0.0
 * @see BookDetail - Base component that renders the book
 * @see books - Book data from config/assets
 */
import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

/**
 * Renders the first book in the library
 *
 * @returns Book detail component for book 1
 */
export function Book1() {
  const book = books[0];

  return <BookDetail book={book} index={0} />;
}