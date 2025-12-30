import { BookDetail } from './BookDetail';
import { books } from '../../config/assets';

export function Book4() {
  const book = books[3];

  return <BookDetail book={book} index={3} />;
}