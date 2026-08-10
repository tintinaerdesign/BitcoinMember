"use client";

import FirstPanel from '@/app/components/auth/FirstPanel';
import BenefitCard from '@/app/components/sec2/BenefitCard';


export default function page() {
    return (
        <main>
            <FirstPanel />
            <BenefitCard />
        </main>
    );
}