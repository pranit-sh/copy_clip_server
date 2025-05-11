import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { getGroqChatJsonCompletion } from '../ai-helper/groq';
import { ClipDto, NoteDto } from './types';
import { z } from 'zod';

export const generateClipsFromText = async (text: string): Promise<ClipDto[]> => {
  const ClipsSchema = z.object({
    clips: z.array(
      z.object({
        text: z.string(),
      }),
    ),
  });

  const system_prompt = `You are an intelligent assistant that extracts small but important snippets from long texts. Your task is to identify and return a list of items that users may want to copy and paste quickly.
    These can include (but are not limited to):
    Passwords, Email addresses, API keys or tokens, Terminal or shell commands, URLs, Configuration values, Short and reusable code snippets, File paths or system routes.
    Return the output strictly as a JSON object in the following format:
    {
      "clips": [
        {
          "text": "<the text>"
        }
      ]
    }
    If no such items are found, return an empty array like this:
    {
      "clips": []
    }`;

  const user_prompt = `Extract the important snippets from the following text: 
    ${text}`;

  const messages = [
    {
      role: 'system',
      content: system_prompt,
    },
    {
      role: 'user',
      content: user_prompt,
    },
  ] as ChatCompletionMessageParam[];

  const responseContent = await getGroqChatJsonCompletion(messages);
  const jsonData = JSON.parse(responseContent || '');
  const validatedData = ClipsSchema.parse(jsonData);
  return validatedData.clips;
};

export const generateNotesFromText = async (text: string): Promise<NoteDto> => {
  const NotesSchema = z.object({
    text: z.string(),
    title: z.string(),
  });

  const system_prompt = `You are an intelligent assistant that summarizes long texts. Your task is to generate a concise summary of the important points from the text and provide a short title for the summary.
    Return the output strictly as a JSON object in the following format:
    {
      "text": "<the summarized text>",
      "title": "<a very short title for the summary>"
    }`;

  const user_prompt = `Summarize the following text and provide a title: 
    ${text}`;

  const messages = [
    {
      role: 'system',
      content: system_prompt,
    },
    {
      role: 'user',
      content: user_prompt,
    },
  ] as ChatCompletionMessageParam[];

  const responseContent = await getGroqChatJsonCompletion(messages);
  const jsonData = JSON.parse(responseContent || '');
  const validatedData = NotesSchema.parse(jsonData);
  return {
    text: validatedData.text.trim(),
    title: validatedData.title.trim(),
  };
};
