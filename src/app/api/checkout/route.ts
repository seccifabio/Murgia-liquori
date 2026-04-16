import { createCheckoutSession } from '@/app/actions/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { items, appliedCode } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const { clientSecret } = await createCheckoutSession(items, appliedCode);

    return NextResponse.json({ clientSecret });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

