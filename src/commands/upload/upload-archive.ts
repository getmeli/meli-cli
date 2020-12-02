import FormData from 'form-data';
import { createReadStream } from 'fs';
import { Logger } from '../../commons/logger/logger';
import { API_TOKEN_HEADER } from '../../global-options';
import { UploadOptions } from './upload-options';
import { getBranch } from './ci/get-branch';
import { axios } from '../../commons/axios/axios';
import { setCommitStatus } from './notify-git/set-commit-status';
import { UploadResponse } from './upload-response';

const logger = new Logger('meli.cli:uploadArchive');

function getBranches(): string[] {
  const branch = getBranch();
  return branch ? [branch] : [];
}

export async function uploadArchive(archivePath: string, options: UploadOptions) {
  const form = new FormData();

  form.append('file', createReadStream(archivePath));

  if (options.release) {
    form.append('release', options.release);
  }

  const branches = options.branch || getBranches();
  if (!branches || branches.length === 0) {
    throw new Error('Could not detect branch, please provide --branch option');
  }
  form.append('branches', branches.join(','));
  logger.debug('adding branch to form', branches);

  const url = `${options.url}/api/v1/sites/${options.site}/releases`;
  logger.debug(`[POST] ${url}`);

  const { data } = await axios.post<UploadResponse>(url, form, {
    headers: {
      [API_TOKEN_HEADER]: options.token,
      ...form.getHeaders(),
    },
  });

  logger.info('Your site has been deployed at:');
  data.urls.forEach(deployUrl => {
    logger.info(`- ${deployUrl}`);
  });

  await setCommitStatus(data, options.release);
}
