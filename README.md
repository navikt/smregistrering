# Manuell registrering av papirsykmelding 🧾

Frontend-applikasjon for manuell registrering av sykmeldinger som ankommer på papir og blir tolket via skanning.

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
$ cd client
$ npm run start-with-mock # Starts development server at http://localhost:4000
```

### Ende-til-ende-tester med [Cypress](https://www.cypress.io)
```bash
$ cd client
$ npm run start & npx wait-on http://localhost:4000 && npx cypress open 
# Starts a local development server at http://localhost:4000 as a background task, 
# waits for response at the endpoint 
# and then starts the test runner in interactive mode
```
