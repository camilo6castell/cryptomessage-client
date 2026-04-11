import { ReactElement, useContext } from 'react';

import { Form } from '../ui/components/welcome/Form.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';

import { useRegister } from '../core/hooks/useRegister.ts';
import { AppContext } from '../core/state/AppContext.tsx';
import { FrontPage } from '../ui/components/welcome/pieces/FrontPage.tsx';

export const RegisterContainer = (): ReactElement => {
  const { form, handleInput, handleSubmit, messageForm } = useRegister();
  const { state } = useContext(AppContext);
  return (
    <>
      <Form
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        messageForm={messageForm}
        formTitle={'Sign-up'}
        formText="Join us! Create your account to start sending encrypted messages."
        helpText={'Already registered?'}
        helpLink={'/login'}
        helpTextLink={'Login'}
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
          nameShown="Your new passphrase"
          nameInput={'passphrase'}
          typeInput={'password'}
          required={true}
          handleInput={handleInput}
        />
        <Button
          textButton="Create account"
          style={ElementStyles.Primary}
          onClick={() => void 0}
        />
      </Form>
      <FrontPage frontPageContent={state.app.frontPageContent.register} />
    </>
  );
};
