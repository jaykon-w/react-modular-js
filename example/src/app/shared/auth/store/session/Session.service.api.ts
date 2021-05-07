import { BehaviorSubject } from 'rxjs';
import { IUser } from '../user/User.model';
import { ISessionService } from './Session.service.interface';

export class SessionServiceApi extends ISessionService {
  logged = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<IUser | undefined>(undefined);
  initialized = new BehaviorSubject<boolean>(false);

  constructor() {
    super();
    this.initialized.next(true);
  }

  login(email: string, pass: string): Promise<this> {
    throw new Error('Method not implemented.');
  }

  logout() {
    throw new Error('Method not implemented.');
  }
}
