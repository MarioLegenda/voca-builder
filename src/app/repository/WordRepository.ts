import { Word } from '../../components/contracts';
import Firebase from '../Firebase';

export default class WordRepository {
  // Promise<Error | null> from firebase api
  async saveWord(word: Word): Promise<Error | null> {
    const key: string = Firebase.database.ref().push().key;
    await Firebase.database.ref(`words/${key}/`).set(word);
  }
}
