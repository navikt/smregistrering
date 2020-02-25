import express from "express";
import config from "./config";
import setupLogging from "./logging";
import cors from "./cors";
import helmet from "helmet";
import passport from "passport";
import azure from "./auth/azure";
import routes from "./routes/routes";

const server = express();
const PORT = config.server.port;

async function startApp() {
  try {
    setupLogging(server);

    // setup session

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use(helmet());
    server.use(cors);

    server.use(passport.initialize());
    server.use(passport.session());

    const azureAuthClient = await azure.client();
    const azureOidcStrategy = azure.strategy(azureAuthClient);

    passport.use("azureOidc", azureOidcStrategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // setup routes
    server.use("/", routes.setup(azureAuthClient));

    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error("Error during startup", error);
  }
}

startApp().catch(error => console.error(error));
