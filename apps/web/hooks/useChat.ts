import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosClient } from '../services/axiosClient';
import { ChatMessage, ChatRequest, ChatResponse } from '@studio/shared';

export const useChat = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const req: ChatRequest = { message, history };
      const { data } = await axiosClient.post<ChatResponse>('/chat', req);
      return data;
    },
    onMutate: (newMessage) => {
      // Optimistically add user message
      setHistory((prev) => [...prev, { role: 'user', content: newMessage }]);
    },
    onSuccess: (data) => {
      // Add assistant response
      setHistory((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    },
  });

  return {
    history,
    sendMessage: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
