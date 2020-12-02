import axios, { AxiosInstance } from 'axios';
import { ensureStackTrace } from '../../../commons/axios/ensure-stack-trace';

// https://github.com/go-gitea/gitea/blob/9ce4d89e9922cc87bdb13d122339ae165a080c3d/templates/repo/commit_status.tmpl
export type GiteaCommitStatus =
// orange filled circle
  | 'pending'
  // green check
  | 'success'
  // red exclamation mark
  | 'error'
  // red cross
  | 'failure'
  // yellow filled triangle with white exclamation mark inside
  | 'warning';

export class Gitea {
  private axios: AxiosInstance;

  constructor(
    readonly token: string,
    private readonly url: string,
  ) {
    this.axios = axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `bearer ${this.token}`,
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
      state: GiteaCommitStatus;
      url?: string;
    },
  ): Promise<void> {
    // https://try.gitea.io/api/v1/swagger#/repository/repoCreateStatus
    await this.axios.post(`/api/v1/repos/${repoId}/statuses/${sha}`, {
      context: options.context,
      description: options.description,
      state: options.state,
      target_url: options.url,
    });
  }
}
