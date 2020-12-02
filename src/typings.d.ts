export interface BuildInfo {
  version: string;
  buildDate: string;
  commitHash: string;
}

declare global {
  const BUILD_INFO: BuildInfo;
  // eslint-disable-next-line no-underscore-dangle, camelcase
  const __non_webpack_require__: (id: string) => any;
}
