import { LLMProvider } from '../providers/llmProvider';
import { env } from '../config/env';
import OpenAI from 'openai';

class OpenAiProvider implements LLMProvider {
  private ai: OpenAI;

  constructor() {
    this.ai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await this.ai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });
      return response.choices[0].message?.content || '';
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('AI service unavailable');
    }
  }
}

export const aiProvider = new OpenAiProvider();
