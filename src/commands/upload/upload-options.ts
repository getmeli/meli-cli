import { Options } from 'yargs';

export interface UploadOptions {
  // API call config
  token: string;
  site: string;
  url: string;
  // release config
  directory: string;
  release: string;
  branch: string[];
}

export const uploadOptions: { [key: string]: Options } = {
  // API call config
  token: {
    alias: 't',
    type: 'string',
    describe: 'API token, available in site settings in Meli UI',
    demandOption: true,
  },
  site: {
    alias: 's',
    type: 'string',
    describe: 'Site ID, available in Meli UI',
    demandOption: true,
  },
  url: {
    alias: 'u',
    type: 'string',
    describe: 'URL of the Meli API (e.g. https://meli.sh or https://meli.company.com)',
    demandOption: true,
  },
  // release config
  directory: {
    alias: 'd',
    type: 'string',
    describe: 'Path of the directory containing the assets to upload',
    default: './build',
  },
  release: {
    alias: 'r',
    type: 'string',
    describe: 'The version of your site (if none is given, a random one will be generated)',
  },
  branch: {
    alias: 'b',
    type: 'string',
    array: true,
    describe: 'A branch on which this release will be published (multiple branches: --branch branch1 --branch branch2)',
  },
};
