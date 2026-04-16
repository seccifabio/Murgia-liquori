import { createCheckoutSession } from '@/app/actions/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { items, appliedCode, locale } = await req.json();
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const { clientSecret, diagnosis } = await createCheckoutSession(items, appliedCode, locale);

    return NextResponse.json({ clientSecret, receivedCode: appliedCode, diagnosis });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

