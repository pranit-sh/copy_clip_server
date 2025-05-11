import { FastifyInstance } from 'fastify';
import { generateNotesFromText } from '../../utils/helper';

interface GenerateNotesBody {
  text: string;
}

export async function notesRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: GenerateNotesBody }>(
    '/generate/notes',
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
        const note = await generateNotesFromText(text);
        return note;
      } catch {
        reply.status(500).send({ error: 'Could not generate notes.' });
      }
    },
  );
}
