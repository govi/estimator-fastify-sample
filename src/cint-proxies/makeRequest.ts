import config from 'config'
import fetch from 'node-fetch'

const makeRequest = async (urlPath: string, payload) => {
  const url = new URL(urlPath,config.get('cintApiEndpoint')).toString()
  const resp = await fetch(url.toString(), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': config.get('cintApiKey')
    },
    body: JSON.stringify(payload)
  })
  return resp.json()
}

export default makeRequest