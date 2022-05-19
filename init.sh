#!/bin/sh

if [[ -z "${SESSION_KEY}" ]]; then
  export SESSION_KEY=$(cat /var/run/secrets/nais.io/vault/session_key)
fi

exec "$@"
