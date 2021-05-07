import { Observer, useProvider } from 'react-modular-js';
import { useHistory } from 'react-router-dom';
import { LoginController } from './Login.controller';

import './Login.css';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const loginController = useProvider(LoginController);
  const { replace } = useHistory();

  const onsubmit = async (event: any) => {
    event.preventDefault();
    await loginController.login(event.target.email.value, event.target.password.value);
    if (loginController.user) {
      replace('/in_app');
    }
  };

  return (
    <div className="login-page">
      <Observer stream={loginController.loading}>
        {(loading) =>
          loading ? (
            <span>Carregando...</span>
          ) : (
            <>
              {loginController.error ? (
                <span className="error">{loginController.error.message}</span>
              ) : null}
              <div style={{ width: 350 }}>
                <form onSubmit={onsubmit}>
                  <h1>Login</h1>
                  <div className="field">
                    <label>Email:</label>
                    <input type="email" name="email" />
                  </div>
                  <div className="field">
                    <label>Senha:</label>
                    <input type="password" name="password" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="positive">Entrar</button>
                  </div>
                </form>
              </div>
            </>
          )
        }
      </Observer>
    </div>
  );
};

export default LoginPage;
