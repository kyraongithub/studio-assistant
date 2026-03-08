import { useState, KeyboardEvent, useMemo, useEffect } from 'react';
import { COMMANDS } from '../constants/commands';

export function useCommandAutocomplete(input: string, setInput: (v: string) => void) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeCommands = useMemo(() => {
    if (!input.startsWith('/')) return [];
    
    const searchTerm = input.toLowerCase();
    
    // If input has space, hide dropdown since command is finished or has arguments
    if (input.includes(' ')) return [];

    return COMMANDS.filter((cmd) => cmd.command.toLowerCase().startsWith(searchTerm));
  }, [input]);

  // Reset selected index when active commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [activeCommands]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (activeCommands.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % activeCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + activeCommands.length) % activeCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = activeCommands[selectedIndex];
      if (selected) {
        setInput(selected.command + ' ');
      }
    }
  };

  const handleSelect = (command: string) => {
    setInput(command + ' ');
  };

  return {
    activeCommands,
    selectedIndex,
    handleKeyDown,
    handleSelect
  };
}
