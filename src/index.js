import { Console, Path, Questions, Validate } from './utils';
import { Tunnel } from './tunnel';
import { Migrate } from './migrate';

class TapCliClass {
  init() {
    Console.clearConsole();
    Console.tapMessage();
    Validate.argv(process.argv) ? this.oneLine(process.argv) : this.menu();
  }

  async menu() {
    const response = await Questions.init();
    const { connection, privateKey, username } = response;
    const pathPrivateKey = Path.getPathPrivateKey(privateKey);
    Tunnel.createTunnel(username, pathPrivateKey, connection);
  }

  async oneLine(args) {
    const response = Validate.args(args);
    let {
      connection,
      key: privateKey,
      username,
      migrate,
      close,
      all,
    } = response;
    if (migrate) {
      await Migrate.migrate(response);
    } else if (close) {
      all ? Tunnel.closeAll() : Tunnel.closeTunnel();
    } else {
      if (all) connection = `${connection}-all`;
      Tunnel.createTunnel(username, privateKey, connection);
    }
  }
}

export const TapCli = new TapCliClass();
