import { NextResponse } from "next/server";

import { findMerchantById, toPublicMerchant } from "@/lib/merchant-store";
import { getBearerToken, verifyMobileToken } from "@/lib/mobile-auth";
import { mobileCorsPreflight, withMobileCors } from "@/lib/mobile-cors";

export function OPTIONS() {
    return mobileCorsPreflight();
}

export async function GET(request: Request) {
    try {
        const token = getBearerToken(request);

        if (!token) {
            return withMobileCors(
                NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
            );
        }

        const payload = verifyMobileToken(token);
        const merchant = await findMerchantById(payload.sub);

        if (!merchant || merchant.phone !== payload.phone) {
            return withMobileCors(
                NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
            );
        }

        return withMobileCors(
            NextResponse.json({
                success: true,
                merchant: toPublicMerchant(merchant),
            })
        );
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "UNAUTHORIZED";

        if (
            message === "INVALID_TOKEN" ||
            message === "TOKEN_EXPIRED" ||
            message === "MOBILE_API_SECRET_MISSING"
        ) {
            return withMobileCors(
                NextResponse.json(
                    { error: message },
                    { status: message === "MOBILE_API_SECRET_MISSING" ? 503 : 401 }
                )
            );
        }

        console.error("Mobile me failed");

        return withMobileCors(
            NextResponse.json({ error: "LOOKUP_FAILED" }, { status: 500 })
        );
    }
}
