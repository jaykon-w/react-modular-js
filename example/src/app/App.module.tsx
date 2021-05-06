import { useMemo } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-modular-js';

import LoginModule from './modules/login/Login.module';
import { SessionServiceMock } from './shared/auth/store/session/Session.service.mock';
import ProtectedRoute from './shared/auth/Protected.route';
import InAppModule from './modules/in_app/InApp.module';

const AppModule = () => {
  const binds = useMemo(() => [() => new SessionServiceMock()], []);

  return (
    <BrowserRouter>
      <Provider binds={binds}>
        <Switch>
          <Route exact path="/login" component={LoginModule} />
          <ProtectedRoute path="/in_app" redirect="/login" component={InAppModule} />
          <Route path="/">
            <Redirect to="/in_app" />
          </Route>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default AppModule;
