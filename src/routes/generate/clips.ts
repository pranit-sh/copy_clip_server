import { FastifyInstance } from 'fastify';
import { generateClipsFromText } from '../../utils/helper';

interface GenerateClipsBody {
  text: string;
}

export default async function clipsRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: GenerateClipsBody }>(
    '/generate/clips',
    {
      schema: {
        body: {
          type: 'object',
          required: ['text'],
          properties: {
            text: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { text } = request.body;
        if (!text) {
          return reply.status(400).send({ error: 'Text is required.' });
        }
        const clips = await generateClipsFromText(text);
        return clips;
      } catch {
        reply.status(500).send({ error: 'Could not generate clips.' });
      }
    },
  );
}
