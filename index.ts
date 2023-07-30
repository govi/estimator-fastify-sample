// Import the framework and instantiate it
import app from './src/app'

const fastify = app({
  logger: true,
})

// Run the server!
try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
