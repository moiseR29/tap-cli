import path from 'path';
import os from 'os';
import fs from 'fs';
import root from 'app-root-path';

class PathClass {
  getPathPrivateKey(privateKey = '') {
    const defaultFilePath = path.join(os.homedir(), '.ssh', privateKey);
    return defaultFilePath;
  }

  getFilesPathSSH() {
    const files = fs.readdirSync(this.getPathPrivateKey());
    const filesFilter = files.filter(
      (file) => !file.includes('.pub') && !file.includes('.old'),
    );
    return filesFilter;
  }

  getCurrentDirectory() {
    return path.resolve(process.cwd());
  }

  getOsType() {
    return os.type();
  }

  getPathCli() {
    return `${root}`;
  }
}

export const Path = new PathClass();
