"use client"

import React from 'react';
import { Section } from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";

import {UserProfileCard} from "@/app/user/profile/[id]/UserCardComponent";
import {Spacing} from "@/app/_Components/Spacing";

const UserDetail = () => {
    return (
        <Section className={'flex flex-col items-center justify-center '}>
            <Nav/>
            <Spacing/>
            <UserProfileCard/>
        </Section>
    );
};

export default UserDetail;
