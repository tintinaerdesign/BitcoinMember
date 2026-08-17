export function isValidThaiPhone(phone: string) {
    return /^0\d{9}$/.test(phone.replace(/\D/g, ""));
}

export function toE164ThaiPhone(phone: string) {
    const cleaned = phone.replace(/\D/g, "");

    if (!isValidThaiPhone(cleaned)) {
        throw new Error("INVALID_PHONE");
    }

    return `+66${cleaned.slice(1)}`;
}
