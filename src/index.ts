import Fastify from 'fastify';
import clipsRoutes from './routes/generate/clips';
import notesRoutes from './routes/generate/notes';

const fastify = Fastify({ logger: true });

fastify.get('/health', async (_, reply) => {
  return reply.send({ status: 'ok' });
});

// Register routes
fastify.register(clipsRoutes);
fastify.register(notesRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
