import { BehaviorSubject } from 'rxjs';
import { IUser } from '../user/User.model';
import { InvalidAuth } from './errors/InvalidAuth.error';
import { ISessionService } from './Session.service.interface';

export class SessionServiceMock extends ISessionService {
  logged = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<IUser | undefined>(undefined);
  initialized = new BehaviorSubject<boolean>(false);

  constructor() {
    super();
    this.restore();
    this.initialized.next(true);
  }

  async login(email: string, pass: string): Promise<this> {
    await new Promise((r) => setTimeout(r, 1000));
    if (email === 'admin@rmjs.com' && pass === 'admin123') {
      const _user = {
        email: 'admin@rmjs.com',
        name: 'Admin',
      };
      localStorage.setItem('user', JSON.stringify(_user));

      this.logged.next(true);
      this.user.next(_user);
    } else {
      throw new InvalidAuth('Invalid email and passoword combination');
    }

    return this;
  }

  async logout() {
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.clear();
    this.user.next(undefined);
    this.logged.next(false);
  }

  updateUser(user: Partial<IUser>): void {
    const _user = {
      ...this.user.value!,
      ...user,
    };
    this.user.next(_user);
    localStorage.setItem('user', JSON.stringify(_user));
  }

  private restore() {
    const _user = localStorage.getItem('user');
    if (!_user) return;

    this.user.next(JSON.parse(_user));
    this.logged.next(true);
  }
}
