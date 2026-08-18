import { NextResponse } from "next/server";

import { listMerchants, toPublicMerchant } from "@/lib/merchant-store";
import { requireMobileApiKey } from "@/lib/mobile-auth";
import { mobileCorsPreflight, withMobileCors } from "@/lib/mobile-cors";

export function OPTIONS() {
    return mobileCorsPreflight();
}

export async function GET(request: Request) {
    try {
        requireMobileApiKey(request);

        const merchants = await listMerchants();

        return withMobileCors(
            NextResponse.json({
                success: true,
                merchants: merchants.map(toPublicMerchant),
            })
        );
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "LOOKUP_FAILED";

        if (message === "UNAUTHORIZED") {
            return withMobileCors(
                NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 })
            );
        }

        if (message === "MOBILE_API_KEY_MISSING") {
            return withMobileCors(
                NextResponse.json(
                    { error: "MOBILE_API_KEY_MISSING" },
                    { status: 503 }
                )
            );
        }

        console.error("Mobile merchants list failed");

        return withMobileCors(
            NextResponse.json({ error: "LOOKUP_FAILED" }, { status: 500 })
        );
    }
}
