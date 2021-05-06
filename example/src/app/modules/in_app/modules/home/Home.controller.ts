import { IDispose } from 'react-modular-js';

export class HomeController implements IDispose {
  constructor() {
    console.log('INITIALIZE: Homecontroller');
  }

  dispose() {
    console.log('DISPOSE: Homecontroller');
  }
}
