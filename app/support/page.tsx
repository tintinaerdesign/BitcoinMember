"use client";

import { useEffect, useState } from "react";

import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import SupportContent from "@/app/components/support/SupportContent";

import type { Language } from "@/app/page";

export default function SupportPage() {
    const [lang, setLang] = useState<Language>("th");

    useEffect(() => {
        const id = window.location.hash.replace("#", "");
        if (!id) return;
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    return (
        <main>
            <Navbar lang={lang} setLang={setLang} />
            <SupportContent lang={lang} />
            <Footer lang={lang} />
        </main>
    );
}
