"use client";

import FirstPanel from '@/app/components/auth/FirstPanel';
import BenefitCard from '@/app/components/sec2/BenefitCard';
import Navbar from '@/app/components/common/Navbar';


export default function page() {
    return (
        <main>
            <Navbar />
            <FirstPanel />
            <BenefitCard />
        </main>
    );
}