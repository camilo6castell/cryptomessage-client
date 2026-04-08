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
        pretitle: 'About',
        title: 'CryptoMessage',
        elements: [
          {
            subtitle: 'What is CryptoMessage?',
            paragraphs: [
              'It is a web instant messaging application that responds to a market need where security and confidentiality of communication are the most important. That is, with CryptoMessage you can send messages securely and confidentially to your contacts.',
            ],
          },
          {
            subtitle: 'How does it work?',
            paragraphs: [
              'Well, the foundations for all this to work are encryption and you, the users. Encryption takes care of keeping messages secure in terms of devices and technology through asymmetric keys. Users, on the other hand, are responsible for configuring and safeguarding these keys.',
              'Without these keys it is virtually impossible to read encrypted messages. Therefore, it is important that keys are handled responsibly.',
            ],
          },
          {
            subtitle: 'How do I test it?',
            paragraphs: [
              'To send messages, you must first register in the application to get your user. Once registered, you can search for other users and send them messages securely and confidentially.',
              'Click on the link below the login form to register!',
            ],
          },
        ],
      },
      register: {
        pretitle: "Let's get started!",
        title: 'Create your user',
        elements: [
          {
            subtitle: 'Your username',
            paragraphs: [
              'Your username must be unique in our system, so if you cannot register, it will most likely mean that a user with that name already exists.',
            ],
          },
          {
            subtitle: 'Your passphrase',
            paragraphs: [
              'The passphrase is a complement to the security of the asymmetric keys I mentioned earlier. But unlike other applications, in CryptoMessage, the passphrase will have no character limitations, so you can use any combination of characters you want. That is, the security of the passphrase depends on you.',
              'Remember that the passphrase is your key to access the application, so it is important that you remember it and do not share it with anyone.',
            ],
          },
        ],
      },
    },
  },
};
