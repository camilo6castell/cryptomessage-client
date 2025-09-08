import { ReactElement } from 'react';

// import { MainBar } from '../ui/components/shared/MainBar.tsx';
import { Form } from '../ui/components/welcome/Form.tsx';
import { FormInput } from '../ui/components/welcome/pieces/FormInput.tsx';
import { Button } from '../ui/elements/Button.tsx';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';

// import { Logo } from '../ui/elements/Logo.tsx';

import { useRegister } from '../core/hooks/useRegister.ts';

export const RegisterContainer = (): ReactElement => {
  const { form, handleInput, handleSubmit, messageForm } = useRegister();

  return (
    <>
      {/* <MainBar>
        <Logo />
      </MainBar> */}
      <Form
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        messageForm={messageForm}
        formTitle={'Crea tu usuario'}
        helpText={'Ya tienes usuario?'}
        helpLink={'/login'}
        helpTextLink={'Ingresa'}
      >
        <FormInput
          value={form.username}
          nameShown="Tu nuevo usuario"
          nameInput={'username'}
          typeInput={'text'}
          required={true}
          handleInput={handleInput}
        />
        <FormInput
          value={form.passphrase}
          nameShown="Tu nueva passphrase"
          nameInput={'passphrase'}
          typeInput={'password'}
          required={true}
          handleInput={handleInput}
        />
        <Button
          textButton="Crear usuario"
          style={ElementStyles.Primary}
          onClick={() => void 0}
        />
      </Form>
    </>
  );
};
