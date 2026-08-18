import { NextResponse } from "next/server";

import { findMerchantByPhone, toPublicMerchant } from "@/lib/merchant-store";
import { signMobileToken } from "@/lib/mobile-auth";
import { mobileCorsPreflight, withMobileCors } from "@/lib/mobile-cors";
import { verifyPassword } from "@/lib/password";
import { isValidThaiPhone } from "@/lib/phone";

export function OPTIONS() {
    return mobileCorsPreflight();
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = String(body.phone ?? "").trim();
        const password = String(body.password ?? "");

        if (!isValidThaiPhone(phone) || !password) {
            return withMobileCors(
                NextResponse.json(
                    { error: "INVALID_CREDENTIALS" },
                    { status: 400 }
                )
            );
        }

        const merchant = await findMerchantByPhone(phone);

        if (!merchant || !(await verifyPassword(password, merchant.passwordHash))) {
            return withMobileCors(
                NextResponse.json(
                    { error: "INVALID_CREDENTIALS" },
                    { status: 401 }
                )
            );
        }

        const token = signMobileToken({
            sub: merchant.id,
            phone: merchant.phone,
        });

        return withMobileCors(
            NextResponse.json({
                success: true,
                token,
                merchant: toPublicMerchant(merchant),
            })
        );
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "LOGIN_FAILED";

        if (message === "MOBILE_API_SECRET_MISSING") {
            return withMobileCors(
                NextResponse.json(
                    { error: "MOBILE_API_SECRET_MISSING" },
                    { status: 503 }
                )
            );
        }

        console.error("Mobile login failed");

        return withMobileCors(
            NextResponse.json(
                { error: "LOGIN_FAILED" },
                { status: 500 }
            )
        );
    }
}
