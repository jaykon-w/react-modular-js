import { createElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  icon: React.ReactNode;
  link: string;
  text: string;
}

const SideMenuItem: React.FC<Props> = ({ icon, link, text }) => {
  const [hover, setHover] = useState(false);
  const { push } = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        background: hover ? 'rgba(255, 255, 255, 0.1)' : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => push(link)}
    >
      {createElement(icon as any)}
      <div style={{ width: 16 }}></div>
      <span style={{ color: '#fff' }}>{text}</span>
    </div>
  );
};

export default SideMenuItem;
