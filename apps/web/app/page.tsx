'use client';

import { useChat } from '../hooks/useChat';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ChatInput } from '../components/chat/ChatInput';

export default function Home() {
  const { history, sendMessage, isLoading, error } = useChat();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950">
      <div className="w-full max-w-5xl h-[85vh] flex flex-col bg-black rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
        
        {/* Header */}
        <header className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <h1 className="font-semibold text-white">Studio Assistant Node</h1>
          </div>
          <div className="font-mono text-xs text-zinc-500">v1.0.0</div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-900/50 text-red-200 px-4 py-2 text-sm text-center border-b border-red-900/50">
            {error.message || 'An error occurred'}
          </div>
        )}

        {/* Chat Area */}
        <ChatWindow history={history} isLoading={isLoading} />
        
        {/* Input Area */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
        
      </div>
    </main>
  );
}
