import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProvider } from 'react-modular-js';
import { ISessionService } from '../../../../shared/auth/store/session/Session.service.interface';

interface Props {}

const HomePage: React.FC<Props> = () => {
  console.log('RENDER HOME');
  const sessionService = useProvider(ISessionService);
  const [value, setValue] = useState<string>(sessionService.user.value!.name);

  useEffect(() => {
    value &&
      sessionService.updateUser({
        name: value,
      });
  }, [value]);

  return (
    <div>
      <h1>HOME</h1>
      <Link to="/in_app/about">ir para About</Link>
      <p>
        Nome: <input onChange={(e) => setValue(e.target.value)} value={value}></input>
      </p>
    </div>
  );
};

export default HomePage;
