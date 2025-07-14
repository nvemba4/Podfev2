import { NextResponse } from 'next/server';
import { mockEpisodes } from '../../../mock/episodiosRecentesData';
 
export async function GET() {
  return NextResponse.json(mockEpisodes);
} 