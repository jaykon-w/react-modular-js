import { useMemo } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Provider, ProviderBinds } from 'react-modular-js';
import AboutModule from './modules/about/About.module';
import HomeModule from './modules/home/Home.module';
import { InAppController } from './InApp.controller';
import { ISessionService } from '../../shared/auth/store/session/Session.service.interface';
import InAppPage from './InApp.page';

const InAppModule = () => {
  const { path } = useRouteMatch();
  const binds = useMemo((): ProviderBinds => [(i) => new InAppController(i(ISessionService))], []);

  return (
    <Provider binds={binds}>
      <InAppPage>
        <Switch>
          <Route path={`${path}/about`} component={AboutModule} />
          <Route path={`${path}/home`} component={HomeModule} />
          <Route path={`${path}/`}>
            <Redirect to={`${path}/home`} />
          </Route>
        </Switch>
      </InAppPage>
    </Provider>
  );
};

export default InAppModule;
