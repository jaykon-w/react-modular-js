import { useHistory } from 'react-router-dom';
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
            <div
              style={{
                display: 'flex',
                padding: 16,
                background: '#272a3c',
                color: '#fff',
                boxShadow: 'rgb(0 0 0 / 50%) 0px 1px 5px',
              }}
            >
              <strong>REACT-MODULAR-JS</strong>
              <div style={{ flex: 1 }}></div>
              <Observer stream={inAppController.user}>{(user) => user?.name}</Observer>{' '}
              <span style={{ padding: '0 4px' }}>|</span>
              <a style={{ color: '#fff', fontSize: 'small' }} href="#" onClick={logout}>
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
