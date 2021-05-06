import { Link, useHistory } from 'react-router-dom';
import { Observer, useProvider } from 'react-modular-js';
import { InAppController } from './InApp.controller';

interface Props {}

const InAppPage: React.FC<Props> = ({ children }) => {
  console.log('RENDER INAPP');
  const inAppController = useProvider(InAppController);
  const { replace } = useHistory();

  const logout = async () => {
    inAppController.logout();
    if (!inAppController.user) replace('/');
  };

  return (
    <Observer stream={inAppController.loading}>
      {(loading) =>
        loading ? (
          <span>Carregando...</span>
        ) : (
          <div>
            <div style={{ display: 'flex', padding: 16, background: '#666', color: '#fff' }}>
              REACT-MODULAR-JS
              <div style={{ flex: 1 }}></div>
              <Observer stream={inAppController.user}>{(user) => user?.name}</Observer> |{' '}
              <a href="#" onClick={logout}>
                Logout
              </a>
            </div>
            <div style={{ padding: 16 }}>{children}</div>
          </div>
        )
      }
    </Observer>
  );
};

export default InAppPage;
