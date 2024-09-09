"use client"

import React from 'react';
import { Section } from "@/app/_Components/Section";
import { Lock } from 'lucide-react';
import Nav from "@/app/_Components/Nav/Nav";
import {Spacing} from "@/app/_Components/Spacing";

const PrivacyPolicy: React.FC = () => {
    return (
        <Section>
            <Nav/>
            <Spacing/>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[hsl(0,0%,98%)] mb-6">Privacy Policy</h1>
                <div className="space-y-6 text-[hsl(240,5%,64.9%)]">
                    <p>
                        At <span className="text-orange font-semibold">GameZone</span>, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Information Collection</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Use of Information</h2>
                    <p>
                        We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Data Protection</h2>
                    <p>
                        <Lock className="inline w-5 h-5 text-orange mr-2" />
                        We implement a variety of security measures to maintain the safety of your personal information.
                    </p>
                    <p>
                        For more detailed information, please read our full privacy policy.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default PrivacyPolicy;