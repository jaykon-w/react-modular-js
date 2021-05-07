import { BsInfoSquareFill } from 'react-icons/bs';
import { GoThreeBars } from 'react-icons/go';
import { ImHome3 } from 'react-icons/im';
import { Observer, useProvider } from 'react-modular-js';
import { useHistory } from 'react-router-dom';
import SideMenu from '../../shared/side_menu/SideMenu.component';
import { SideMenuController } from '../../shared/side_menu/SideMenu.controller';
import SideMenuItem from '../../shared/side_menu/SideMenuItem.component';
import { InAppController } from './InApp.controller';

import './InApp.css';

interface Props {}

const InAppPage: React.FC<Props> = ({ children }) => {
  const inAppController = useProvider(InAppController);
  const sideMenuController = useProvider(SideMenuController);
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
          <div className="in-app-full">
            <header>
              <GoThreeBars
                style={{ cursor: 'pointer' }}
                onClick={() => sideMenuController.toogle()}
              />
              <div style={{ width: 16 }}></div>
              <strong>REACT-MODULAR-JS</strong>
              <div style={{ flex: 1 }}></div>
              <Observer stream={inAppController.user}>{(user) => user?.name}</Observer>
              <span style={{ padding: '0 4px' }}>|</span>
              <a style={{ color: '#fff', fontSize: 'small' }} href="#" onClick={logout}>
                Logout
              </a>
            </header>
            <main style={{ flex: 1, display: 'flex' }}>
              <nav>
                <SideMenu>
                  <SideMenuItem icon={ImHome3} link="home" text="Home" />
                  <SideMenuItem icon={BsInfoSquareFill} link="about" text="Sobre" />
                </SideMenu>
              </nav>
              <aside style={{ flex: 1, display: 'flex' }}>
                <div style={{ padding: 16, flex: 1 }}>{children}</div>
              </aside>
            </main>
          </div>
        )
      }
    </Observer>
  );
};

export default InAppPage;
