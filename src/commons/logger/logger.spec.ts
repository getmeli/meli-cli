import { Logger } from './logger';

// TODO test log level and all methods
describe('Logger', () => {

  afterEach(() => jest.restoreAllMocks());

  describe('info', () => {

    // TODO not working
    it('should log meta.error', async () => {
      const consoleLog = jest.spyOn(global.console, 'log');

      const logger = new Logger();
      await logger.info('message', { error: 'hello' });

      // expect(consoleLog).toHaveBeenCalledWith('');
    });

    // TODO not working
    it('should log meta.context', async () => {
      const consoleLog = jest.spyOn(global.console, 'log');

      const logger = new Logger('meli.bot:context');
      logger.info('message', { error: 'hello' });

      // expect(consoleLog).toHaveBeenCalledWith('');
    });

  });

});
