import { NextResponse } from "next/server";

import { sendMerchantOtp } from "@/lib/sms";

function errorStatus(code: string) {
    if (code === "INVALID_PHONE") return 400;
    if (code === "COOLDOWN") return 429;
    if (code === "SMS_NOT_CONFIGURED" || code === "TWILIO_NOT_CONFIGURED") {
        return 503;
    }
    return 500;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = String(body.phone ?? "").trim();

        const result = await sendMerchantOtp(phone);

        return NextResponse.json({
            success: true,
            cooldownSeconds: result.cooldownSeconds,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "SEND_FAILED";
        const retryAfter =
            error && typeof error === "object" && "retryAfter" in error
                ? Number(error.retryAfter)
                : undefined;

        if (message !== "COOLDOWN" && message !== "INVALID_PHONE") {
            console.error("Merchant OTP send failed");
        }

        return NextResponse.json(
            {
                error:
                    message === "TWILIO_NOT_CONFIGURED"
                        ? "SMS_NOT_CONFIGURED"
                        : message,
                retryAfter,
            },
            { status: errorStatus(message) }
        );
    }
}
