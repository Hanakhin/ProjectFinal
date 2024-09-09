"use client"

import { Section } from './Section'
import Nav from "@/app/_Components/Nav/Nav";



export const Header = () =>{
    return(
        <header className={' top-0 py-4'}>
            <Section className={'flex items-baseline'}>
                <Nav/>
            </Section>
        </header>
    )
}