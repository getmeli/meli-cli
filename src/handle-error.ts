import { AppError } from './commons/app-error';
import { AxiosError } from './commons/axios/axios-error';

/* eslint-disable no-console */
export function handleError(err: Error | AppError | any) {
  console.error(err);
  if (err instanceof AxiosError) {
    console.log(JSON.stringify(err.toJSON(), null, 2));
  }
  process.exit(1);
}
