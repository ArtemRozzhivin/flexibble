import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export const GET = async (request: NextRequest) => {
  const result = await getToken({ req: request, secret, raw: true });

  return NextResponse.json(result, { status: 200 });
};
