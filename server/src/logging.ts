import { Application } from "express";
import morganBody from "morgan-body";
import morgan from "morgan";

const setupLogging = (server: Application) => {
  if (process.env.NODE_ENV === "development") {
    morganBody(server);
  } else {
    server.use(
      morgan("common", {
        skip: (req, _res) =>
          req.originalUrl === "/is_alive" || req.originalUrl === "/is_ready"
      })
    );
  }
};

export default setupLogging;
