import { tmpdir } from 'os';
import { join } from 'path';
import { Logger } from '../../commons/logger/logger';
import { UploadOptions } from './upload-options';
import { uploadArchive } from './upload-archive';
import { archiveFiles } from './archive-files';

const logger = new Logger('meli.cli:upload');

export async function upload(options: UploadOptions): Promise<void> {
  const archivePath = join(tmpdir(), `${options.site}-${options.release ?? 'latest'}-${options.branch}.tar.gz`);

  logger.info(`Compressing files from ${options.directory}....`);
  await archiveFiles(options.directory, archivePath);

  logger.info(`Uploading release to ${options.url}...`);
  await uploadArchive(archivePath, options);

  logger.info('Done');
}
