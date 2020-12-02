export function getCommitHash(): string | undefined {
  return (
    // https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#variables-reference
    process.env.CI_COMMIT_SHA
    // https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
    || process.env.CIRCLE_SHA1
    // https://docs.drone.io/pipeline/environment/reference
    || process.env.DRONE_COMMIT
    // https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
    || process.env.GITHUB_SHA
  );
}
