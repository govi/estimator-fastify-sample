import fastify from 'fastify'
import CintProxyError from './cint-proxies/CintProxyError'
import estimateDeliveryTime from './estimateDeliveryTime'
import { EstimateDeliveryQueryString } from './types'

const build = (opts = {}) => {
  const app = fastify(opts)

  // Declare a route
  app.get<{
    Querystring: EstimateDeliveryQueryString
    Reply: string
  }>('/planning/estimateDeliveryTime', async (request, reply) => {
    const { limit, lengthOfInterview } = request.query
    try {
      return await estimateDeliveryTime(limit, lengthOfInterview)
    } catch (e) {
      const upstreamStatus = (e as CintProxyError).status
      if (upstreamStatus) reply.code(upstreamStatus).send((e as Error).message)
      reply.code(500).send((e as Error).message)
    }
  })

  return app
}

export default build
