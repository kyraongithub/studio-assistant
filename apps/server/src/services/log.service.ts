export const logGeneration = (data: {
  timestamp: string;
  command: string | null;
  input: string;
  duration: number;
  status: 'success' | 'error';
}) => {
  console.log('[LOG] AI Generation:', JSON.stringify(data));
};
