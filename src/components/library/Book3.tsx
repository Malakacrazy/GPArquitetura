import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

export function Book3() {
  const book = books[2];

  return <BookDetail book={book} index={2} />;
}