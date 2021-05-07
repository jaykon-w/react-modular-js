import { IDispose } from 'react-modular-js';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ISessionService } from '../../shared/auth/store/session/Session.service.interface';
import { IUser } from '../../shared/auth/store/user/User.model';

export class InAppController implements IDispose {
  loading = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<IUser | undefined>(undefined);

  private _userSub: Subscription;

  constructor(private session: ISessionService) {
    console.log('INITIALIZE: InAppController');
    this._userSub = this.session.user.subscribe(this.user);
  }

  async logout() {
    try {
      this.loading.next(true);
      await this.session.logout();
    } finally {
      this.loading.next(false);
    }
  }

  dispose() {
    console.log('DISPOSE: InAppController');
    this._userSub.unsubscribe();
  }
}
