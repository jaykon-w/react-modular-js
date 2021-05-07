import { Observer, useProvider } from 'react-modular-js';
import { SideMenuController } from './SideMenu.controller';

interface Props {
  width?: number;
}

const SideMenu: React.FC<Props> = ({ children, width = 250 }) => {
  const sideMenuController = useProvider(SideMenuController);

  return (
    <Observer stream={sideMenuController.menuStateOpen}>
      {(open) => (
        <div
          style={{
            width: open ? width : 0,
            position: 'relative',
            transform: `translateX(${open ? '0' : '-' + width + 'px'})`,
            height: '100%',
            transition: 'ease-out .2s',
            boxSizing: 'border-box',
            display: 'flex',
            background: '#272a3c',
            color: '#fff',
            padding: '16px 0',
            boxShadow: 'rgb(0 0 0 / 50%) 1px 0px 5px',
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
        </div>
      )}
    </Observer>
  );
};

export default SideMenu;
