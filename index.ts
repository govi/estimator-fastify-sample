// Import the framework and instantiate it
import Fastify from 'fastify'
import CintProxyError from './src/cint-proxies/CintProxyError'
import estimateDeliveryTime from './src/estimateDeliveryTime'
import { EstimateDeliveryQueryString } from './src/types'

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get<{
    Querystring: EstimateDeliveryQueryString,
    Reply: string
}>(
  '/planning/estimateDeliveryTime', async (request, reply) => {
    const { limit, lengthOfInterview } = request.query
    if (!limit || limit <= 0) reply.code(400).send('limit has to be more than zero')
    if (!lengthOfInterview || lengthOfInterview <= 0) reply.code(400).send('lengthOfInterview has to be more than zero')
    try {
      return await estimateDeliveryTime(limit, lengthOfInterview)
    } catch (e) {
      const upstreamStatus = (e as CintProxyError).status
      if (upstreamStatus) reply.code(upstreamStatus).send((e as Error).message)
      reply.code(500).send((e as Error).message)
    }
  }
)

// Run the server!
try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
