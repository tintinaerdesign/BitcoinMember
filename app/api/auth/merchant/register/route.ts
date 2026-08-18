import { NextResponse } from "next/server";

import { consumePhoneVerification } from "@/lib/otp-store";
import {
    isValidBitcoinAddress,
    isValidLightningAddress,
    resolvePaymentNetwork,
} from "@/lib/payment-address";
import { isStrongPassword } from "@/lib/password";
import { isValidThaiPhone, toE164ThaiPhone } from "@/lib/phone";
import { createAdminClient } from "@/lib/supabase/admin";

type MerchantRow = {
    id?: string;
    auth_user_id?: string;
    phone: string;
    bitcoin_address: string | null;
    lightning_address: string | null;
    payment_network: string;
    created_at?: string;
    updated_at?: string;
};

function isPhoneExistsError(error: { message?: string; code?: string } | null) {
    if (!error) return false;

    const code = (error.code ?? "").toLowerCase();
    const message = (error.message ?? "").toLowerCase();

    return (
        code === "23505" ||
        code === "phone_exists" ||
        code === "user_already_exists" ||
        message.includes("already been registered") ||
        message.includes("already registered") ||
        message.includes("phone_exists") ||
        message.includes("duplicate key")
    );
}

function toPublicMerchant(row: MerchantRow, authUserId: string) {
    return {
        id: row.id ?? row.auth_user_id ?? authUserId,
        phone: row.phone,
        bitcoinAddress: row.bitcoin_address ?? "",
        lightningAddress: row.lightning_address ?? "",
        paymentNetwork: row.payment_network,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = String(body.phone ?? "").trim();
        const password = String(body.password ?? "");
        const bitcoinAddress = String(body.bitcoinAddress ?? "").trim();
        const lightningAddress = String(body.lightningAddress ?? "").trim();

        if (!isValidThaiPhone(phone)) {
            return NextResponse.json(
                { error: "INVALID_PHONE" },
                { status: 400 }
            );
        }

        if (!isStrongPassword(password)) {
            return NextResponse.json(
                { error: "WEAK_PASSWORD" },
                { status: 400 }
            );
        }

        if (bitcoinAddress && !isValidBitcoinAddress(bitcoinAddress)) {
            return NextResponse.json(
                { error: "INVALID_BITCOIN_ADDRESS" },
                { status: 400 }
            );
        }

        if (lightningAddress && !isValidLightningAddress(lightningAddress)) {
            return NextResponse.json(
                { error: "INVALID_LIGHTNING_ADDRESS" },
                { status: 400 }
            );
        }

        const paymentNetwork = resolvePaymentNetwork(
            bitcoinAddress,
            lightningAddress
        );

        if (!paymentNetwork) {
            return NextResponse.json(
                { error: "PAYMENT_ADDRESS_REQUIRED" },
                { status: 400 }
            );
        }

        try {
            consumePhoneVerification(phone);
        } catch (error) {
            if (error instanceof Error && error.message === "NOT_VERIFIED") {
                return NextResponse.json(
                    { error: "NOT_VERIFIED" },
                    { status: 403 }
                );
            }
            throw error;
        }

        const admin = createAdminClient();
        const e164Phone = toE164ThaiPhone(phone);
        const { data: created, error: authError } =
            await admin.auth.admin.createUser({
                phone: e164Phone,
                password,
                phone_confirm: true,
            });

        if (authError || !created.user) {
            if (isPhoneExistsError(authError)) {
                return NextResponse.json(
                    { error: "PHONE_EXISTS" },
                    { status: 409 }
                );
            }

            console.error("Merchant Auth user creation failed", {
                message: authError?.message,
                code: authError?.code,
                status: authError?.status,
                phoneIsE164: /^\+[1-9]\d{1,14}$/.test(e164Phone),
            });

            return NextResponse.json(
                { error: "REGISTER_FAILED" },
                { status: 500 }
            );
        }

        const authUserId = created.user.id;

        const { data: merchant, error: insertError } = await admin
            .from("merchants")
            .insert({
                auth_user_id: authUserId,
                phone,
                bitcoin_address: bitcoinAddress,
                lightning_address: lightningAddress,
                payment_network: paymentNetwork,
            })
            .select()
            .single();

        if (insertError || !merchant) {
            await admin.auth.admin.deleteUser(authUserId);

            if (isPhoneExistsError(insertError)) {
                return NextResponse.json(
                    { error: "PHONE_EXISTS" },
                    { status: 409 }
                );
            }

            console.error("Merchant row insert failed");

            return NextResponse.json(
                { error: "REGISTER_FAILED" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            merchant: toPublicMerchant(merchant as MerchantRow, authUserId),
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

        if (message === "PHONE_EXISTS") {
            return NextResponse.json(
                { error: "PHONE_EXISTS" },
                { status: 409 }
            );
        }

        console.error("Merchant register failed");

        return NextResponse.json(
            { error: "REGISTER_FAILED" },
            { status: 500 }
        );
    }
}
