echo "exporting SESSION_KEY=$(cat /var/run/secrets/nais.io/vault/session_key)"
export SESSION_KEY=$(cat /var/run/secrets/nais.io/vault/session_key)
echo "exporting CLIENT_ID=$(cat /secrets/azuread/smregistrering/client_id)"
export CLIENT_ID=$(cat /secrets/azuread/smregistrering/client_id)
echo "exporting CLIENT_SECRET=$(cat /secrets/azuread/smregistrering/client_secret)"
export CLIENT_SECRET=$(cat /secrets/azuread/smregistrering/client_secret)
#export DOWNSTREAM_API_CLIENT_ID=$(cat /secrets/azuread/smregistrering-backend/client_id)