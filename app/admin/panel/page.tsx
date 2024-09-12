"use client"

import React, { useState } from 'react';
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import { User, Gamepad2, Phone } from 'lucide-react';


import UsersComponent from './_Components/Users';
import GamesComponent from './_Components/Games';
import ContactsComponent from './_Components/Contact';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('games');

    const tabs = [
        { id: 'users', icon: User, label: 'Users', component: UsersComponent },
        { id: 'games', icon: Gamepad2, label: 'Games', component: GamesComponent },
        { id: 'contacts', icon: Phone, label: 'Contacts', component: ContactsComponent },
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || null;

    return (
        <Section>
            <Nav />
            <div className="border-b border-[hsl(240,3.7%,15.9%)] mt-10">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    {tabs.map((tab) => (
                        <li className="me-2" key={tab.id}>
                            <a
                                href="#"
                                onClick={() => setActiveTab(tab.id)}
                                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg transition-all duration-300 group
                                    ${activeTab === tab.id
                                    ? 'text-[hsl(22.64,100%,61.4%)] border-[hsl(22.64,100%,61.4%)]'
                                    : 'border-transparent hover:text-[hsl(22.64,100%,61.4%)] hover:border-[hsl(22.64,100%,61.4%)]'
                                }`}
                            >
                                {React.createElement(tab.icon, {
                                    className: `w-5 h-5 me-2 transition-colors duration-300
                                        ${activeTab === tab.id
                                        ? 'text-[hsl(22.64,100%,61.4%)]'
                                        : 'text-[hsl(240,5%,64.9%)] group-hover:text-[hsl(22.64,100%,61.4%)]'
                                    }`
                                })}
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                {ActiveComponent && <ActiveComponent />}
            </div>
        </Section>
    )
}

export default AdminPage;