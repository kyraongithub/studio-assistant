'use client';
import { ChatMessage } from '@studio/shared';
import { MessageBubble } from './MessageBubble';
import { useEffect, useRef } from 'react';

interface ChatWindowProps {
  history: ChatMessage[];
  isLoading: boolean;
}

export function ChatWindow({ history, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black min-h-0">
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
          <div className="text-4xl">🎮</div>
          <h2 className="text-xl font-medium">Studio Assistant</h2>
          <p className="text-sm">Try /write-dialogue, /asset-description, or /summarize</p>
        </div>
      ) : (
        history.map((msg, i) => <MessageBubble key={i} message={msg} />)
      )}
      
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-zinc-800 text-zinc-400 rounded-2xl rounded-bl-sm px-5 py-3 border border-zinc-700 animate-pulse flex space-x-2 items-center">
            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
