import { ReactElement } from 'react';

// import { MainBar } from '../ui/components/shared/MainBar.tsx';
import { Form } from '../ui/components/welcome/Form.tsx';
// import { Logo } from '../ui/elements/Logo.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';
import { useLogin } from '../core/hooks/useLogin.ts';

export const LoginContainer = (): ReactElement => {
  const { form, handleInput, submitHandler, messageForm } = useLogin();

  return (
    <>
      {/* <MainBar>
        <Logo />
      </MainBar> */}
      <Form
        handleInput={handleInput}
        handleSubmit={submitHandler}
        messageForm={messageForm}
        formTitle="Iniciar sesión"
        helpText="¿No tienes cuenta?"
        helpLink="/register"
        helpTextLink="Regístrate"
      >
        <FormInput
          value={form.username}
          nameShown="Tu usuario"
          nameInput={'username'}
          typeInput={'text'}
          required={true}
          handleInput={handleInput}
        />

        <FormInput
          value={form.passphrase}
          nameShown="Tu passphrase"
          nameInput={'passphrase'}
          typeInput={'password'}
          required={true}
          handleInput={handleInput}
        />

        <Button
          textButton="Iniciar sesión"
          style={ElementStyles.Primary}
          onClick={() => void 0}
        />
      </Form>
    </>
  );
};
