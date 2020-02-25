import { Application } from "express";
import morganBody from "morgan-body";
import morgan from "morgan";

const setupLogging = (server: Application) => {
  if (process.env.NODE_ENV === "development") {
    morganBody(server);
  } else {
    morgan("common");
  }
};

export default setupLogging;
