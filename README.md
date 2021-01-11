# Manuell registrering av papirsykmelding 🧾

Frontend-applikasjon for manuell registrering av sykmeldinger som ankommer på papir og blir tolket via skanning.
![software architecture](smregistrering-chart.png)

## Utvikling

Klon repo

```bash
$ git clone https://github.com/navikt/smregistrering.git
```

Installer avhengigheter

```bash
$ cd client
$ npm install
```

### Start local development-server

```bash
$ npm run start-with-mock # Starts development server at http://localhost:4000
```

### Ende-til-ende-tester med [Cypress](https://www.cypress.io)

```bash
$ npm run start & npx wait-on http://localhost:4000 && npx cypress open
# Starts a local development server at http://localhost:4000 as a background task,
# waits for response at the endpoint
# and then starts the test runner in interactive mode
```

Eventuelt kan man kjøre `$ npm start` og `$ npx cypress open` i to separate terminalvinduer.

### Testing in the development environment

The application can be accessed at https://smregistrering.dev.adeo.no/?oppgaveid={oppgaveid} locally through `naisdevice`, or by logging in to utviklerimage.
