import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const resolvedParams = await params;
  const provider = resolvedParams.provider.toLowerCase();
  
  try {
    const body = await request.json();
    const { amount_iqd, phone_number, callback_url } = body;

    // Simulate Network Latency
    await new Promise((res) => setTimeout(res, 800));

    switch (provider) {
      case "fib":
        // First Iraqi Bank: Return the documented payload structure
        // Documented payload: paymentId, qrCode, readableCode, businessAppLink, corporateAppLink, validUntil
        return NextResponse.json({
          status: "pending", 
          provider: "FIB",
          paymentId: `fib_${Date.now()}`,
          qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // minimal transparent pixel for demo, UI will handle it
          readableCode: "A1B2-C3D4",
          businessAppLink: `fib-business://pay?amount=${amount_iqd}`,
          corporateAppLink: `fib-corporate://pay?amount=${amount_iqd}`,
          validUntil: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 mins
        });

      case "zaincash":
      case "asiacell":
        // ZainCash / AsiaCell: OTP-based Wallet Deduction
        if (!phone_number) {
          return NextResponse.json({ error: "Phone number required for mobile wallets." }, { status: 400 });
        }
        return NextResponse.json({
          status: "otp_required",
          provider: provider === "zaincash" ? "ZainCash" : "AsiaCell",
          transaction_id: `wal_${Date.now()}`,
          message: `An OTP has been sent to ${phone_number}. Please verify to deduct IQD ${amount_iqd}.`
        });

      case "fastpay":
      case "qicard":
        // FastPay / Qi Card: Redirect to secure gateway
        return NextResponse.json({
          status: "redirect",
          provider: provider === "fastpay" ? "FastPay" : "QiCard",
          transaction_id: `gw_${Date.now()}`,
          redirect_url: `https://mock-gateway.${provider}.iq/checkout?t=${Date.now()}`,
          callback_url: callback_url || "https://hijab-essence.local/api/callbacks"
        });

      default:
        return NextResponse.json({ error: "Unsupported payment provider" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
