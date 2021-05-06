import { useMemo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Provider } from 'react-modular-js';
import AboutPage from './About.page';
import { AboutController } from './About.controller';

const AboutModule = () => {
  const { path } = useRouteMatch();
  const binds = useMemo(() => [() => new AboutController()], []);

  return (
    <Provider binds={binds}>
      <Switch>
        <Route exact path={path} component={AboutPage} />
      </Switch>
    </Provider>
  );
};

export default AboutModule;
