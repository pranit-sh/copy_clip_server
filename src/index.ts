import Fastify from 'fastify';
// import dotenv from 'dotenv';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { clipsRoutes } from './routes/generate/clips';
import { notesRoutes } from './routes/generate/notes';

// Load environment variables
// dotenv.config();

const fastify = Fastify({ logger: process.env.NODE_ENV === 'production' });

fastify.get('/health', async (_, reply) => {
  return reply.send({ status: 'ok' });
});

// Enable CORS
fastify.register(cors, { origin: '*' });

// Enable security headers
fastify.register(helmet);

// Register routes
fastify.register(clipsRoutes);
fastify.register(notesRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
