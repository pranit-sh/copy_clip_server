import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';
import { GROQ_MODEL, TEMPERATURE } from './groq-params';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not defined in the environment variables.');
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatJsonCompletion(
  messages: ChatCompletionMessageParam[],
): Promise<string> {
  const response = await groq.chat.completions.create({
    messages: messages,
    model: GROQ_MODEL,
    temperature: TEMPERATURE,
    response_format: {
      type: 'json_object',
    },
  });

  if (response.choices.length > 0) {
    return response.choices[0].message.content || '';
  } else {
    return '';
  }
}
