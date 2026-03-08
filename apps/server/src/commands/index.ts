import { LLMProvider } from '../providers/llmProvider';

export interface CommandContext {
  input: string;
  history?: any[];
  provider: LLMProvider;
}

export type CommandHandler = (context: CommandContext) => Promise<string>;

import { writeDialogueCommand } from './writeDialogue.command';
import { assetDescriptionCommand } from './assetDescription.command';
import { summarizeCommand } from './summarize.command';

export const commands: Record<string, CommandHandler> = {
  '/write-dialogue': writeDialogueCommand,
  '/asset-description': assetDescriptionCommand,
  '/summarize': summarizeCommand,
};
