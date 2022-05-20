# Manuell registrering av papirsykmelding 🧾

Saksbehandlerfrontend for manuell kontroll og utfylling av papirsykmeldinger som ikke lar seg tolke automatisk via OCR-skanning.

Applikasjonen har to hovedoppgaver:

-   NextJS serverer UI, bruker en custom express server med gammel autentisering og proxy (med tokenx-bytte).

`client browser (next-app) --> custom express server kjørt fra next (auth/reverse-proxy) --> downstream API-er`

En demoside er offentlig tilgjengelig på: https://smregistrering.labs.nais.io/

## Utvikling

```bash
yarn
yarn start
```

Vil laste miljøvariabler fra `/client/.env.development`

## Test

Bruker React Testing Library for

```bash
yarn test
```

## Testing av tjenesteflyt i testmiljø

Applikasjonen er tilgjengelig i testmiljø på https://smregistrering.dev.adeo.no/?oppgaveid={oppgaveid} lokalt via `naisdevice` eller via utviklerimage. `oppgaveid` referer til oppgaven som opprettes i `smregistrering-backend` og lagres i tilhørende database.
