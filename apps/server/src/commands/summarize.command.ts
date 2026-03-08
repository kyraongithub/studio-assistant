import { CommandHandler, CommandContext } from './index';

export const summarizeCommand: CommandHandler = async ({ input, provider }: CommandContext) => {
  const prompt = `
    You are a producer in a professional game studio.
    
    Please provide a concise summary of the following text, highlighting action items and key decisions:
    "${input}"
  `;
  return await provider.generate(prompt);
};
