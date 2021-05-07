import { Redirect, Route } from 'react-router';
import { Observer, useProvider } from 'react-modular-js';
import { ISessionService } from './store/session/Session.service.interface';
import { createElement, memo, useMemo } from 'react';

interface Props {
  path: string;
  redirect: string;
  component: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = memo(({ path, redirect, children, component }) => {
  const session = useProvider(ISessionService);

  const cp = useMemo(() => createElement(component as any), []);

  return (
    <Route path={path}>
      <Observer stream={session.logged}>
        {(logged) => (!logged ? <Redirect to={redirect} /> : cp || children)}
      </Observer>
    </Route>
  );
});

export default ProtectedRoute;
