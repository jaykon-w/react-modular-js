import { useMemo } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-modular-js';

import HomeModule from './modules/home/Home.module';
import AboutModule from './modules/about/About.module';

const AppModule = () => {
  const binds = useMemo(() => [], []);

  return (
    <BrowserRouter>
      <Provider binds={binds}>
        <Switch>
          <Route path="/about" component={AboutModule} />
          <Route path="/" component={HomeModule} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default AppModule;
