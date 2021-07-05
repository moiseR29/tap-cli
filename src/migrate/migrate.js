import { path as rootPath } from 'app-root-path';
import path from 'path';
import { Path, Console } from '../utils';

class MigrateClass {
  execDBMigrations = (cmd, file = ' ') => {
    let connectionDist = `${rootPath}/src/migrate/migration.connect.js`;
    if (Path.getOsType() === 'Windows_NT') {
      connectionDist = path.join(__dirname, '/migration.connect.js');
    }
    console.log(`db-migrate ${cmd} ${file} ${connectionDist}`);
    const command = `db-migrate ${cmd} ${file} --config ${connectionDist}`;
    Console.shellExecute(command);
  };

  migrate = async (options) => {
    if (options.create && options.migrate) {
      this.execDBMigrations('create', options.create);
    }
    if (options.migrate && options.up)
      this.execDBMigrations('up', options.create);
    if (options.create && options.migrate && options.db)
      this.execDBMigrations('db:create', options.create);
    if (options.migrate && options.down) this.execDBMigrations('down');
    if (options.migrate && options.reset) this.execDBMigrations('reset');

    return options;
  };
}

export const Migrate = new MigrateClass();
