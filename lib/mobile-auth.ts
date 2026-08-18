import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type MobileTokenPayload = {
    sub: string;
    phone: string;
    exp: number;
};

function getTokenSecret() {
    const secret = process.env.MOBILE_API_SECRET;

    if (secret) return secret;
    if (process.env.NODE_ENV !== "production") return "dev-mobile-secret";

    throw new Error("MOBILE_API_SECRET_MISSING");
}

function getApiKey() {
    return process.env.MOBILE_API_KEY ?? "";
}

function safeEqual(left: string, right: string) {
    const a = Buffer.from(left);
    const b = Buffer.from(right);

    if (a.length !== b.length) return false;

    return timingSafeEqual(a, b);
}

export function signMobileToken(input: { sub: string; phone: string }) {
    const payload: MobileTokenPayload = {
        sub: input.sub,
        phone: input.phone,
        exp: Date.now() + TOKEN_TTL_MS,
    };
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = createHmac("sha256", getTokenSecret())
        .update(encoded)
        .digest("base64url");

    return `${encoded}.${signature}`;
}

export function verifyMobileToken(token: string): MobileTokenPayload {
    const [encoded, signature] = token.split(".");

    if (!encoded || !signature) {
        throw new Error("INVALID_TOKEN");
    }

    const expected = createHmac("sha256", getTokenSecret())
        .update(encoded)
        .digest("base64url");

    if (!safeEqual(signature, expected)) {
        throw new Error("INVALID_TOKEN");
    }

    const payload = JSON.parse(
        Buffer.from(encoded, "base64url").toString("utf8")
    ) as MobileTokenPayload;

    if (!payload.sub || !payload.phone || Date.now() > payload.exp) {
        throw new Error("TOKEN_EXPIRED");
    }

    return payload;
}

export function getBearerToken(request: Request) {
    const header = request.headers.get("authorization") ?? "";
    const match = header.match(/^Bearer\s+(.+)$/i);
    return match?.[1]?.trim() ?? "";
}

export function requireMobileApiKey(request: Request) {
    const configured = getApiKey();

    if (!configured) {
        if (process.env.NODE_ENV !== "production") return;
        throw new Error("MOBILE_API_KEY_MISSING");
    }

    const provided = request.headers.get("x-api-key") ?? "";

    if (!safeEqual(provided, configured)) {
        throw new Error("UNAUTHORIZED");
    }
}
