import { BookDetail } from './BookDetail';
import { books } from '../config/assets';

export function Book2() {
  const book = books[1];

  return <BookDetail book={book} index={1} />;
}