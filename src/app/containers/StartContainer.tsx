import { ReactElement, useContext, useEffect, useState } from 'react';
import { Form } from '../ui/components/welcome/Form.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { useLogin } from '../core/hooks/useLogin.ts';
import { FrontPage } from '../ui/components/welcome/pieces/FrontPage.tsx';
import { AppContext } from '../core/state/AppContext.tsx';
import { useRegister } from '../core/hooks/useRegister.ts';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum.ts';
import { animationConfig } from '../ui/styles/config/Themes.tsx';
import { frontPageContent } from '../ui//static/frontPageContent.ts';
import { Actions } from '../core/models/enums/Actions.enum.ts';

export const StartContainer = (): ReactElement => {
  const { loginForm, handleLoginInput, handleLoginSubmit, loginMessage } =
    useLogin();
  const {
    registerForm,
    handleRegisterInput,
    handleRegisterSubmit,
    registerMessage,
  } = useRegister();

  const { state, dispatch } = useContext(AppContext);

  const [visible, setVisible] = useState(true);
  const [activeState, setActiveState] = useState(state.app.mainState);

  useEffect(() => {
    if (state.app.mainState === activeState) return;
    // 1. Disparar fadeOut
    setVisible(false);
    // 2. Después de la animación, cambiar contenido y hacer fadeIn
    const timer = setTimeout(() => {
      setActiveState(state.app.mainState);
      setVisible(true);
    }, animationConfig.general_fade_duration * 1000); // debe coincidir con la duración del fadeOut
    return () => clearTimeout(timer);
  }, [state.app.mainState]);

  useEffect(() => {
    dispatch({
      type: Actions.SetError,
      payload: loginMessage.message
        ? loginMessage.message
        : registerMessage.message,
    });
    const timer = setTimeout(() => {
      dispatch({ type: Actions.SetError, payload: null });
    }, 5000); // 5 segundos
    return () => clearTimeout(timer);
  }, [loginMessage, registerMessage]);

  const isLogin = activeState === MainComponentsEnum.Login;

  return (
    <>
      <Form
        key={activeState} // fuerza re-mount para resetear animación
        $visible={visible}
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
          isLogin ? frontPageContent.login : frontPageContent.register
        }
        $visible={visible}
      />
    </>
  );
};
