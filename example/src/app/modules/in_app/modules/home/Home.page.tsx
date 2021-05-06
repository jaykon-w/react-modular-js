import { Link } from 'react-router-dom';

interface Props {}

const HomePage: React.FC<Props> = () => {
  console.log('RENDER HOME');

  return (
    <div>
      <h1>HOME</h1>
      <Link to="/in_app/about">ir para About</Link>
    </div>
  );
};

export default HomePage;
