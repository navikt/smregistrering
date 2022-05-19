import pino from 'pino';

//TODO kill me!
let logger: pino.Logger = pino();

export const setLogger = (l: pino.Logger) => (logger = l);

export default logger;
