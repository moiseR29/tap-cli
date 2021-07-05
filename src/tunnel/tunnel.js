import fs from 'fs';
import { ConnectionsConfig, Console, Path } from '../utils';

class TunnelClass {
  helpTextPath = `${Path.getPathCli()}/src/tunnel/help.txt`;

  async createTunnel(username, privateKey, connection) {
    try {
      if (connection === 'db-qa-all' || connection === 'db-prod-all') {
        this.closeGw();
        await Console.sleep(4000);
      }

      console.log(connection);
      const connections = ConnectionsConfig.resolvedConnection(connection, {
        user: username,
        privateKey,
      });

      fs.writeFileSync(
        this.helpTextPath,
        JSON.stringify({
          connection,
          username,
          privateKey,
        }),
        'utf-8',
      );
      Console.execute(connections);

      if (Path.getOsType() === 'Windows_NT') {
        setTimeout(() => {
          Console.log(
            Console.formatMessage('green', `${'success connection ✔️'}`),
          );
          Console.exit(1);
        }, 10000);
      } else {
        Console.log(
          Console.formatMessage('green', `${'success connection ✔️'}`),
        );
        Console.exit(1);
      }
    } catch (error) {
      Console.log(Console.formatMessage('red', `${error} ❌`));
      Console.exit(1);
    }
  }

  closeGw() {
    const gw = [
      15600,
      15601,
      15602,
      15603,
      15604,
      15605,
      15606,
      15607,
      15068,
      15609,
    ];

    const use = gw;

    Promise.all(
      use.map(async (port) => {
        await Console.closePort(port, 'port closed');
      }),
    );
  }

  closeAll() {
    const gw = [
      5432,
      5433,
      5459,
      5450,
      5461,
      5462,
      5463,
      5464,
      5465,
      5466,
      5467,
      15600,
      15601,
      15602,
      15603,
      15604,
      15605,
      15606,
      15607,
      15068,
      15609,
    ];

    const use = gw;

    Promise.all(
      use.map(async (port) => {
        await Console.closePort(port, 'port closed');
      }),
    );
  }

  closeTunnel() {
    const dbPort = [5432];
    const dbEmPort = [...dbPort, 15600];
    const dbCorePort = [
      ...dbEmPort,
      15601,
      15602,
      15603,
      15604,
      15605,
      15606,
      15607,
      15608,
      15609,
    ];

    const gw = [
      15600,
      15601,
      15602,
      15603,
      15604,
      15605,
      15606,
      15607,
      15068,
      15609,
    ];

    const dbQa = [5433];

    const dbQaAll = [...dbQa, ...gw];

    const dbProd = [5459, 5450, 5461, 5462, 5463, 5464, 5465, 5466, 5467];

    const dbProdAll = [...dbProd, ...gw];

    const conn = fs.readFileSync(this.helpTextPath, 'utf-8');
    const { connection } = JSON.parse(conn);

    let use = dbPort;
    switch (connection) {
      case 'db-em':
        use = dbEmPort;
        break;
      case 'db-core':
        use = dbCorePort;
        break;
      case 'db-qa':
        use = dbQa;
        break;
      case 'db-prod':
        use = dbProd;
        break;
      case 'db-qa-all':
        use = dbQaAll;
        break;
      case 'db-prod-all':
        use = dbProdAll;
        break;
    }

    Promise.all(
      use.map(async (port) => {
        await Console.closePort(port, 'port closed');
      }),
    );
  }
}

export const Tunnel = new TunnelClass();
