import chalk from 'chalk';
import shell from 'shelljs';
import figlet from 'figlet';
import clear from 'clear';
import { exec } from 'child_process';
import kill from 'kill-port';

class ConsoleClass {
  clearConsole() {
    clear();
  }

  tapMessage() {
    console.log(
      chalk.blue(figlet.textSync('CLI', { horizontalLayout: 'full' })),
    );
  }

  log(formatMessage) {
    console.log(formatMessage);
  }

  formatMessage(color, message) {
    return chalk[color](message);
  }

  async closePort(port, message) {
    await kill(port);
    this.log(this.formatMessage('green', message));
  }

  execute(command, message = null, forceExit = false) {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.exit(1);
      }

      if (message) this.log(this.formatMessage('green', message));

      if (forceExit) this.exit(1);
    });
  }

  shellExecute(command, message = null, forceExit = false) {
    const exec = shell.exec(command);
    if (exec.code !== 0) {
      this.exit(1);
    }

    if (message) this.log(this.formatMessage('green', message));

    if (forceExit) this.exit(1);
  }

  exit(code) {
    shell.exit(code);
  }

  mv(dir) {
    shell.cd(dir);
  }

  async sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec));
  }
}

export const Console = new ConsoleClass();
