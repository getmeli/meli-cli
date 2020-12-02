import { getRepoId } from '../ci/get-repo-id';
import { Github } from './github';
import { getCommitHash } from '../ci/get-commit-hash';
import { Logger } from '../../../commons/logger/logger';
import { Gitlab } from './gitlab';
import { Gitea } from './gitea';
import { UploadResponse } from '../upload-response';

const logger = new Logger('meli.server:setCommitStatus');

export async function setCommitStatus(data: UploadResponse, release?: string): Promise<void> {
  const commitHash = getCommitHash();
  const repoId = getRepoId();

  if (!repoId) {
    logger.warn('Repo id not detected, cannot set commit status');
    return;
  }

  if (!commitHash) {
    logger.warn('Commit hash not detected, cannot set commit status');
    return;
  }

  const context = 'meli';
  const description = release ? `Release ${release} deployed to Meli` : 'Site deployed to Meli';

  if (process.env.GITHUB_TOKEN) {
    logger.info('Setting Github commit status');

    const github = new Github(process.env.GITHUB_TOKEN, process.env.GITHUB_SERVER_URL);
    await github.setCommitStatus(repoId, commitHash, {
      context,
      description,
      status: data ? 'success' : 'failure',
      url: data?.urls[0],
    });
  } else {
    logger.debug('Github token not found, will not set commit status');
  }

  if (process.env.GITLAB_TOKEN) {
    logger.info('Setting Gitlab commit status');

    const gitlab = new Gitlab(process.env.GITLAB_TOKEN, process.env.GITLAB_URL);
    await gitlab.setCommitStatus(repoId, commitHash, {
      name: context,
      description,
      state: data ? 'success' : 'failed',
      url: data?.urls[0],
    });
  } else {
    logger.debug('Gitlab token not found, will not set commit status');
  }

  if (process.env.GITEA_TOKEN && process.env.GITEA_URL) {
    logger.info('Setting Gitea commit status');

    const gitea = new Gitea(process.env.GITEA_TOKEN, process.env.GITEA_URL);
    await gitea.setCommitStatus(repoId, commitHash, {
      context,
      description,
      state: data ? 'success' : 'failure',
      url: data?.urls[0],
    });
  } else {
    logger.debug('Gitea token/url not found, will not set commit status');
  }
}
