// Enable NodeJS sourcemap support
import 'source-map-support/register';
import yargs, {
  Arguments, Argv, Options,
} from 'yargs';
import { upload } from './commands/upload/upload';
import { uploadOptions } from './commands/upload/upload-options';
import { handleError } from './handle-error';
import { CLI_PREFIX } from './global-options';
import chalk from 'chalk';
import { BRAND } from './commons/brand';

// force chalk colors
// process.env.FORCE_COLOR = '1';

function configureArgv(argv: Argv, options: { [optionName: string]: Options }): Argv {
  Object.keys(options).forEach((optionName: string) => {
    argv.option(optionName, options[optionName]);
  });
  return argv;
}

// eslint-disable-next-line no-console
console.log(chalk.bold.blue(BRAND));

yargs
  .scriptName('meli')
  .version(BUILD_INFO.version)
  .env(CLI_PREFIX)
  .command({
    command: 'upload <directory>',
    describe: 'Upload a release',
    builder: (args: Argv) => configureArgv(args, uploadOptions),
    handler: (args: Arguments) => {
      upload(args as any).catch(handleError);
    },
  })
  .command({
    command: '*',
    handler: args => {
      // eslint-disable-next-line no-console
      console.error(`Unknown command "${args._ && args._.length > 0 ? args._[0] : ''}", see --help`);
      process.exit(1);
    },
  })
  // .recommendCommands() // not working with '*'
  .help()
  .parse(process.argv.slice(2));
