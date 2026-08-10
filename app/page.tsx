"use client";

import { useState } from "react";
import FirstPanel from "@/app/components/auth/FirstPanel";
import BenefitCard from "@/app/components/sec2/BenefitCard";
import Navbar from "@/app/components/common/Navbar";

export type Language = "th" | "en" | "zh";

export default function Page() {
    const [lang, setLang] = useState<Language>("th");

    return (
        <main>
            <Navbar lang={lang} setLang={setLang} />

            <FirstPanel lang={lang} />

            <BenefitCard lang={lang} />
        </main>
    );
}