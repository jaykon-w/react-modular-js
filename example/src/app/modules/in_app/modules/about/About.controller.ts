import { IDispose } from 'react-modular-js';

export class AboutController implements IDispose {
  constructor() {
    console.log('INITIALIZE: AboutController');
  }

  dispose() {
    console.log('DISPOSE: Aboutcontroller');
  }
}
