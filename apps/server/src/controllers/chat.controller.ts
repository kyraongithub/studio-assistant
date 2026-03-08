import { Request, Response, NextFunction } from 'express';
import { aiProvider } from '../services/ai.service';
import { logGeneration } from '../services/log.service';
import { parseCommand } from '../utils/commandParser';
import { commands } from '../commands';

export const handleChat = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const { message, history } = req.body;

  try {
    if (!message || typeof message !== 'string' || message.trim() === '') {
      res.status(400).json({ error: 'Message cannot be empty' });
      return;
    }

    const { isCommand, commandName, inputContent } = parseCommand(message);

    let prompt = '';
    let responseText = '';

    if (isCommand && commandName && commands[commandName]) {
      if (!inputContent) {
        res.status(400).json({ error: `Command ${commandName} requires input text.` });
        return;
      }
      responseText = await commands[commandName]({
        input: inputContent,
        history,
        provider: aiProvider
      });
    } else {
      // General chat
      const historyText = Array.isArray(history) ? history.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n') : '';
      prompt = `
You are a helpful AI assistant for a game studio.
Follow best practices in game development and design.
${historyText ? `\nConversation History:\n${historyText}\n` : ''}
user: ${message}
      `;
      responseText = await aiProvider.generate(prompt);
    }

    const duration = Date.now() - startTime;
    
    logGeneration({
      timestamp: new Date().toISOString(),
      command: commandName,
      input: message,
      duration,
      status: 'success'
    });

    res.json({ reply: responseText });
  } catch (error) {
    const duration = Date.now() - startTime;
    logGeneration({
      timestamp: new Date().toISOString(),
      command: null,
      input: message || '',
      duration,
      status: 'error'
    });
    next(error);
  }
};
