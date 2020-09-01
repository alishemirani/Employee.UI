import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Token } from './token';

export class UserData implements InMemoryDbService {

  createDb() {
    const users: Token[] = [
      {
        token: 'sdfljsldfj'
      }
    ];
    return { users };
  }
}
