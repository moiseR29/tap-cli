/* eslint-disable no-case-declarations */
import fs from 'fs';
import { Console } from './console';
import { Path } from './paths';

class ValidateClass {
  helpTextPath = `${Path.getPathCli()}/src/tunnel/help.txt`;

  length(username) {
    return username.length > 5;
  }

  argv(argv) {
    return argv.length > 2;
  }

  selectDirectly() {
    const conn = fs.readFileSync(this.helpTextPath, 'utf-8');
    if (!conn) {
      const errorMessage = Console.formatMessage(
        'red',
        `❌ Please config your user, access for menu`,
      );
      Console.log(errorMessage);
      Console.exit(1);
    }
    return JSON.parse(conn);
  }

  args(args) {
    const userInput = {
      username: '',
      password: '',
      key: '',
      connection: 'db-em',
      migrate: false,
      create: false,
      up: false,
      down: false,
      close: false,
      all: false,
    };
    args.forEach((arg, index) => {
      switch (arg) {
        case '--username':
        case '-u':
          userInput.username = args[index + 1];
          break;
        case '--password':
        case '-p':
          userInput.password = args[index + 1];
          break;
        case '--key':
        case '-k':
          userInput.key = args[index + 1];
          break;
        case '--connection':
        case '-c':
          userInput.connection = args[index + 1];
          break;
        case '--migrate':
        case '-m':
          userInput.migrate = true;
          break;
        case '--create':
          userInput.create = args[index + 1];
          break;
        case '--up':
          userInput.up = true;
          break;
        case '--down':
          userInput.down = true;
          break;
        case '--close':
          userInput.close = true;
          break;
        case '--dev':
          const { username, privateKey } = this.selectDirectly();
          userInput.username = username;
          userInput.connection = 'db-core';
          userInput.key = privateKey;
          break;
        case '--qa':
          const {
            username: usernameQa,
            privateKey: privateKeyQa,
          } = this.selectDirectly();
          userInput.username = usernameQa;
          userInput.connection = 'db-qa';
          userInput.key = privateKeyQa;
          break;
        case '--prod':
          const {
            username: usernameProd,
            privateKey: privateKeyProd,
          } = this.selectDirectly();
          userInput.username = usernameProd;
          userInput.connection = 'db-prod';
          userInput.key = privateKeyProd;
          break;
        case '--all':
          userInput.all = true;
          break;
        default:
          if (
            (index !== 0 || index !== 1) &&
            (arg.startsWith('--') || arg.startsWith('-'))
          ) {
            const errorMessage = Console.formatMessage(
              'red',
              `❌ Command incorrect, ${Console.formatMessage(
                'green',
                'cli supported commands => --username|-u --password|-p --key|-k --connection|-c --migrate|-m --dev --qa --prod --close',
              )}`,
            );
            Console.log(errorMessage);
            Console.exit(1);
          }
          break;
      }
    });

    if ((!userInput.key || !userInput.username) && !userInput.migrate) {
      if (userInput.close) return userInput;
      Console.log(
        `❌ ${Console.formatMessage(
          'red',
          '--key and --username or --migrate is required',
        )}, ${Console.formatMessage(
          'yellow',
          '--connection and --password is optional',
        )}`,
      );
      Console.exit(1);
    }

    return userInput;
  }
}

export const Validate = new ValidateClass();
