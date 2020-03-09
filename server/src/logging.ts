import { Application } from "express";
import morganBody from "morgan-body";
import morgan from "morgan";

const setupLogging = (server: Application) => {
  if (process.env.NODE_ENV === "development") {
    morganBody(server);
  } else {
    server.use(morgan("common"));
    // TODO: filter requests that are useful to log
  }
};

export default setupLogging;
