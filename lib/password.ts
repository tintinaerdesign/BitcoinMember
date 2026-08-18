import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
export const MIN_PASSWORD_LENGTH = 8;

export function isStrongPassword(password: string) {
    return password.length >= MIN_PASSWORD_LENGTH;
}

export async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
    return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
    const [salt, hash] = storedHash.split(":");

    if (!salt || !hash) return false;

    const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
    const stored = Buffer.from(hash, "hex");

    if (derived.length !== stored.length) return false;

    return timingSafeEqual(derived, stored);
}
