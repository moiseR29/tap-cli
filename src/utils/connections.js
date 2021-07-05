/* eslint-disable no-case-declarations */
import { Console } from './console';
import {
  db,
  db_em,
  db_core,
  killProcess,
  db_qa,
  db_prod,
  db_qa_all,
  db_prod_all,
} from '../tunnel/scripts';

class ConnectionsConfigClass {
  close(port) {
    return killProcess(port);
  }

  db(privateKey, user) {
    return db(privateKey, user);
  }

  db_qa(privateKey, user) {
    return db_qa(privateKey, user);
  }

  db_prod(privateKey, user) {
    return db_prod(privateKey, user);
  }

  db_em(privateKey, user) {
    return db_em(privateKey, user);
  }

  db_qa_all(privateKey, user) {
    return db_qa_all(privateKey, user);
  }

  db_prod_all(privateKey, user) {
    return db_prod_all(privateKey, user);
  }

  db_core(privateKey, user) {
    return db_core(privateKey, user);
  }

  getConnections() {
    return ['db', 'db-em', 'db-core', 'db-qa', 'db-prod'];
  }

  resolvedConnection(option, userInfo = null, port = null) {
    const { user = null, privateKey = null } = userInfo || {};
    switch (option) {
      case 'db':
        return this.db(privateKey, user);
      case 'db-em':
        return this.db_em(privateKey, user);
      case 'db-core':
        return this.db_core(privateKey, user);
      case 'db-qa':
        return this.db_qa(privateKey, user);
      case 'db-prod':
        return this.db_prod(privateKey, user);
      case 'db-qa-all':
        return this.db_qa_all(privateKey, user);
      case 'db-prod-all':
        return this.db_prod_all(privateKey, user);
      case 'close':
        return this.close(port);
      default:
        // eslint-disable-next-line no-case-declarations
        const errorMessage = Console.formatMessage(
          'red',
          '❌ Please select correct connection (db, db-em, db-core, db-qa, db-prod)',
        );
        Console.log(errorMessage);
        Console.exit(1);
    }
  }
}

export const ConnectionsConfig = new ConnectionsConfigClass();
