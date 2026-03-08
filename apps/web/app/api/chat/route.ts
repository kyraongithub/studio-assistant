import { NextRequest, NextResponse } from 'next/server';
import { axiosServer } from '../../../services/axiosServer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axiosServer.post('/api/chat', body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('API Route Error:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: error?.response?.data?.error || 'Backend service error' },
      { status: error?.response?.status || 500 }
    );
  }
}
