# Manuell registrering av papirsykmelding 🧾

Saksbehandlerfrontend for manuell kontroll og utfylling av papirsykmeldinger som ikke lar seg tolke automatisk via OCR-skanning.

Applikasjonen har to hovedoppgaver:

-   NextJS serverer UI, bruker en custom express server med gammel autentisering og proxy (med tokenx-bytte).

`client browser (next-app) --> custom express server kjørt fra next (auth/reverse-proxy) --> downstream API-er`

En demoside er offentlig tilgjengelig på: https://smregistrering.ekstern.dev.nav.no/

## Utvikling

Får å få tilgang til npm pakker som ligger på GitHub, må man autentisere seg

Legge til følgende miljø variabel, med eit personlig GitHub token
Slik:

```
NPM_AUTH_TOKEN='$ditt-token'
```

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

Applikasjonen er tilgjengelig i testmiljø på https://smregistrering.intern.dev.nav.no/?oppgaveid={oppgaveid} lokalt via `naisdevice`. `oppgaveid` referer til oppgaven som opprettes i `smregistrering-backend` og lagres i tilhørende database.
