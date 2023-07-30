import config from 'config'
import fetch from 'node-fetch'
import CintProxyError from './CintProxyError'

const makeCintRequest = async (urlPath: string, payload, timeout: number = 5) => {
  const url = new URL(urlPath,config.get('cintApiEndpoint')).toString()

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout * 1000)

  const resp = await fetch(url.toString(), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': config.get('cintApiKey')
    },
    body: JSON.stringify(payload),
    signal: controller.signal
  })
  clearTimeout(timeoutId)

  // handle response
  if (resp.ok) {
    return resp.json()
  } else {
    // handle error
    if (resp.status === 422) {
      const errorResp = await resp.json()
      if (errorResp?.errors?.length)
        throw new CintProxyError(errorResp, resp.status)
    }
    throw new Error(`Request failed with response code ${resp.status}`)
  }
}

export default makeCintRequest