import { ensureStackTrace } from '../../../commons/axios/ensure-stack-trace';
import axios, { AxiosInstance } from 'axios';

type GithubCommitStatus =
  | 'error'
  | 'failure'
  | 'pending'
  | 'success';

const githubUrl = 'https://github.com';

export class Github {
  private axios: AxiosInstance;

  constructor(
    private readonly token: string,
    private readonly url = githubUrl,
  ) {
    this.axios = axios.create({
      baseURL: this.url === githubUrl ? 'https://api.github.com' : `${url}/api/v3`,
      headers: {
        // https://developer.github.com/v3/#current-version
        Authorization: `token ${this.token}`,
        // Accept: 'application/vnd.github.v3+json',
      },
    });
    ensureStackTrace(this.axios);
  }

  async setCommitStatus(
    repoId: string,
    sha: string,
    options: {
      context: string;
      description: string;
      status: GithubCommitStatus;
      url?: string;
    },
  ): Promise<void> {
    // https://developer.github.com/v3/repos/statuses/#create-a-commit-status
    await this.axios.post(`/repos/${repoId}/statuses/${sha}`, {
      context: options.context,
      description: options.description,
      state: options.status,
      target_url: options.url,
    });
  }
}
