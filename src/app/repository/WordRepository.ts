import { Word } from '../../components/contracts';
import Firebase from '../Firebase';

export default class WordRepository {
  async saveWord(word: Word) {
    const key: string = Firebase.database.ref().push().key;
    await Firebase.database.ref(`words/${key}/`).set(word);
  }
}
