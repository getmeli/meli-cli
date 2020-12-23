import axiosModule from 'axios';
import { ensureStackTrace } from './ensure-stack-trace';

export const axios = axiosModule.create({
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

ensureStackTrace(axios);
