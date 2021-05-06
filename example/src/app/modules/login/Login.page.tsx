import { Observer, useProvider } from 'react-modular-js';
import { useHistory } from 'react-router-dom';
import { LoginController } from './Login.controller';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const loginController = useProvider(LoginController);
  const { replace } = useHistory();

  console.log('RENDER LOGIN');

  const onsubmit = async (event: any) => {
    event.preventDefault();
    await loginController.login(event.target.email.value, event.target.password.value);
    if (loginController.user) {
      replace('/in_app');
    }
  };

  return (
    <Observer stream={loginController.loading}>
      {(loading) =>
        loading ? (
          <span>Carregando...</span>
        ) : (
          <>
            {loginController.error ? <span>{loginController.error.message}</span> : null}
            <form onSubmit={onsubmit}>
              <h1>Login</h1>
              <div>
                <label>Email:</label>
                <input type="email" name="email" />
              </div>
              <div>
                <label>Senha:</label>
                <input type="password" name="password" />
              </div>
              <button>Entrar</button>
            </form>
          </>
        )
      }
    </Observer>
  );
};

export default LoginPage;
