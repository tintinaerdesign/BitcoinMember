export type PaymentNetwork = "onchain" | "lightning" | "both";

export function isValidBitcoinAddress(address: string) {
    const trimmed = address.trim();
    if (/^(bc1|tb1)[a-z0-9]{25,87}$/i.test(trimmed)) return true;
    if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmed)) return true;
    return false;
}

export function isValidLightningAddress(address: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim());
}

export function resolvePaymentNetwork(
    bitcoinAddress: string,
    lightningAddress: string
): PaymentNetwork | null {
    const bitcoin = bitcoinAddress.trim();
    const lightning = lightningAddress.trim();

    if (bitcoin && lightning) return "both";
    if (lightning) return "lightning";
    if (bitcoin) return "onchain";
    return null;
}
