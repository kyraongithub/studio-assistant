import { commands } from '../commands';

export interface ParsedCommand {
  isCommand: boolean;
  commandName: string | null;
  inputContent: string;
}

export const parseCommand = (input: string): ParsedCommand => {
  const trimmed = input.trim();
  if (trimmed.startsWith('/')) {
    const spaceIndex = trimmed.indexOf(' ');
    const commandName = spaceIndex > -1 ? trimmed.substring(0, spaceIndex) : trimmed;
    const inputContent = spaceIndex > -1 ? trimmed.substring(spaceIndex + 1).trim() : '';
    
    if (commands[commandName]) {
      return {
        isCommand: true,
        commandName,
        inputContent
      };
    }
  }

  return {
    isCommand: false,
    commandName: null,
    inputContent: trimmed
  };
};
