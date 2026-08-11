'use client';

import { useState } from 'react';

import RankingLeaderBoard from "@/app/ranking/RankingLeaderBoard";

import type { Language } from "@/app/page";


export default function page() {

    const [lang, setLang] = useState<Language>("th");

    return (
        <RankingLeaderBoard lang={lang} setLang={setLang} />
    );
}