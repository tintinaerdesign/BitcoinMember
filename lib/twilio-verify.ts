import { toE164ThaiPhone } from "@/lib/phone";

type TwilioConfig = {
    accountSid: string;
    authToken: string;
    serviceSid: string;
};

function getTwilioConfig(): TwilioConfig {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!accountSid || !authToken || !serviceSid) {
        throw new Error("TWILIO_NOT_CONFIGURED");
    }

    return { accountSid, authToken, serviceSid };
}

async function twilioVerifyRequest(
    path: string,
    body: Record<string, string>
) {
    const { accountSid, authToken } = getTwilioConfig();

    const response = await fetch(`https://verify.twilio.com/v2${path}`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "TWILIO_REQUEST_FAILED");
    }

    return data;
}

export async function sendPhoneOtp(phone: string) {
    const { serviceSid } = getTwilioConfig();
    const to = toE164ThaiPhone(phone);

    return twilioVerifyRequest(
        `/Services/${serviceSid}/Verifications`,
        { To: to, Channel: "sms" }
    );
}

export async function verifyPhoneOtp(phone: string, code: string) {
    const { serviceSid } = getTwilioConfig();
    const to = toE164ThaiPhone(phone);

    const data = await twilioVerifyRequest(
        `/Services/${serviceSid}/VerificationCheck`,
        { To: to, Code: code }
    );

    if (data.status !== "approved") {
        throw new Error("INVALID_OTP");
    }

    return data;
}
