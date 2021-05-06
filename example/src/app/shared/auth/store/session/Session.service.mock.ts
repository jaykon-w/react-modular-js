import { BehaviorSubject } from 'rxjs';
import { IUser } from '../user/User.model';
import { InvalidAuth } from './errors/InvalidAuth.error';
import { ISessionService } from './Session.service.interface';

export class SessionServiceMock extends ISessionService {
  logged = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<IUser | undefined>(undefined);

  async login(email: string, pass: string): Promise<this> {
    await new Promise((r) => setTimeout(r, 1000));
    if (email === 'admin@rmjs.com' && pass === 'admin123') {
      this.logged.next(true);
      this.user.next({
        email: 'admin@rmjs.com',
        name: 'Admin',
      });
    } else {
      throw new InvalidAuth('Invalid email and passoword combination');
    }

    return this;
  }

  async logout() {
    await new Promise((r) => setTimeout(r, 1000));
    this.user.next(undefined);
    this.logged.next(false);
  }
}
