import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Form } from '../ui/components/welcome/Form';
import { FormInput } from '../ui/components/welcome/pieces/FormInput';
import { Button } from '../ui/elements/Button';
import { FrontPage } from '../ui/components/welcome/pieces/FrontPage';

import { useLogin } from '../core/hooks/useLogin';
import { useRegister } from '../core/hooks/useRegister';
import { useToast } from '../core/hooks/useToast';

import { Toast } from '../ui/components/general/Toast';
import { animationConfig } from '../ui/styles/config/Themes';
import { frontPageContent } from '../ui/static/frontPageContent';

export const StartContainer = (): ReactElement => {
  const location = useLocation();

  const { toast, showToast, hideToast } = useToast();

  const { loginForm, handleLoginInput, handleLoginSubmit } =
    useLogin(showToast);

  const { registerForm, handleRegisterInput, handleRegisterSubmit } =
    useRegister(showToast);

  // 🔥 estado REAL (ruta)
  const isLoginRoute = location.pathname === '/login';

  // 🔥 estado VISUAL (controla animación)
  const [activeView, setActiveView] = useState(isLoginRoute);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isLoginRoute === activeView) return;

    // 1️⃣ fade out
    setVisible(false);

    const timer = setTimeout(() => {
      // 2️⃣ cambiar contenido
      setActiveView(isLoginRoute);

      // 3️⃣ fade in
      setVisible(true);
    }, animationConfig.general_fade_duration * 1000);

    return () => clearTimeout(timer);
  }, [isLoginRoute, activeView]);

  const isLogin = activeView;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          isDanger={toast.isDanger}
          onClose={hideToast}
        />
      )}

      <Form
        key={isLogin ? 'login' : 'register'} // 🔥 importante
        $visible={visible}
        handleSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
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
