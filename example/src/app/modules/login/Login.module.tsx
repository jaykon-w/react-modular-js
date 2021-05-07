import { useMemo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Provider, ProviderBinds } from 'react-modular-js';
import LoginPage from './Login.page';
import { LoginController } from './Login.controller';
import { ISessionService } from '../../shared/auth/store/session/Session.service.interface';

const LoginModule = () => {
  const { path } = useRouteMatch();
  const binds = useMemo((): ProviderBinds => [(i) => new LoginController(i(ISessionService))], []);

  return (
    <Provider binds={binds}>
      {() => (
        <Switch>
          <Route exact path={path} component={LoginPage} />
        </Switch>
      )}
    </Provider>
  );
};

export default LoginModule;
