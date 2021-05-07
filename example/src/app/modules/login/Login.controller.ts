import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { IDispose } from 'react-modular-js';
import { ISessionService } from '../../shared/auth/store/session/Session.service.interface';
import { IUser } from '../../shared/auth/store/user/User.model';

export class LoginController implements IDispose {
  loading = new BehaviorSubject(false);
  user?: IUser;
  error?: Error;

  constructor(private session: ISessionService) {}

  async login(email: string, pass: string) {
    try {
      this.loading.next(true);
      const _session = await this.session.login(email, pass);
      this.user = await firstValueFrom(_session.user);
    } catch (err) {
      this.error = err;
    } finally {
      this.loading.next(false);
    }
  }

  dispose() {}
}
