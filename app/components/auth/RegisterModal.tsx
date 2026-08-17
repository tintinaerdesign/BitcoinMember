"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    Link2,
    Phone,
    ShieldCheck,
    Store,
    User,
    X,
    Zap,
} from "lucide-react";

import type { Language } from "@/app/page";

interface RegisterModalProps {
    isOpenModal: boolean;
    onClose: () => void;
    lang?: Language;
}

type MerchantStep = "phone" | "otp";
type PaymentNetwork = "onchain" | "lightning";

const isValidBitcoinAddress = (address: string) => {
    const trimmed = address.trim();
    if (/^(bc1|tb1)[a-z0-9]{25,87}$/i.test(trimmed)) return true;
    if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmed)) return true;
    return false;
};

const isValidLightningAddress = (address: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim());

const modalContent = {
    th: {
        title: "สมัครสมาชิก",
        subtitle: "สะสมแต้มและรับสิทธิพิเศษจาก Bitcoin Member",
        generalTab: "ผู้ใช้งานทั่วไป",
        storeTab: "ลงทะเบียนร้านค้า",
        phonePlaceholder: "กรอกเบอร์โทรศัพท์ (เช่น 0812345678)",
        onchainTab: "On-chain",
        lightningTab: "Lightning",
        paymentChannel: "ช่องทางการรับเงิน",
        onchainLabel: "Bitcoin Address",
        lightningLabel: "Lightning Address",
        onchainPlaceholder: "bc1q... Bitcoin receiving address",
        lightningPlaceholder: "example@domain.com",
        securityWarning:
            "ห้ามกรอก Private Key เด็ดขาด — ช่องนี้ใช้สำหรับข้อมูลปลายทางรับเงินเท่านั้น เราไม่มีสิทธิ์เข้าถึงเงินของคุณ",
        bitcoinAddressError: "กรุณากรอก Bitcoin Address ที่ถูกต้อง",
        lightningAddressError: "กรุณากรอก Lightning Address ที่ถูกต้อง",
        continueBtn: "ดำเนินการต่อ",
        userRegistered: "สมัครสมาชิกสำเร็จ",
        terms: "การสมัครสมาชิกแสดงว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว",
        closeBtn: "ปิดหน้าต่าง",
        phoneError: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
        phoneFormatError: "กรุณากรอกเบอร์โทรศัพท์ไทยให้ถูกต้อง",
        sendOtpBtn: "ส่งรหัส OTP",
        otpPhoneTitle: "ยืนยันเบอร์โทรศัพท์",
        otpSubtitle: "เราได้ส่งรหัส OTP ไปยัง",
        otpButton: "ยืนยัน OTP",
        resend: "ส่งรหัสอีกครั้ง",
        resendIn: "ส่งรหัสอีกครั้งใน",
        seconds: "วินาที",
        editPhone: "แก้ไขเบอร์โทรศัพท์",
        otpError: "กรุณากรอกรหัส OTP ให้ครบ 6 หลัก",
        sendOtpError: "ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่อีกครั้ง",
        verifyOtpError: "รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่",
        otpExpiredError: "รหัส OTP หมดอายุ กรุณาขอรหัสใหม่",
        tooManyAttempts: "ยืนยันเกินจำนวนครั้งที่กำหนด กรุณาขอรหัสใหม่",
        otpServiceError: "ระบบส่ง OTP ยังไม่พร้อมใช้งาน กรุณาติดต่อผู้ดูแลระบบ",
        sendingOtp: "กำลังส่ง OTP...",
        verifyingOtp: "กำลังยืนยัน...",
        paymentTitle: "ปลายทางรับเงิน",
        paymentSubtitle: "เลือกเครือข่ายและกรอกที่อยู่สำหรับรับชำระเงิน",
        storeContinueBtn: "ลงทะเบียนร้านค้า",
        registeringMerchant: "กำลังลงทะเบียน...",
        merchantRegistered: "ลงทะเบียนร้านค้าสำเร็จ",
        registerError: "ไม่สามารถลงทะเบียนร้านค้าได้ กรุณาลองใหม่",
        notVerifiedError: "กรุณายืนยันเบอร์โทรศัพท์ก่อน",
    },
    en: {
        title: "Join Membership",
        subtitle: "Collect points and unlock benefits with Bitcoin Member",
        generalTab: "General User",
        storeTab: "Merchant Registration",
        phonePlaceholder: "Enter mobile number",
        onchainTab: "On-chain",
        lightningTab: "Lightning",
        paymentChannel: "Payment receiving channel",
        onchainLabel: "Bitcoin Address",
        lightningLabel: "Lightning Address",
        onchainPlaceholder: "bc1q... Bitcoin receiving address",
        lightningPlaceholder: "example@domain.com",
        securityWarning:
            "Never enter your Private Key — this field is only for your receiving address. We cannot access your funds.",
        bitcoinAddressError: "Please enter a valid Bitcoin address",
        lightningAddressError: "Please enter a valid Lightning address",
        continueBtn: "Continue",
        userRegistered: "Registration successful",
        terms: "By joining, you agree to our Terms and Privacy Policy.",
        closeBtn: "Close modal",
        phoneError: "Please enter a complete 10-digit phone number.",
        phoneFormatError: "Please enter a valid Thai phone number.",
        sendOtpBtn: "Send OTP",
        otpPhoneTitle: "Verify Your Phone",
        otpSubtitle: "We sent a verification code to",
        otpButton: "Verify OTP",
        resend: "Resend code",
        resendIn: "Resend code in",
        seconds: "seconds",
        editPhone: "Change phone number",
        otpError: "Please enter the 6-digit OTP code.",
        sendOtpError: "Unable to send OTP. Please try again.",
        verifyOtpError: "Invalid OTP code. Please try again.",
        otpExpiredError: "This OTP has expired. Please request a new code.",
        tooManyAttempts: "Too many attempts. Please request a new code.",
        otpServiceError: "OTP service is not configured. Please contact support.",
        sendingOtp: "Sending OTP...",
        verifyingOtp: "Verifying...",
        paymentTitle: "Payment Destination",
        paymentSubtitle: "Choose a network and enter your receiving address",
        storeContinueBtn: "Register Merchant",
        registeringMerchant: "Registering...",
        merchantRegistered: "Merchant registered successfully",
        registerError: "Unable to register merchant. Please try again.",
        notVerifiedError: "Please verify your phone number first",
    },
    zh: {
        title: "注册会员",
        subtitle: "加入 Bitcoin Member，获取专属权益",
        generalTab: "普通用户",
        storeTab: "商家注册",
        phonePlaceholder: "请输入手机号码",
        onchainTab: "On-chain",
        lightningTab: "Lightning",
        paymentChannel: "收款方式",
        onchainLabel: "Bitcoin Address",
        lightningLabel: "Lightning Address",
        onchainPlaceholder: "bc1q... Bitcoin receiving address",
        lightningPlaceholder: "example@domain.com",
        securityWarning:
            "请勿输入私钥 — 此栏仅用于填写您的收款地址，我们无法访问您的资金。",
        bitcoinAddressError: "请输入有效的比特币收款地址",
        lightningAddressError: "请输入有效的闪电地址",
        continueBtn: "继续",
        userRegistered: "注册成功",
        terms: "注册即表示您同意我们的条款和隐私政策。",
        closeBtn: "关闭窗口",
        phoneError: "请输入完整的 10 位手机号码。",
        phoneFormatError: "请输入正确的泰国手机号码。",
        sendOtpBtn: "发送验证码",
        otpPhoneTitle: "验证手机号码",
        otpSubtitle: "验证码已发送至",
        otpButton: "验证 OTP",
        resend: "重新发送验证码",
        resendIn: "请在",
        seconds: "秒后重新发送",
        editPhone: "修改手机号码",
        otpError: "请输入完整的 6 位验证码。",
        sendOtpError: "无法发送验证码，请重试。",
        verifyOtpError: "验证码不正确，请重试。",
        otpExpiredError: "验证码已过期，请重新获取。",
        tooManyAttempts: "尝试次数过多，请重新获取验证码。",
        otpServiceError: "验证码服务尚未配置，请联系管理员。",
        sendingOtp: "正在发送验证码...",
        verifyingOtp: "正在验证...",
        paymentTitle: "收款地址",
        paymentSubtitle: "选择网络并填写收款地址",
        storeContinueBtn: "注册商家",
        registeringMerchant: "正在注册...",
        merchantRegistered: "商家注册成功",
        registerError: "无法注册商家，请重试。",
        notVerifiedError: "请先验证手机号码",
    },
};

export default function RegisterModal({
    isOpenModal,
    onClose,
    lang = "th",
}: RegisterModalProps) {
    const t = modalContent[lang];

    const [userType, setUserType] = useState<"general" | "store">("general");
    const [merchantStep, setMerchantStep] = useState<MerchantStep>("phone");
    const [phone, setPhone] = useState("");
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [bitcoinAddress, setBitcoinAddress] = useState("");
    const [lightningAddress, setLightningAddress] = useState("");
    const [paymentNetwork, setPaymentNetwork] = useState<PaymentNetwork>("onchain");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [countdown, setCountdown] = useState(45);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

    const resetModal = () => {
        setUserType("general");
        setMerchantStep("phone");
        setPhone("");
        setPhoneVerified(false);
        setBitcoinAddress("");
        setLightningAddress("");
        setPaymentNetwork("onchain");
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setStatusMessage("");
        setCountdown(45);
        setIsSendingOtp(false);
        setIsVerifyingOtp(false);
        setIsRegistering(false);
    };

    const handleClose = () => {
        resetModal();
        onClose();
    };

    useEffect(() => {
        if (merchantStep !== "otp" || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [merchantStep, countdown]);

    const switchUserType = (nextType: "general" | "store") => {
        setUserType(nextType);
        setMerchantStep("phone");
        setPhone("");
        setPhoneVerified(false);
        setBitcoinAddress("");
        setLightningAddress("");
        setPaymentNetwork("onchain");
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setStatusMessage("");
        setCountdown(45);
    };

    const mapOtpApiError = (code?: string, context: "send" | "verify" = "send") => {
        if (code === "SMS_NOT_CONFIGURED" || code === "TWILIO_NOT_CONFIGURED") {
            return t.otpServiceError;
        }
        if (code === "EXPIRED_OTP") return t.otpExpiredError;
        if (code === "TOO_MANY_ATTEMPTS") return t.tooManyAttempts;
        if (code === "INVALID_OTP") return t.verifyOtpError;
        if (code === "COOLDOWN") return t.sendOtpError;
        return context === "verify" ? t.verifyOtpError : t.sendOtpError;
    };

    const requestSendOtp = async () => {
        setIsSendingOtp(true);
        setError("");

        try {
            const response = await fetch("/api/auth/merchant/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(mapOtpApiError(data.error, "send"));
                return false;
            }

            setOtp(["", "", "", "", "", ""]);
            setCountdown(Number(data.cooldownSeconds) || 45);
            setMerchantStep("otp");
            return true;
        } catch {
            setError(t.sendOtpError);
            return false;
        } finally {
            setIsSendingOtp(false);
        }
    };

    const validateMerchantPayment = () => {
        if (paymentNetwork === "onchain") {
            if (!isValidBitcoinAddress(bitcoinAddress)) {
                setError(t.bitcoinAddressError);
                return false;
            }
        } else if (!isValidLightningAddress(lightningAddress)) {
            setError(t.lightningAddressError);
            return false;
        }

        return true;
    };

    const handleMerchantPhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (phone.length !== 10) {
            setError(t.phoneError);
            return;
        }

        if (!/^0\d{9}$/.test(phone)) {
            setError(t.phoneFormatError);
            return;
        }

        if (!validateMerchantPayment()) {
            return;
        }

        await requestSendOtp();
    };

    const handleMerchantPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
        if (error) setError("");
    };

    const resetMerchantPaymentFields = (network: PaymentNetwork) => {
        setPaymentNetwork(network);
        setBitcoinAddress("");
        setLightningAddress("");
        setError("");
    };

    const handleOtpChange = (index: number, value: string) => {
        const number = value.replace(/\D/g, "");

        if (!number) {
            const next = [...otp];
            next[index] = "";
            setOtp(next);
            return;
        }

        const next = [...otp];
        next[index] = number.slice(-1);
        setOtp(next);
        if (index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            setError(t.otpError);
            return;
        }

        setIsVerifyingOtp(true);
        setError("");

        try {
            const response = await fetch("/api/auth/merchant/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp: otpCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(mapOtpApiError(data.error, "verify"));
                return;
            }

            setPhoneVerified(true);
            setOtp(["", "", "", "", "", ""]);

            if (userType === "store") {
                await registerMerchant();
                return;
            }

            setStatusMessage(t.userRegistered);
            window.setTimeout(() => handleClose(), 1200);
        } catch {
            setError(t.verifyOtpError);
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0 || isSendingOtp) return;
        await requestSendOtp();
    };

    const handleBackToPhone = () => {
        setMerchantStep("phone");
        setPhoneVerified(false);
        setOtp(["", "", "", "", "", ""]);
        setError("");
    };

    const registerMerchant = async () => {
        if (!validateMerchantPayment()) {
            setMerchantStep("phone");
            return;
        }

        setIsRegistering(true);

        try {
            const response = await fetch("/api/auth/merchant/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone,
                    paymentNetwork,
                    bitcoinAddress: paymentNetwork === "onchain" ? bitcoinAddress.trim() : "",
                    lightningAddress:
                        paymentNetwork === "lightning" ? lightningAddress.trim() : "",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error === "NOT_VERIFIED" ? t.notVerifiedError : t.registerError
                );
                if (data.error === "NOT_VERIFIED") {
                    setPhoneVerified(false);
                }
                setMerchantStep("phone");
                return;
            }

            setStatusMessage(t.merchantRegistered);
            window.setTimeout(() => handleClose(), 1200);
        } catch {
            setError(t.registerError);
            setMerchantStep("phone");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleGeneralPhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (phone.length !== 10) {
            setError(t.phoneError);
            return;
        }

        if (!/^0\d{9}$/.test(phone)) {
            setError(t.phoneFormatError);
            return;
        }

        await requestSendOtp();
    };

    if (!isOpenModal) return null;

    const viewKey = `${userType}-${merchantStep}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md font-line"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 bg-[#171717] p-6 text-white shadow-2xl md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-44 w-44 rounded-full bg-amber-500/15 blur-[80px]" />

                <button
                    type="button"
                    onClick={handleClose}
                    aria-label={t.closeBtn}
                    className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-all hover:bg-white/20 hover:text-white"
                >
                    <X size={22} />
                </button>

                <div className="relative z-10">
                    {merchantStep !== "otp" && (
                        <>
                            <div className="mb-6 text-center">
                                <h3 className="text-3xl font-bold text-amber-500">{t.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">
                                    {t.subtitle}
                                </p>
                            </div>

                            <div className="mb-5 flex rounded-xl border border-white/10 bg-black/40 p-1">
                                <button
                                    type="button"
                                    onClick={() => switchUserType("general")}
                                    className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-all ${userType === "general" ? "bg-amber-500 text-black shadow-md" : "text-zinc-400 hover:text-white"}`}
                                >
                                    <User size={16} />
                                    {t.generalTab}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => switchUserType("store")}
                                    className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-all ${userType === "store" ? "bg-amber-500 text-black shadow-md" : "text-zinc-400 hover:text-white"}`}
                                >
                                    <Store size={16} />
                                    {t.storeTab}
                                </button>
                            </div>
                        </>
                    )}

                    <AnimatePresence mode="wait">
                        {userType === "general" && merchantStep === "phone" && (
                            <motion.div
                                key={viewKey}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <form onSubmit={handleGeneralPhoneSubmit}>
                                    <div className="relative">
                                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                                        <input
                                            type="tel"
                                            required
                                            inputMode="numeric"
                                            maxLength={10}
                                            value={phone}
                                            onChange={handleMerchantPhoneChange}
                                            placeholder={t.phonePlaceholder}
                                            className="w-full rounded-xl border border-white/20 bg-black/50 py-4 pl-12 pr-4 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                        />
                                    </div>

                                    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                                    {statusMessage && (
                                        <p className="mt-2 text-sm text-emerald-400">{statusMessage}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSendingOtp}
                                        className="mt-6 mb-4 w-full cursor-pointer rounded-xl bg-amber-500 py-4 text-lg font-bold text-black shadow-lg shadow-amber-500/10 transition-all hover:bg-amber-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSendingOtp ? t.sendingOtp : t.continueBtn}
                                    </button>
                                </form>

                                <p className="mt-6 px-2 text-center text-xs leading-relaxed text-zinc-300">
                                    {t.terms}
                                </p>
                            </motion.div>
                        )}

                        {userType === "store" && merchantStep === "phone" && (
                            <motion.div
                                key={viewKey}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <form onSubmit={handleMerchantPhoneSubmit}>
                                    <div className="relative mb-5">
                                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                                        <input
                                            type="tel"
                                            required
                                            inputMode="numeric"
                                            maxLength={10}
                                            value={phone}
                                            onChange={handleMerchantPhoneChange}
                                            placeholder={t.phonePlaceholder}
                                            className="w-full rounded-xl border border-white/20 bg-black/50 py-4 pl-12 pr-4 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                        />
                                    </div>

                                    <p className="mb-2 text-sm font-semibold text-zinc-200">{t.paymentChannel}</p>

                                    <div className="mb-5 flex rounded-lg border border-white/10 bg-black/30 p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => resetMerchantPaymentFields("onchain")}
                                            className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-all ${paymentNetwork === "onchain" ? "bg-white/15 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                                        >
                                            <Link2 size={14} />
                                            {t.onchainTab}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => resetMerchantPaymentFields("lightning")}
                                            className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-all ${paymentNetwork === "lightning" ? "bg-white/15 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                                        >
                                            <Zap size={14} />
                                            {t.lightningTab}
                                        </button>
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="merchant-payment-address" className="mb-1.5 block text-sm font-medium text-zinc-300">
                                            {paymentNetwork === "onchain" ? t.onchainLabel : t.lightningLabel}
                                        </label>
                                        <div className="relative">
                                            {paymentNetwork === "onchain" ? (
                                                <Link2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                                            ) : (
                                                <Zap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                                            )}
                                            <input
                                                id="merchant-payment-address"
                                                type="text"
                                                required
                                                value={paymentNetwork === "onchain" ? bitcoinAddress : lightningAddress}
                                                onChange={(e) => {
                                                    if (paymentNetwork === "onchain") {
                                                        setBitcoinAddress(e.target.value);
                                                    } else {
                                                        setLightningAddress(e.target.value);
                                                    }
                                                    if (error) setError("");
                                                }}
                                                placeholder={paymentNetwork === "onchain" ? t.onchainPlaceholder : t.lightningPlaceholder}
                                                className="w-full rounded-xl border border-white/20 bg-black/50 py-3.5 pl-11 pr-4 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
                                        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-400" />
                                        <p className="text-sm leading-relaxed text-amber-200">
                                            {t.securityWarning}
                                        </p>
                                    </div>

                                    {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
                                    {statusMessage && (
                                        <p className="mb-3 text-sm text-emerald-400">{statusMessage}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSendingOtp || isRegistering}
                                        className="mb-4 w-full cursor-pointer rounded-xl bg-amber-500 py-4 text-lg font-bold text-black shadow-lg shadow-amber-500/10 transition-all hover:bg-amber-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSendingOtp ? t.sendingOtp : t.storeContinueBtn}
                                    </button>
                                </form>

                                <p className="mt-6 px-2 text-center text-xs leading-relaxed text-zinc-300">
                                    {t.terms}
                                </p>
                            </motion.div>
                        )}

                        {merchantStep === "otp" && (
                            <motion.div
                                key={viewKey}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.1 }}
                            >
                                <button
                                    type="button"
                                    onClick={handleBackToPhone}
                                    className="mb-6 flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                                >
                                    <ArrowLeft size={17} />
                                    {t.editPhone}
                                </button>

                                <div className="text-center">
                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                                        <Phone size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-amber-500">{t.otpPhoneTitle}</h3>
                                    <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                                        {t.otpSubtitle}
                                    </p>
                                    <p className="mt-1 font-semibold text-white">{phone}</p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="mt-8">
                                    <div className="flex justify-center gap-2 sm:gap-3">
                                        {otp.map((value, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    otpRefs.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={value}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                className="h-12 w-10 rounded-xl border border-white/20 bg-black/50 text-center text-xl font-bold text-white outline-none transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 sm:h-14 sm:w-12"
                                            />
                                        ))}
                                    </div>

                                    {error && (
                                        <p className="mt-4 text-center text-sm text-red-400">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isVerifyingOtp}
                                        className="mt-6 w-full cursor-pointer rounded-xl bg-amber-500 py-4 text-lg font-bold text-black shadow-lg shadow-amber-500/10 transition-all hover:bg-amber-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isVerifyingOtp ? t.verifyingOtp : t.otpButton}
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    {countdown > 0 ? (
                                        <p className="text-sm text-zinc-500">
                                            {t.resendIn}{" "}
                                            <span className="font-semibold text-zinc-300">{countdown}</span>{" "}
                                            {t.seconds}
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            disabled={isSendingOtp}
                                            className="cursor-pointer text-sm font-medium text-amber-500 transition-colors hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isSendingOtp ? t.sendingOtp : t.resend}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
