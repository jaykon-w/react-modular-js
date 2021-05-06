import { Link } from 'react-router-dom';

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <div>
      <h1>HOME</h1>
      <Link to="/about">ir para about</Link>
    </div>
  );
};

export default HomePage;
