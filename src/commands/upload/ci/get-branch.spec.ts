import { getBranch } from './get-branch';

describe('getCurrentBranchNameInCiEnvironment', () => {

  const workdir = process.cwd();

  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.CI_COMMIT_REF_NAME;
    delete process.env.CIRCLE_BRANCH;
    delete process.env.DRONE_BRANCH;
    delete process.env.GITHUB_REF;
  });

  it('should use env vars when running in Gitlab CI', async () => {
    process.env['CI_COMMIT_REF_NAME'] = 'master';

    const branch = await getBranch();

    expect(branch).toEqual('master');
  });

  it('should use env vars when running in Circle CI', async () => {
    process.env['CIRCLE_BRANCH'] = 'master';

    const branch = await getBranch();

    expect(branch).toEqual('master');
  });

  it('should use env vars when running in Drone CI', async () => {
    process.env['DRONE_BRANCH'] = 'master';

    const branch = await getBranch();

    expect(branch).toEqual('master');
  });

  it('should use env vars when running in Github Actions', async () => {
    process.env['GITHUB_REF'] = 'refs/heads/master';

    const branch = await getBranch();

    expect(branch).toEqual('master');
  });

});
