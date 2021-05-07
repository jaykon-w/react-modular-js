import { IDispose } from 'react-modular-js';
import { BehaviorSubject } from 'rxjs';

export class SideMenuController implements IDispose {
  menuStateOpen = new BehaviorSubject<boolean>(true);

  toogle() {
    this.menuStateOpen.next(!this.menuStateOpen.value);
  }

  dispose() {}
}
