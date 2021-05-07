import { IDispose } from 'react-modular-js';

export class HomeController implements IDispose {
  val = 1;

  private _interval: any;

  constructor() {
    this._interval = setInterval(() => console.log(this.val++, Math.random()), 1000);
  }

  handller(evt: any) {
    console.log(evt.x);
  }

  dispose() {
    clearInterval(this._interval);
  }
}
