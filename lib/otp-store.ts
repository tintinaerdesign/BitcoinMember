import { createHash, timingSafeEqual } from "crypto";

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 45 * 1000;
const MAX_ATTEMPTS = 5;
const VERIFIED_TTL_MS = 15 * 60 * 1000;

type OtpRecord = {
    codeHash: string;
    expiresAt: number;
    attempts: number;
    lastSentAt: number;
};

type VerifiedRecord = {
    expiresAt: number;
};

declare global {
    var __merchantOtpStore: Map<string, OtpRecord> | undefined;
    var __merchantVerifiedStore: Map<string, VerifiedRecord> | undefined;
}

const otpStore = globalThis.__merchantOtpStore ?? new Map<string, OtpRecord>();
const verifiedStore =
    globalThis.__merchantVerifiedStore ?? new Map<string, VerifiedRecord>();

globalThis.__merchantOtpStore = otpStore;
globalThis.__merchantVerifiedStore = verifiedStore;

function normalizePhone(phone: string) {
    return phone.replace(/\D/g, "");
}

export function hashOtp(phone: string, otp: string) {
    return createHash("sha256")
        .update(`${normalizePhone(phone)}:${otp}`)
        .digest("hex");
}

function hashesMatch(a: string, b: string) {
    const left = Buffer.from(a);
    const right = Buffer.from(b);

    if (left.length !== right.length) {
        return false;
    }

    return timingSafeEqual(left, right);
}

export function assertResendAllowed(phone: string) {
    const record = otpStore.get(normalizePhone(phone));

    if (!record) {
        return;
    }

    const waitMs = record.lastSentAt + RESEND_COOLDOWN_MS - Date.now();

    if (waitMs > 0) {
        const error = new Error("COOLDOWN");
        (error as Error & { retryAfter: number }).retryAfter = Math.ceil(
            waitMs / 1000
        );
        throw error;
    }
}

export function saveOtp(phone: string, otp: string) {
    const key = normalizePhone(phone);

    otpStore.set(key, {
        codeHash: hashOtp(key, otp),
        expiresAt: Date.now() + OTP_TTL_MS,
        attempts: 0,
        lastSentAt: Date.now(),
    });

    verifiedStore.delete(key);
}

export function verifyStoredOtp(phone: string, otp: string) {
    const key = normalizePhone(phone);
    const record = otpStore.get(key);

    if (!record) {
        throw new Error("INVALID_OTP");
    }

    if (Date.now() > record.expiresAt) {
        otpStore.delete(key);
        throw new Error("EXPIRED_OTP");
    }

    if (record.attempts >= MAX_ATTEMPTS) {
        throw new Error("TOO_MANY_ATTEMPTS");
    }

    record.attempts += 1;

    if (!hashesMatch(record.codeHash, hashOtp(key, otp))) {
        throw new Error("INVALID_OTP");
    }

    otpStore.delete(key);
    verifiedStore.set(key, { expiresAt: Date.now() + VERIFIED_TTL_MS });
}

export function markPhoneVerified(phone: string) {
    verifiedStore.set(normalizePhone(phone), {
        expiresAt: Date.now() + VERIFIED_TTL_MS,
    });
}

export function consumePhoneVerification(phone: string) {
    const key = normalizePhone(phone);
    const record = verifiedStore.get(key);

    if (!record || Date.now() > record.expiresAt) {
        verifiedStore.delete(key);
        throw new Error("NOT_VERIFIED");
    }

    verifiedStore.delete(key);
}

export const OTP_RESEND_SECONDS = RESEND_COOLDOWN_MS / 1000;
