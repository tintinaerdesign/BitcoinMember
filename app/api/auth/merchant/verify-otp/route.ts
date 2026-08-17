import { NextResponse } from "next/server";

import { verifyMerchantOtp } from "@/lib/sms";

function errorStatus(code: string) {
    if (
        code === "INVALID_PHONE" ||
        code === "INVALID_OTP" ||
        code === "EXPIRED_OTP" ||
        code === "TOO_MANY_ATTEMPTS"
    ) {
        return 400;
    }
    if (code === "SMS_NOT_CONFIGURED" || code === "TWILIO_NOT_CONFIGURED") {
        return 503;
    }
    return 500;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = String(body.phone ?? "").trim();
        const otp = String(body.otp ?? "").trim();

        await verifyMerchantOtp(phone, otp);

        return NextResponse.json({
            success: true,
            phoneVerified: true,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "VERIFY_FAILED";

        if (
            message !== "INVALID_OTP" &&
            message !== "EXPIRED_OTP" &&
            message !== "TOO_MANY_ATTEMPTS" &&
            message !== "INVALID_PHONE"
        ) {
            console.error("Merchant OTP verify failed");
        }

        return NextResponse.json(
            {
                error:
                    message === "TWILIO_NOT_CONFIGURED"
                        ? "SMS_NOT_CONFIGURED"
                        : message,
            },
            { status: errorStatus(message) }
        );
    }
}
