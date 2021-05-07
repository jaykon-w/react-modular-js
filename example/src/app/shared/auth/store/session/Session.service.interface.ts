import { BehaviorSubject } from 'rxjs';
import { IUser } from '../user/User.model';

export abstract class ISessionService {
  abstract logged: BehaviorSubject<boolean>;
  abstract user: BehaviorSubject<IUser | undefined>;
  abstract initialized: BehaviorSubject<boolean>;

  abstract login(email: string, pass: string): Promise<this>;
  abstract logout(): any;
  abstract updateUser(user: Partial<IUser>): void;
}
