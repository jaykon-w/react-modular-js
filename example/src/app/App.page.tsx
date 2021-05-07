import { Observer, useProvider } from 'react-modular-js';
import { ISessionService } from './shared/auth/store/session/Session.service.interface';

interface Props {}

const AppPage: React.FC<Props> = ({ children }) => {
  const sessionService = useProvider(ISessionService);

  return (
    <Observer stream={sessionService.initialized}>
      {(init) => (init ? children : 'Carregando...')}
    </Observer>
  );
};

export default AppPage;
