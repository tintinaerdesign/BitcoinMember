"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, ArrowLeft } from "lucide-react";

import { FaLine } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import type { Language } from "@/app/page";

interface RegisterModalProps {
    isOpenModal: boolean;
    onClose: () => void;
    lang?: Language;
}

const modalContent = {
    th: {
        title: "สมัครสมาชิก",
        subtitle: "สะสมแต้มและรับสิทธิพิเศษจาก Bitcoin Membership",

        phoneTab: "เบอร์โทรศัพท์",
        emailTab: "อีเมล",

        phonePlaceholder: "กรอกเบอร์โทรศัพท์ (เช่น 0812345678)",
        emailPlaceholder: "กรอกอีเมลของคุณ",

        continueBtn: "ดำเนินการต่อ",
        emailBtn: "ดำเนินการต่อด้วยอีเมล",

        divider: "หรือเข้าสู่ระบบด้วย",
        lineBtn: "เข้าสู่ระบบด้วย LINE",
        googleBtn: "เข้าสู่ระบบด้วย Google",

        terms:
            "การสมัครสมาชิกแสดงว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว",

        closeBtn: "ปิดหน้าต่าง",

        phoneError: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
        phoneFormatError: "กรุณากรอกเบอร์โทรศัพท์ไทยให้ถูกต้อง",

        otpPhoneTitle: "ยืนยันเบอร์โทรศัพท์",
        otpEmailTitle: "ยืนยันอีเมล",

        otpSubtitle: "เราได้ส่งรหัส OTP ไปยัง",

        otpButton: "ยืนยัน OTP",
        resend: "ส่งรหัสอีกครั้ง",
        resendIn: "ส่งรหัสอีกครั้งใน",
        seconds: "วินาที",
        editPhone: "แก้ไขเบอร์โทรศัพท์",
        otpError: "กรุณากรอกรหัส OTP ให้ครบ 6 หลัก",
    },

    en: {
        title: "Join Membership",
        subtitle:
            "Collect points and unlock benefits with Bitcoin Membership",

        phoneTab: "Phone",
        emailTab: "Email",

        phonePlaceholder: "Enter mobile number",
        emailPlaceholder: "Enter your email",

        continueBtn: "Continue",
        emailBtn: "Continue with Email",

        divider: "or continue with",
        lineBtn: "Continue with LINE",
        googleBtn: "Continue with Google",

        terms:
            "By joining, you agree to our Terms and Privacy Policy.",

        closeBtn: "Close modal",

        phoneError: "Please enter a complete 10-digit phone number.",
        phoneFormatError: "Please enter a valid Thai phone number.",

        otpPhoneTitle: "Verify Your Phone",
        otpEmailTitle: "Verify Your Email",

        otpSubtitle: "We sent a verification code to",

        otpButton: "Verify OTP",
        resend: "Resend code",
        resendIn: "Resend code in",
        seconds: "seconds",
        editPhone: "Change phone number",
        otpError: "Please enter the 6-digit OTP code.",
    },

    zh: {
        title: "注册会员",
        subtitle: "加入 Bitcoin Membership，获取专属权益",

        phoneTab: "手机号码",
        emailTab: "电子邮箱",

        phonePlaceholder: "请输入手机号码",
        emailPlaceholder: "请输入您的电子邮箱",

        continueBtn: "继续",
        emailBtn: "使用邮箱继续",

        divider: "或使用以下方式",
        lineBtn: "使用 LINE 登录",
        googleBtn: "使用 Google 登录",

        terms: "注册即表示您同意我们的条款和隐私政策。",

        closeBtn: "关闭窗口",

        phoneError: "请输入完整的 10 位手机号码。",
        phoneFormatError: "请输入正确的泰国手机号码。",

        otpPhoneTitle: "验证手机号码",
        otpEmailTitle: "验证电子邮箱",

        otpSubtitle: "验证码已发送至",

        otpButton: "验证 OTP",
        resend: "重新发送验证码",
        resendIn: "请在",
        seconds: "秒后重新发送",
        editPhone: "修改手机号码",
        otpError: "请输入完整的 6 位验证码。",
    },
};

export default function RegisterModal({
                                          isOpenModal,
                                          onClose,
                                          lang = "th",
                                      }: RegisterModalProps) {
    const t = modalContent[lang];

    const [loginMethod, setLoginMethod] =
        useState<"phone" | "email">("phone");

    const [inputValue, setInputValue] = useState("");

    const [step, setStep] =
        useState<"input" | "otp">("input");

    const [otp, setOtp] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [error, setError] = useState("");

    const [countdown, setCountdown] = useState(45);

    const otpRefs =
        useRef<Array<HTMLInputElement | null>>([]);


    /* ================================================= */
    /* RESET */
    /* ================================================= */

    const resetModal = () => {
        setStep("input");
        setLoginMethod("phone");
        setInputValue("");
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setCountdown(45);
    };


    /* ================================================= */
    /* CLOSE */
    /* ================================================= */

    const handleClose = () => {
        resetModal();
        onClose();
    };


    /* ================================================= */
    /* PHONE INPUT */
    /* ================================================= */

    const handlePhoneChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // รับเฉพาะตัวเลข
        const value = e.target.value.replace(/\D/g, "");

        // จำกัดสูงสุด 10 หลัก
        const phone = value.slice(0, 10);

        setInputValue(phone);

        // ถ้า user กำลังแก้เบอร์ ให้ล้าง error
        if (error) {
            setError("");
        }
    };


    /* ================================================= */
    /* SUBMIT PHONE / EMAIL */
    /* ================================================= */



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        /* PHONE */

        if (loginMethod === "phone") {

            if (inputValue.length !== 10) {
                setError(t.phoneError);
                return;
            }

            const thaiPhoneRegex = /^0\d{9}$/;

            if (!thaiPhoneRegex.test(inputValue)) {
                setError(t.phoneFormatError);
                return;
            }

            console.log("Send OTP to:", inputValue);

            setOtp([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            setCountdown(45);
            setStep("otp");

            return;
        }


        /* EMAIL */


            if (loginMethod === "email") {

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(inputValue)) {
                    setError("กรุณากรอกอีเมลให้ถูกต้อง");
                    return;
                }

                // TODO:
                // ตรงนี้ภายหลังจะเรียก Backend
                // เพื่อส่ง OTP 6 หลักไปยัง Email
                console.log("Send OTP to email:", inputValue);

                setOtp([
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);

                setError("");
                setCountdown(45);

                // ไปหน้า OTP
                setStep("otp");

                return;
            }
    };
    /* ================================================= */
    /* OTP CHANGE */
    /* ================================================= */

    const handleOtpChange = (
        index: number,
        value: string
    ) => {
        const number = value.replace(/\D/g, "");

        if (!number) {
            const newOtp = [...otp];

            newOtp[index] = "";

            setOtp(newOtp);

            return;
        }

        const newOtp = [...otp];

        newOtp[index] = number.slice(-1);

        setOtp(newOtp);

        if (index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };


    /* ================================================= */
    /* OTP BACKSPACE */
    /* ================================================= */

    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            otpRefs.current[index - 1]?.focus();
        }
    };


    /* ================================================= */
    /* VERIFY OTP */
    /* ================================================= */

    const handleVerifyOtp = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            setError(t.otpError);
            return;
        }

        /*
         * TODO:
         * ส่ง OTP ไป Backend
         */

        console.log("Verify OTP:", {
            identifier: inputValue,
            method: loginMethod,
            otp: otpCode,
        });

        alert(`OTP: ${otpCode}`);
    };


    /* ================================================= */
    /* RESEND OTP */
    /* ================================================= */

    const handleResend = () => {
        if (countdown > 0) return;

        console.log(
            "Resend OTP to:",
            inputValue
        );

        setCountdown(45);
    };


    /* ================================================= */
    /* BACK */
    /* ================================================= */

    const handleBackToInput = () => {
        setStep("input");

        setOtp([
            "",
            "",
            "",
            "",
            "",
            "",
        ]);

        setError("");
    };


    /* ================================================= */
    /* RENDER */
    /* ================================================= */

    if (!isOpenModal) return null;


    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/80
                px-4
                backdrop-blur-md
                font-line
            "
            onClick={handleClose}
        >

            {/* ================================================= */}
            {/* MODAL */}
            {/* ================================================= */}

            <div
                className="
                    relative
                    w-full
                    max-w-md
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/20
                    bg-[#171717]
                    p-6
                    text-white
                    shadow-2xl
                    md:p-8
                "
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* Glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        z-0
                        h-44
                        w-44
                        rounded-full
                        bg-amber-500/15
                        blur-[80px]
                    "
                />


                {/* ================================================= */}
                {/* CLOSE */}
                {/* ================================================= */}

                <button
                    type="button"
                    onClick={handleClose}
                    aria-label={t.closeBtn}
                    className="
                        absolute
                        right-5
                        top-5
                        z-20
                        flex
                        h-10
                        w-10
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        text-zinc-300
                        transition-all
                        hover:bg-white/20
                        hover:text-white
                    "
                >
                    <X size={22} />
                </button>


                {/* ================================================= */}
                {/* CONTENT */}
                {/* ================================================= */}

                <div className="relative z-10">

                    <AnimatePresence mode="wait">

                        {/* ================================================= */}
                        {/* STEP 1 */}
                        {/* ================================================= */}

                        {step === "input" && (

                            <div key="input">

                                {/* Header */}

                                <div className="mb-6 text-center">

                                    <h3 className="
                                        text-3xl
                                        font-bold
                                        text-amber-500
                                    ">
                                        {t.title}
                                    </h3>

                                    <p className="
                                        mt-2
                                        text-[15px]
                                        leading-relaxed
                                        text-zinc-300
                                    ">
                                        {t.subtitle}
                                    </p>

                                </div>


                                {/* ================================================= */}
                                {/* TABS */}
                                {/* ================================================= */}

                                <div className="
                                    mb-5
                                    flex
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-black/40
                                    p-1
                                ">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoginMethod("phone");
                                            setInputValue("");
                                            setError("");
                                        }}
                                        className={`
                                            flex-1
                                            cursor-pointer
                                            rounded-lg
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            transition-all
                                            ${
                                            loginMethod === "phone"
                                                ? "bg-amber-500 text-black shadow-md"
                                                : "text-zinc-400 hover:text-white"
                                        }
                                        `}
                                    >
                                        {t.phoneTab}
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoginMethod("email");
                                            setInputValue("");
                                            setError("");
                                        }}
                                        className={`
                                            flex-1
                                            cursor-pointer
                                            rounded-lg
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            transition-all
                                            ${
                                            loginMethod === "email"
                                                ? "bg-amber-500 text-black shadow-md"
                                                : "text-zinc-400 hover:text-white"
                                        }
                                        `}
                                    >
                                        {t.emailTab}
                                    </button>

                                </div>


                                {/* ================================================= */}
                                {/* FORM */}
                                {/* ================================================= */}

                                <form onSubmit={handleSubmit}>

                                    {loginMethod === "phone" ? (

                                        <div className="relative">

                                            <Phone
                                                size={20}
                                                className="
                                                    absolute
                                                    left-4
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-amber-500
                                                "
                                            />

                                            <input
                                                type="tel"
                                                required
                                                inputMode="numeric"
                                                maxLength={10}
                                                value={inputValue}
                                                onChange={
                                                    handlePhoneChange
                                                }
                                                placeholder={
                                                    t.phonePlaceholder
                                                }
                                                className="
                                                    w-full
                                                    rounded-xl
                                                    border
                                                    border-white/20
                                                    bg-black/50
                                                    py-4
                                                    pl-12
                                                    pr-4
                                                    text-base
                                                    text-white
                                                    outline-none
                                                    transition-all
                                                    placeholder:text-zinc-500
                                                    focus:border-amber-500
                                                    focus:ring-2
                                                    focus:ring-amber-500/30
                                                "
                                            />

                                        </div>

                                    ) : (

                                        <div className="relative">

                                            <Mail
                                                size={20}
                                                className="
                                                    absolute
                                                    left-4
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-amber-500
                                                "
                                            />

                                            <input
                                                type="email"
                                                required
                                                value={inputValue}
                                                onChange={(e) => {
                                                    setInputValue(e.target.value);

                                                    if (error) {
                                                        setError("");
                                                    }
                                                }}
                                                placeholder={t.emailPlaceholder}
                                                className="w-full rounded-xl border border-white/20
                                                    bg-black/50 py-4 pl-12 pr-4 text-base text-white
                                                    outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500
                                                    focus:ring-2 focus:ring-amber-500/30"
                                            />

                                        </div>

                                    )}


                                    {/* PHONE ERROR */}

                                    {error && (
                                        <p className="
                                            mt-2
                                            text-sm
                                            text-red-400
                                        ">
                                            {error}
                                        </p>
                                    )}


                                    <button
                                        type="submit"
                                        className="
                                            mt-4
                                            w-full
                                            cursor-pointer
                                            rounded-xl
                                            bg-amber-500
                                            py-4
                                            text-lg
                                            font-bold
                                            text-black
                                            shadow-lg
                                            shadow-amber-500/10
                                            transition-all
                                            hover:bg-amber-400
                                            active:scale-[0.99]
                                        "
                                    >
                                        {loginMethod === "phone"
                                            ? t.continueBtn
                                            : t.emailBtn}
                                    </button>

                                </form>


                                {/* ================================================= */}
                                {/* DIVIDER */}
                                {/* ================================================= */}

                                <div className="
                                    my-6
                                    flex
                                    items-center
                                    gap-4
                                ">

                                    <div className="
                                        h-px
                                        flex-1
                                        bg-white/20
                                    " />

                                    <div className="
                                        text-sm
                                        font-medium
                                        text-zinc-400
                                    ">
                                        {t.divider}
                                    </div>

                                    <div className="
                                        h-px
                                        flex-1
                                        bg-white/20
                                    " />

                                </div>


                                {/* ================================================= */}
                                {/* SOCIAL */}
                                {/* ================================================= */}

                                <div className="space-y-3">

                                    <button
                                        type="button"
                                        className="
                                            flex
                                            w-full
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            gap-3
                                            rounded-xl
                                            bg-[#06C755]
                                            py-3.5
                                            text-base
                                            font-semibold
                                            text-white
                                            transition-all
                                            hover:bg-[#05b34c]
                                            active:scale-[0.99]
                                        "
                                    >
                                        <FaLine className="text-2xl" />

                                        {t.lineBtn}
                                    </button>


                                    <button
                                        type="button"
                                        className="
                                            flex
                                            w-full
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            gap-3
                                            rounded-xl
                                            border
                                            border-zinc-300
                                            bg-white
                                            py-3.5
                                            text-base
                                            font-semibold
                                            text-zinc-800
                                            transition-all
                                            hover:bg-zinc-100
                                            active:scale-[0.99]
                                        "
                                    >
                                        <span className="
                                            text-lg
                                            font-bold
                                        ">
                                            <FcGoogle className="text-2xl" />
                                        </span>

                                        {t.googleBtn}
                                    </button>

                                </div>


                                {/* Terms */}

                                <p className="
                                    mt-6
                                    px-2
                                    text-center
                                    text-xs
                                    leading-relaxed
                                    text-zinc-300
                                ">
                                    {t.terms}
                                </p>

                            </div>
                        )}


                        {/* ================================================= */}
                        {/* STEP 2 — OTP */}
                        {/* ================================================= */}

                        {step === "otp" && (

                            <motion.div
                                key="otp"
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                transition={{
                                    duration: 0.1,
                                }}
                            >

                                {/* Back */}

                                <button
                                    type="button"
                                    onClick={handleBackToInput}
                                    className="
                                        mb-6
                                        flex
                                        cursor-pointer
                                        items-center
                                        gap-2
                                        text-sm
                                        text-zinc-400
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    <ArrowLeft size={17} />

                                    {t.editPhone}
                                </button>


                                {/* OTP Header */}

                                <div className="text-center">

                                    <div className="
                                        mx-auto
                                        mb-5
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-amber-500/10
                                        text-amber-500
                                    ">
                                        {loginMethod === "phone" ?
                                            ( <Phone size={28} /> )
                                            : ( <Mail size={28 } /> )
                                        }
                                    </div>


                                    <h3 className="text-3xl font-bold text-amber-500">

                                        {loginMethod === "phone"
                                            ? t.otpPhoneTitle
                                            : t.otpEmailTitle}
                                    </h3>


                                    <p className="
                                        mt-3
                                        text-[15px]
                                        leading-relaxed
                                        text-zinc-400
                                    ">
                                        {t.otpSubtitle}
                                    </p>


                                    <p className="
                                        mt-1
                                        font-semibold
                                        text-white
                                    ">
                                        {inputValue}
                                    </p>

                                </div>


                                {/* ================================================= */}
                                {/* OTP INPUT */}
                                {/* ================================================= */}

                                <form
                                    onSubmit={handleVerifyOtp}
                                    className="mt-8"
                                >

                                    <div className="
                                        flex
                                        justify-center
                                        gap-2
                                        sm:gap-3
                                    ">

                                        {otp.map(
                                            (value, index) => (

                                                <input
                                                    key={index}
                                                    ref={(el) => {
                                                        otpRefs.current[
                                                            index
                                                            ] = el;
                                                    }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={value}
                                                    onChange={(e) =>
                                                        handleOtpChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleOtpKeyDown(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="
                                                        h-12
                                                        w-10
                                                        rounded-xl
                                                        border
                                                        border-white/20
                                                        bg-black/50
                                                        text-center
                                                        text-xl
                                                        font-bold
                                                        text-white
                                                        outline-none
                                                        transition-all
                                                        focus:border-amber-500
                                                        focus:ring-2
                                                        focus:ring-amber-500/30
                                                        sm:h-14
                                                        sm:w-12
                                                    "
                                                />

                                            )
                                        )}

                                    </div>


                                    {error && (

                                        <p className="
                                            mt-4
                                            text-center
                                            text-sm
                                            text-red-400
                                        ">
                                            {error}
                                        </p>

                                    )}


                                    <button
                                        type="submit"
                                        className="
                                            mt-6
                                            w-full
                                            cursor-pointer
                                            rounded-xl
                                            bg-amber-500
                                            py-4
                                            text-lg
                                            font-bold
                                            text-black
                                            shadow-lg
                                            shadow-amber-500/10
                                            transition-all
                                            hover:bg-amber-400
                                            active:scale-[0.99]
                                        "
                                    >
                                        {t.otpButton}
                                    </button>

                                </form>


                                {/* ================================================= */}
                                {/* RESEND */}
                                {/* ================================================= */}

                                <div className="
                                    mt-6
                                    text-center
                                ">

                                    {countdown > 0 ? (

                                        <p className="
                                            text-sm
                                            text-zinc-500
                                        ">
                                            {t.resendIn}{" "}

                                            <span className="
                                                font-semibold
                                                text-zinc-300
                                            ">
                                                {countdown}
                                            </span>{" "}

                                            {t.seconds}
                                        </p>

                                    ) : (

                                        <button
                                            type="button"
                                            onClick={
                                                handleResend
                                            }
                                            className="
                                                cursor-pointer
                                                text-sm
                                                font-medium
                                                text-amber-500
                                                transition-colors
                                                hover:text-amber-400
                                            "
                                        >
                                            {t.resend}
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