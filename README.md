# Manuell registrering av papirsykmelding 🧾

Saksbehandlerfrontend for manuell kontroll og utfylling av papirsykmeldinger som ikke lar seg tolke automatisk via OCR-skanning.

Applikasjonen har to hovedoppgaver:

-   React (CRA) frontend for UI. Lever under `/client`
-   Express-server som server statisk frontendbygg, brukerautentisering mot Azure AD og reverse proxy for bakomliggende tjenester. Lever under `/server`

`client browser --> smregistrering (auth/reverse-proxy) --> downstream API's`

En demoside er offentlig tilgjengelig på: https://smregistrering.labs.nais.io/

## Utvikling

### Client:

```bash
$ cd /client
$ yarn
$ yarn start
```

Vil laste miljøvariabler fra `/client/.env.development`

### Server:

```bash
$ cd /server
$ yarn
$ yarn dev
```

Vil laste miljøvariabler fra `/server/.env.development`

## Test

Bruker React Testing Library for

```bash
$ yarn test
```

## Testing av tjenesteflyt i testmiljø

Applikasjonen er tilgjengelig i testmiljø på https://smregistrering.dev.adeo.no/?oppgaveid={oppgaveid} lokalt via `naisdevice` eller via utviklerimage. `oppgaveid` referer til oppgaven som opprettes i `smregistrering-backend` og lagres i tilhørende database.
