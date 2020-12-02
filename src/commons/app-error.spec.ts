import {AppError} from './app-error';

describe('AppError', () => {

  describe('toString', () => {

    it('should print error', async () => {
      const error = {
        toString: jest.fn().mockReturnValue('{}'),
      };
      const appError = new AppError('whoops', error as any);
      const str = appError.toString();
      expect(str).toEqual('whoops (caused by: {})');
      expect(error.toString).toHaveBeenCalled();
    });

  });

});
