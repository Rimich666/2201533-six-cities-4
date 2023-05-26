import {DataGeneratorInterface} from './data-generator.interface.js';
import {MockUsersData} from '../../types/mock-data.type.js';
import {generatePassword, getRandomItem} from '../../core/helpers/random.js';
import {UserType} from '../../types/user.type.js';

export default class UserGenerator implements DataGeneratorInterface {
  private index = 0;
  constructor(private readonly mockData: MockUsersData) {
  }

  public generate(): string {
    const email = this.mockData.emails[this.index];
    const name = getRandomItem(this.mockData.users);
    const avatar = getRandomItem(this.mockData.avatars);
    const type = getRandomItem(Object.values(UserType));
    const password = generatePassword();
    this.index ++;
    return [[email, avatar, name, type, password].join('\t')].join('\n');
  }
}
