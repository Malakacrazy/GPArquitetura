import { BookDetail } from '../BookDetail';
import { books } from '../config/assets';

export function Book6() {
  const book = books[5];

  return <BookDetail book={book} index={5} />;
}