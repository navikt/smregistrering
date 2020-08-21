import { Config } from '../config';
import tunnel from 'tunnel';
import logger from '../logging';

const httpProxyAgent = (config: Config) => {
  const proxyUri = config.server.proxy;
  if (proxyUri) {
    logger.info(`Proxying requests via ${proxyUri} for openid-client`);
    const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);
    return tunnel.httpsOverHttp({
      proxy: {
        host: hostPort[0],
        port: Number(hostPort[1]),
      },
    });
  } else {
    logger.warn(`Environment variable HTTP_PROXY is not set. Not proxying requests for openid-client`);
    return null;
  }
};

export default httpProxyAgent;
