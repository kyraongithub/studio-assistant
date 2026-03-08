'use client';
import { FormEvent, useState, KeyboardEvent } from 'react';
import { useCommandAutocomplete } from '../../hooks/useCommandAutocomplete';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const {
    activeCommands,
    selectedIndex,
    handleKeyDown,
    handleSelect
  } = useCommandAutocomplete(input, setInput);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e);
  };

  return (
    <div className="relative border-t border-zinc-800 bg-zinc-950 p-4">
      {/* Autocomplete Dropdown */}
      {activeCommands.length > 0 && (
        <div className="absolute bottom-full left-4 mb-2 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col z-10">
          {activeCommands.map((cmd, index) => (
            <button
              key={cmd.command}
              type="button"
              onClick={() => handleSelect(cmd.command)}
              className={`flex justify-between items-center px-4 py-3 text-left transition-colors ${
                index === selectedIndex ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
              }`}
            >
              <span className="text-blue-400 font-medium">{cmd.command}</span>
              <span className="text-zinc-400 text-sm ml-4 truncate">{cmd.description}</span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="Type a message or /command..."
          className="flex-1 bg-zinc-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
