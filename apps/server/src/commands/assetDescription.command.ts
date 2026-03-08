import { CommandHandler, CommandContext } from './index';

export const assetDescriptionCommand: CommandHandler = async ({ input, provider }: CommandContext) => {
  const prompt = `
    You are a concept artist and 3D modeler in a professional game studio.

    Write a detailed asset description for the following item/character/environment:
    "${input}"

    Include details on visual style, key features, and material types if applicable.
  `;
  return await provider.generate(prompt);
};
