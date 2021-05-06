import { Link } from 'react-router-dom';

interface Props {}

const AboutPage: React.FC<Props> = () => {
  return (
    <div>
      <h1>ABOUT</h1>
      <Link to="/">ir para Home</Link>
    </div>
  );
};

export default AboutPage;
