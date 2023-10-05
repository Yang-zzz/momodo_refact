import { NextResponse } from 'next/server';
import { postUserLogin } from '../../../service/auth';
import { setCookie } from 'cookies-next';

export async function POST(req: Request) {
  try {
    const data = await postUserLogin(req.body);
    const { refreshToken } = data;
    console.log(refreshToken);
    setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
    return NextResponse.json({ data: refreshToken });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
