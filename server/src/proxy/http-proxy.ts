import config from "../config";
import tunnel from "tunnel";

const agent = () => {
  const proxyUri = config.server.proxy;
  if (proxyUri) {
    console.log(`Proxying requests via ${proxyUri} for openid-cilent`);
    const hostPort = proxyUri
      .replace("https://", "")
      .replace("http://", "")
      .split(":", 2);
    return tunnel.httpsOverHttp({
      proxy: {
        host: hostPort[0],
        port: Number(hostPort[1])
      }
    });
  } else {
    console.log(
      `Environment variable HTTP_PROXY is not set, not proxying requests for openid-client`
    );
    return null;
  }
};

export default { agent: agent() };
