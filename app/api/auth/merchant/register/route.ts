import { NextResponse } from "next/server";

import { consumePhoneVerification } from "@/lib/otp-store";
import { isValidThaiPhone } from "@/lib/phone";

const isValidBitcoinAddress = (address: string) => {
    const trimmed = address.trim();
    if (/^(bc1|tb1)[a-z0-9]{25,87}$/i.test(trimmed)) return true;
    if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmed)) return true;
    return false;
};

const isValidLightningAddress = (address: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim());

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = String(body.phone ?? "").trim();
        const paymentNetwork = body.paymentNetwork === "lightning"
            ? "lightning"
            : body.paymentNetwork === "onchain"
                ? "onchain"
                : null;
        const bitcoinAddress = String(body.bitcoinAddress ?? "").trim();
        const lightningAddress = String(body.lightningAddress ?? "").trim();

        if (!isValidThaiPhone(phone)) {
            return NextResponse.json(
                { error: "INVALID_PHONE" },
                { status: 400 }
            );
        }

        if (!paymentNetwork) {
            return NextResponse.json(
                { error: "INVALID_PAYMENT_NETWORK" },
                { status: 400 }
            );
        }

        if (paymentNetwork === "onchain") {
            if (!isValidBitcoinAddress(bitcoinAddress)) {
                return NextResponse.json(
                    { error: "INVALID_BITCOIN_ADDRESS" },
                    { status: 400 }
                );
            }
        } else if (!isValidLightningAddress(lightningAddress)) {
            return NextResponse.json(
                { error: "INVALID_LIGHTNING_ADDRESS" },
                { status: 400 }
            );
        }

        consumePhoneVerification(phone);

        const merchant = {
            phone,
            phoneVerified: true,
            paymentNetwork,
            bitcoinAddress: paymentNetwork === "onchain" ? bitcoinAddress : "",
            lightningAddress:
                paymentNetwork === "lightning" ? lightningAddress : "",
        };

        // TODO: Persist merchant account and issue a session.

        return NextResponse.json({
            success: true,
            merchant,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "REGISTER_FAILED";

        if (message === "NOT_VERIFIED") {
            return NextResponse.json(
                { error: "NOT_VERIFIED" },
                { status: 403 }
            );
        }

        console.error("Merchant register failed");

        return NextResponse.json(
            { error: "REGISTER_FAILED" },
            { status: 500 }
        );
    }
}
