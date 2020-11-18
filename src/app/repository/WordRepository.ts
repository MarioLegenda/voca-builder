import { Word } from '../../components/contracts';
import Firebase from '../Firebase';

export default class WordRepository {
  // Promise<Error | null> from firebase api
  async saveWord(word: Word): Promise<Word> {
    const key: string = Firebase.database.ref().push().key;
    await Firebase.database.ref(`words/${key}/`).set(word);

    word.id = key;

    return word;
  }
}

export async function saveWord(word: Word): Promise<Word> {
  const key: string = Firebase.database.ref().push().key as string;
  await Firebase.database.ref(`words/${key}/`).set(word);

  word.id = key;

  return word;
}
