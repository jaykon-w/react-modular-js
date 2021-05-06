import { Subject } from 'rxjs';
import { IUser } from '../user/User.model';

interface ISession {
  logged: Subject<boolean>;
  user: Subject<IUser | undefined>;
}

export abstract class ISessionService implements ISession {
  abstract logged: Subject<boolean>;
  abstract user: Subject<IUser | undefined>;

  abstract login(email: string, pass: string): Promise<this>;
  abstract logout(): any;
}
