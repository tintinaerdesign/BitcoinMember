import { randomUUID } from "crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "fs/promises";
import path from "path";

import type { PaymentNetwork } from "@/lib/payment-address";

export type MerchantRecord = {
    id: string;
    phone: string;
    passwordHash: string;
    bitcoinAddress: string;
    lightningAddress: string;
    paymentNetwork: PaymentNetwork;
    createdAt: string;
    updatedAt: string;
};

export type PublicMerchant = Omit<MerchantRecord, "passwordHash">;

export type CreateMerchantInput = {
    phone: string;
    passwordHash: string;
    bitcoinAddress: string;
    lightningAddress: string;
    paymentNetwork: PaymentNetwork;
};

const DATA_FILE =
    process.env.MERCHANT_DATA_PATH ||
    path.join(process.cwd(), "data", "merchants.json");

let writeQueue: Promise<unknown> = Promise.resolve();

function enqueueWrite<T>(task: () => Promise<T>) {
    const next = writeQueue.then(task, task);
    writeQueue = next.then(
        () => undefined,
        () => undefined
    );
    return next;
}

async function readAll(): Promise<MerchantRecord[]> {
    try {
        const raw = await readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(raw) as unknown;
        return Array.isArray(parsed) ? (parsed as MerchantRecord[]) : [];
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

async function writeAll(merchants: MerchantRecord[]) {
    await mkdir(path.dirname(DATA_FILE), { recursive: true });
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(merchants, null, 2), "utf8");

    try {
        await rename(tmp, DATA_FILE);
    } catch {
        await unlink(DATA_FILE).catch(() => undefined);
        await rename(tmp, DATA_FILE);
    }
}

export function toPublicMerchant(merchant: MerchantRecord): PublicMerchant {
    const { passwordHash: _passwordHash, ...publicMerchant } = merchant;
    return publicMerchant;
}

export async function listMerchants() {
    return readAll();
}

export async function findMerchantByPhone(phone: string) {
    const merchants = await readAll();
    return merchants.find((merchant) => merchant.phone === phone) ?? null;
}

export async function findMerchantById(id: string) {
    const merchants = await readAll();
    return merchants.find((merchant) => merchant.id === id) ?? null;
}

export async function createMerchant(input: CreateMerchantInput) {
    return enqueueWrite(async () => {
        const merchants = await readAll();

        if (merchants.some((merchant) => merchant.phone === input.phone)) {
            throw new Error("PHONE_EXISTS");
        }

        const now = new Date().toISOString();
        const merchant: MerchantRecord = {
            id: randomUUID(),
            phone: input.phone,
            passwordHash: input.passwordHash,
            bitcoinAddress: input.bitcoinAddress,
            lightningAddress: input.lightningAddress,
            paymentNetwork: input.paymentNetwork,
            createdAt: now,
            updatedAt: now,
        };

        merchants.push(merchant);
        await writeAll(merchants);
        return merchant;
    });
}
