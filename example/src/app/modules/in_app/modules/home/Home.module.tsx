import { useMemo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Provider } from 'react-modular-js';
import HomePage from './Home.page';
import { HomeController } from './Home.controller';

const HomeModule = () => {
  const { path } = useRouteMatch();
  const binds = useMemo(() => [() => new HomeController()], []);

  return (
    <Provider binds={binds}>
      {() => (
        <Switch>
          <Route exact path={path} component={HomePage} />
        </Switch>
      )}
    </Provider>
  );
};

export default HomeModule;
