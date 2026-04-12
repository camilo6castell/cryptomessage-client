import { ReactElement, useContext } from 'react';
import { Form } from '../ui/components/welcome/Form.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { useLogin } from '../core/hooks/useLogin.ts';
import { FrontPage } from '../ui/components/welcome/pieces/FrontPage.tsx';
import { AppContext } from '../core/state/AppContext.tsx';
import { useRegister } from '../core/hooks/useRegister.ts';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum.ts';

export const StartContainer = (): ReactElement => {
  const { loginForm, handleLoginInput, handleLoginSubmit, loginMessage } =
    useLogin();
  const {
    registerForm,
    handleRegisterInput,
    handleRegisterSubmit,
    registerMessage,
  } = useRegister();
  const { state } = useContext(AppContext);

  const isLogin = state.app.mainState === MainComponentsEnum.Login;

  return (
    <>
      <Form
        handleInput={isLogin ? handleLoginInput : handleRegisterInput}
        handleSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
        messageForm={isLogin ? loginMessage : registerMessage}
        formTitle={isLogin ? 'Sign in' : 'Sign up'}
        formText={isLogin ? 'Welcome back!' : 'Join us!'}
        helpText={isLogin ? "Don't have an account?" : 'Already registered?'}
        helpLink={isLogin ? '/register' : '/login'}
        helpTextLink={isLogin ? 'Register' : 'Login'}
      >
        <FormInput
          value={isLogin ? loginForm.username : registerForm.username}
          nameShown="Your username"
          nameInput="username"
          typeInput="text"
          required={true}
          handleInput={isLogin ? handleLoginInput : handleRegisterInput}
        />
        <FormInput
          value={isLogin ? loginForm.passphrase : registerForm.passphrase}
          nameShown={isLogin ? 'Your passphrase' : 'Your new passphrase'}
          nameInput="passphrase"
          typeInput="password"
          required={true}
          handleInput={isLogin ? handleLoginInput : handleRegisterInput}
        />
        <Button
          textButton={isLogin ? 'Enter' : 'Create account'}
          onClick={() => void 0}
        />
      </Form>

      <FrontPage
        frontPageContent={
          isLogin
            ? state.app.frontPageContent.login
            : state.app.frontPageContent.register
        }
      />
    </>
  );
};
