# For exporting injected vault secrets as environment variables

export SESSION_KEY=$(cat /var/run/secrets/nais.io/vault/session_key)
export CLIENT_ID=$(cat /secrets/azuread/smregistrering/client_id)
export CLIENT_SECRET=$(cat /secrets/azuread/smregistrering/client_secret)
export DOWNSTREAM_API_CLIENT_ID=$(cat /secrets/azuread/smregistrering-backend/client_id)