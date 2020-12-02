import { ensureStackTrace } from '../../../commons/axios/ensure-stack-trace';
import axios, { AxiosInstance } from 'axios';

// https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit
// TODO how does gitlab display the "warning" state when allow_failure is true ?
export type GitlabCommitStatus =
// orange filled circle with paused sign inside (but "external" bubble displayed as "running")
  | 'pending'
  // circle partially filled with blue
  | 'running'
  // green filled circle with check
  | 'success'
  // red filled circle with red cross
  | 'failed'
  // back circle with backslash
  | 'canceled';

export class Gitlab {
  private axios: AxiosInstance;

  constructor(
    private readonly token: string,
    private readonly url = 'https://gitlab.com',
  ) {
    this.axios = axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    ensureStackTrace(this.axios);
  }

  async setCommitStatus(
    projectId: string,
    sha: string,
    options: {
      name: string;
      description: string;
      state: GitlabCommitStatus,
      url?: string;
    },
  ): Promise<void> {
    // https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit
    await this.axios.post(`/api/v4/projects/${projectId}/statuses/${sha}`, {
      name: options.name,
      description: options.description,
      state: options.state,
      target_url: options.url,
    });
  }
}
