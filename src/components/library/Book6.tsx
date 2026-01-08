/**
 * Book6 Component
 *
 * Sixth book in the library showcase. Wrapper around BookDetail
 * that passes the sixth book from the assets configuration.
 *
 * @module components/library/Book6
 * @since 1.0.0
 * @see BookDetail - Base component that renders the book
 * @see books - Book data from config/assets
 */
import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

/**
 * Renders the sixth book in the library
 *
 * @returns Book detail component for book 6
 */
export function Book6() {
  const book = books[5];

  return <BookDetail book={book} index={5} />;
}