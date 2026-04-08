import { ReactElement } from 'react';

import { Form } from '../ui/components/welcome/Form.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';

import { useRegister } from '../core/hooks/useRegister.ts';

export const RegisterContainer = (): ReactElement => {
  const { form, handleInput, handleSubmit, messageForm } = useRegister();

  return (
    <Form
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      messageForm={messageForm}
      formTitle={'Sign-up'}
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
  );
};
