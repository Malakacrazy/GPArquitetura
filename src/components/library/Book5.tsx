import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

export function Book5() {
  const book = books[4];

  return <BookDetail book={book} index={4} />;
}