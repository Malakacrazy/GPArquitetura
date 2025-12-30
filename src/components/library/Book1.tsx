import { BookDetail } from '../BookDetail';
import { books } from '../config/assets';

export function Book1() {
  const book = books[0];

  return <BookDetail book={book} index={0} />;
}