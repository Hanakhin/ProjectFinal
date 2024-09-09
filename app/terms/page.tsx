"use client"


import React from 'react';
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import {Spacing} from "@/app/_Components/Spacing";

const TermsOfService: React.FC = () => {
    return (
        <Section>
            <Nav/>
            <Spacing/>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[hsl(0,0%,98%)] mb-6">Terms of Service</h1>
                <div className="space-y-6 text-[hsl(240,5%,64.9%)]">
                    <p>
                        Welcome to <span className="text-orange font-semibold">GameZone</span>. By using our service, you agree to these terms. Please read them carefully.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Use of Service</h2>
                    <p>
                        You must follow any policies made available to you within the Services. Don't misuse our Services.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Your GameZone Account</h2>
                    <p>
                        You may need a GameZone Account in order to use some of our Services. You are responsible for maintaining the security of your account.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Content in the Services</h2>
                    <p>
                        Don't use content from our Services unless you have obtained permission from its owner or are otherwise permitted by law.
                    </p>
                    <h2 className="text-2xl font-semibold text-[hsl(0,0%,98%)] mt-4 mb-2">Modifying and Terminating our Services</h2>
                    <p>
                        We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default TermsOfService;