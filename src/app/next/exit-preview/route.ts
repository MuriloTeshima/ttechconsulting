import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') ?? '/';
  (await draftMode()).disable();
  redirect(path.startsWith('/') && !path.startsWith('//') ? path : '/');
}
