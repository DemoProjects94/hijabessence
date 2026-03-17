import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for Currency Conversion Context
export function middleware(request: NextRequest) {
  // Assume a default exchange rate: 1 USD = 1,320 IQD (Official)
  // or ~1,500 IQD (Parallel Market depending on business logic)
  const exchangeRate = "1500";
  
  const response = NextResponse.next();
  
  // Set a header that our UI or API can read for consistent currency mapping
  response.headers.set('x-usd-to-iqd-rate', exchangeRate);

  // Example logic: if user locale is in Iraq, default to IQD
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geo = (request as any).geo?.country || 'IQ';
  if (geo === 'IQ') {
    response.headers.set('x-default-currency', 'IQD');
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/product/:path*'
  ],
};
