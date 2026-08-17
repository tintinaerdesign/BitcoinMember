import { randomInt } from "crypto";

import {
    OTP_RESEND_SECONDS,
    assertResendAllowed,
    markPhoneVerified,
    saveOtp,
    verifyStoredOtp,
} from "@/lib/otp-store";
import { isValidThaiPhone } from "@/lib/phone";
import { sendPhoneOtp, verifyPhoneOtp } from "@/lib/twilio-verify";

type SmsProvider = "twilio" | "mock";

function getSmsProvider(): SmsProvider {
    const configured = process.env.SMS_PROVIDER?.toLowerCase();

    if (configured === "mock") return "mock";
    if (configured === "twilio") return "twilio";
    if (process.env.TWILIO_VERIFY_SERVICE_SID) return "twilio";

    return "mock";
}

function generateOtp() {
    return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

function assertMerchantPhone(phone: string) {
    if (!isValidThaiPhone(phone)) {
        throw new Error("INVALID_PHONE");
    }
}

/**
 * Provider-agnostic merchant OTP sender.
 * Never returns the OTP to the caller.
 */
export async function sendMerchantOtp(phone: string) {
    assertMerchantPhone(phone);
    assertResendAllowed(phone);

    const provider = getSmsProvider();

    if (provider === "twilio") {
        await sendPhoneOtp(phone);
        saveOtp(phone, "twilio-managed");
        return { cooldownSeconds: OTP_RESEND_SECONDS };
    }

    if (process.env.NODE_ENV === "production") {
        throw new Error("SMS_NOT_CONFIGURED");
    }

    // Mock adapter — isolated from UI. OTP is never returned.
    // In development, SMS_DEV_OTP can be used to verify without an SMS provider.
    const otp = process.env.SMS_DEV_OTP?.match(/^\d{6}$/)
        ? process.env.SMS_DEV_OTP
        : generateOtp();

    saveOtp(phone, otp);

    return { cooldownSeconds: OTP_RESEND_SECONDS };
}

/**
 * Provider-agnostic merchant OTP verification.
 * Never logs or returns the OTP.
 */
export async function verifyMerchantOtp(phone: string, otp: string) {
    assertMerchantPhone(phone);

    if (!/^\d{6}$/.test(otp)) {
        throw new Error("INVALID_OTP");
    }

    const provider = getSmsProvider();

    if (provider === "twilio") {
        await verifyPhoneOtp(phone, otp);
        markPhoneVerified(phone);
        return { verified: true as const };
    }

    verifyStoredOtp(phone, otp);
    return { verified: true as const };
}
