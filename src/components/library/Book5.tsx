/**
 * Book5 Component
 *
 * Fifth book in the library showcase. Wrapper around BookDetail
 * that passes the fifth book from the assets configuration.
 *
 * @module components/library/Book5
 * @since 1.0.0
 * @see BookDetail - Base component that renders the book
 * @see books - Book data from config/assets
 */
import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

/**
 * Renders the fifth book in the library
 *
 * @returns Book detail component for book 5
 */
export function Book5() {
  const book = books[4];

  return <BookDetail book={book} index={4} />;
}