import { useMemo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Provider } from 'react-modular-js';
import AboutPage from './About.page';

const AboutModule = () => {
  const { path } = useRouteMatch();
  const binds = useMemo(() => [], []);

  return (
    <Provider binds={binds}>
      <Switch>
        <Route exact path={path} component={AboutPage} />
      </Switch>
    </Provider>
  );
};

export default AboutModule;
