import { ReactElement, useContext } from 'react';
import { Form } from '../ui/components/welcome/Form.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';
import { useLogin } from '../core/hooks/useLogin.ts';
import { FrontPage } from '../ui/components/welcome/pieces/FrontPage.tsx';
import { AppContext } from '../core/state/AppContext.tsx';

export const LoginContainer = (): ReactElement => {
  const { form, handleInput, submitHandler, messageForm } = useLogin();
  const { state } = useContext(AppContext);

  return (
    <>
      <Form
        handleInput={handleInput}
        handleSubmit={submitHandler}
        messageForm={messageForm}
        formTitle="Sign in"
        formText="Welcome back! Please enter your credentials to access your account."
        helpText="Don't have an account?"
        helpLink="/register"
        helpTextLink="Register"
      >
        <FormInput
          value={form.username}
          nameShown="Your username"
          nameInput={'username'}
          typeInput={'text'}
          required={true}
          handleInput={handleInput}
        />

        <FormInput
          value={form.passphrase}
          nameShown="Your passphrase"
          nameInput={'passphrase'}
          typeInput={'password'}
          required={true}
          handleInput={handleInput}
        />

        <Button
          textButton="Sign in"
          style={ElementStyles.Primary}
          onClick={() => void 0}
        />
      </Form>
      <FrontPage frontPageContent={state.app.frontPageContent.login} />
    </>
  );
};
