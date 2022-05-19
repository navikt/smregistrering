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

## Slagplan

-   less
    -   (reference)
    -   lessc
    -   rename imports
    -   ikke glem å importe nav-frontend-core/dist/main.css!
-   hoist css imports
-   remove craco
    -   add nav-frontend-\*-style/dist/main.css imports
    -   remove all direct nav-frontend-\*-style imports
-   bump stuffs
-   add next
    -   strip less
    -   move App.tsx to pages/index.tsx
    -   ikke tenk på ruter enda. Bare kjør en next spa med react-router
    -   if you use Modal, replace all `Modal.setAppElement("#root")` with this in `_app.tsx`:
    ```tsx
    useEffect(() => {
        Modal.setAppElement('#__next');
    }, []);
    ```
    -   fiks alle andre feil som måtte dukke opp.
    -   nav.no: SSR the decorator in \_document.tsx

smreg:

-   vi måtte sette opp noe mock-greier i `_app.tsx`
-   erstatte modia-datahenting i custom header
    -   custom next server som tar inn express-ruter

Til onsdag:

-   Gjort request til express fra next
    -   Få next til å hente nødvendig modia og oppgave-data
        -   Respondere med mock data så sent som mulig
    -   Få express til å respondere 403 ved manglende token på proxy
    -   Håndtere 403, og redirecte til (express)/login
    -   Er custom express next server bedre?!?!?!?
        -   ts-node??????
