import { promises as fs } from 'fs';
import tar from 'tar';
import { Logger } from '../../commons/logger/logger';

const logger = new Logger('meli.cli:upload');

export async function archiveFiles(path: string, archivePath: string): Promise<void> {
  const files = await fs.readdir(path);
  logger.debug(`${files.length} files/directories (from ${path}) will be added to the archive (${archivePath})`);
  const fileList = files.map(file => (file.startsWith('@') ? `./${file}` : file));
  return tar.create(
    {
      gzip: true,
      file: archivePath,
      cwd: path,
    },
    fileList,
  );
}
