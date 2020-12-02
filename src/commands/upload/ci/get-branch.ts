export function getBranch(): string | undefined {
  return (
    // https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#variables-reference
    process.env.CI_COMMIT_REF_NAME as string
    // https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
    || process.env.CIRCLE_BRANCH as string
    // https://docs.drone.io/pipeline/environment/reference
    || process.env.DRONE_BRANCH as string
    // https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
    || (process.env.GITHUB_REF ? process.env.GITHUB_REF!.replace('refs/heads/', '') : undefined)
  );
}
