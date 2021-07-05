import inquirer from 'inquirer';
import { Path } from './paths';
import { Validate } from './validate';
import { ConnectionsConfig } from './connections';

class QuestionClass {
  questions = [
    {
      name: 'privateKey',
      type: 'list',
      message: 'please select your private key',
      choices: Path.getFilesPathSSH(),
    },
    {
      name: 'username',
      type: 'input',
      message: 'please write your username',
      validate: Validate.length,
    },
    {
      name: 'connection',
      type: 'list',
      message: 'Select connect ',
      choices: ConnectionsConfig.getConnections(),
    },
    /*     {
      name: 'password',
      type: 'input',
      message: 'please enter your password',
    }, */
  ];

  init() {
    return inquirer.prompt(this.questions);
  }
}

export const Questions = new QuestionClass();
