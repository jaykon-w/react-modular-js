import { Subject } from 'rxjs';
import { IUser } from '../user/User.model';

export abstract class ISessionService {
  abstract logged: Subject<boolean>;
  abstract user: Subject<IUser | undefined>;
  abstract initialized: Subject<boolean>;

  abstract login(email: string, pass: string): Promise<this>;
  abstract logout(): any;
}
