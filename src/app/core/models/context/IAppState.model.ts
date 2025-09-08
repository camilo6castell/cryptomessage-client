import { MainComponentsEnum } from '../enums/MainComponents.enum';
import { IFrontPageContent } from '../main/IFrontPageContent.model';
import { InitialUser, IUser } from '../main/IUser.model';

export interface IAppState {
  user: IUser;
  app: {
    mainState: MainComponentsEnum | null;
    mainAuxChat: number | null;
    frontPageContent: IFrontPageContent;
  };
}

export const initialAppState: IAppState = {
  user: InitialUser,
  app: {
    mainState: null,
    mainAuxChat: null,
    frontPageContent: {
      login: {
        pretitle: 'Acerca de',
        title: 'CryptoMessage',
        elements: [
          {
            subtitle: '¿Qué es CryptoMessage?',
            paragraphs: [
              'Es una aplicación web de mensajeria instantanea que responde a una necesidad del mercado en donde la seguridad y confidencialidad de la comunicación es lo más importante. Es decir, con CryptoMessage podrás enviar mensajes de manera segura y confidencial a tus contactos.',
            ],
          },
          {
            subtitle: '¿Cómo funciona?',
            paragraphs: [
              'Bueno, los fundamentos para que todo esto funcione son la encriptación y ustedes, los usuarios. La encriptación se encarga de mantener la seguridad de los mensajes en lo que a dispositivos y tecnología refiere por medio de llaves asimétricas. Los usuarios por otro lado, se encargan de configurar y custodiar estas llaves.',
              'Sin estas llaves es virtualmente imposible leer los mensajes que se encripten. Por lo tanto, es importante que las llaves sean manejadas con responsabilidad.',
            ],
          },
          {
            subtitle: '¿Cómo lo pruebo?',
            paragraphs: [
              'Para poder enviar mensajes, primero debes registrarte en la aplicación para obtener tu usuario. Una vez registrado, podrás buscar a otros usuarios y eviarles mensajes manera segura y confidencial.',
              '¡Ingresa en el link debajo del formulario de iniciar sesión para registrarte!',
            ],
          },
        ],
      },
      register: {
        pretitle: '¡Comencemos!',
        title: 'Crea tu usuario',
        elements: [
          {
            subtitle: 'Tu usuario',
            paragraphs: [
              'Tu usuario debe ser único en nuestro sistema, por lo tanto, de no poderte registrar significará con gran probabilidad que ya existe un usuario con ese nombre.',
            ],
          },
          {
            subtitle: 'Tu passphrase',
            paragraphs: [
              'La passphrase es un complemento a la seguiridad de las llaves asimétricas que anteriormente nombré. Pero a diferencia de otras aplicaciones, en CryptoMessage, la passphrase no tendrá ninguna limitación en cuanto a caracteres, por lo que puedes usar cualquier combinación de caracteres que desees. Es es decir, la seguirdad de la passphrase depende de ti.',
              'Recuerda que la passphrase es tu llave de acceso a la aplicación, por lo tanto, es importante que la recuerdes y no la compartas con nadie.',
            ],
          },
        ],
      },
    },
  },
};
