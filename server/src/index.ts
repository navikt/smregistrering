import loadConfig from './config';
import setupCors from './cors';
import session from './session';
import azure from './auth/azure';
import * as routes from './routes/routes';

export { loadConfig, setupCors, session, azure, routes };
