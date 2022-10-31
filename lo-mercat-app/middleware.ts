import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

const mobileRedirects = new Set<string>(['/', '/joan']);

export function middleware (request: NextRequest) {
  const { device } = userAgent(request);

  // If on beta.example.com, redirect to example.com/beta
  const url = request.nextUrl.clone();

  if(device.type === 'mobile' && mobileRedirects.has(url.pathname)){
    url.pathname = '/mobile' + url.pathname;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
