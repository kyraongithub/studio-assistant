import { CommandHandler, CommandContext } from './index';

export const writeDialogueCommand: CommandHandler = async ({ input, provider }: CommandContext) => {
  const prompt = `
    You are a narrative designer in a professional game studio.

    Write immersive RPG dialogue based on the following context:
    "${input}"

    Keep responses concise and emotionally expressive.
  `;
  return await provider.generate(prompt);
};
