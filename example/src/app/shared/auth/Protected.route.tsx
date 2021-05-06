import { Redirect, Route } from 'react-router';
import { Observer, useProvider } from 'react-modular-js';
import { ISessionService } from './store/session/Session.service.interface';
import { createElement } from 'react';

interface Props {
  path: string;
  redirect: string;
  component: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ path, redirect, children, component }) => {
  const session = useProvider(ISessionService);

  return (
    <Route path={path}>
      <Observer stream={session.logged}>
        {(logged) =>
          !logged ? <Redirect to={redirect} /> : createElement(component as any) || children
        }
      </Observer>
    </Route>
  );
};

export default ProtectedRoute;
