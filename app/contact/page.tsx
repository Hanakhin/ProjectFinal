"use client"

import react from 'react';
import ContactComponent from './ContactComponent';
import {Section} from "@/app/_Components/Section";
import Nav from "@/app/_Components/Nav/Nav";
import Footer from "@/app/_Components/Footer";


const ContactPage = () =>{
    return (
        <Section className='h-screen'>
            <Nav/>
            <ContactComponent/>
            <Footer/>
        </Section>
    )
}

export default ContactPage;