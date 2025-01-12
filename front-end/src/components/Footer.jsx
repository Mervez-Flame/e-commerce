/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../assets/data';

const FooterColumn = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-5'>
            <h4 className='font-extrabold bold-18 whitespace-nowrap'>{title}</h4>
            {children}
        </div>
    );
};

const Footer = () => {
    return (
        <footer className='flexCenter pb-24 pt-20 bg-gray-10'>
            <div className='max_padd_container flex flex-col w-full gap-14'>
                <div className='flex flex-col items-start justify-center gap-[10%] md:flex-row'>
                    <Link to="/" className="mb-10 text-[20px] font-black">Style Haven</Link>
                    <nav className='flex flex-wrap gap-8 sm:justify-between md:flex-1 '>
                        {FOOTER_LINKS.map((col, index) => (
                            <FooterColumn title={col.title} key={index}>
                                <ul className='flex flex-col gap-4 regular-14 text-gray-20'>
                                    {col.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link to="/">{link}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}
                        <nav className='flex flex-col gap-5'>
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {FOOTER_CONTACT_INFO.links.map((link, idx) => (
                                    <Link to='/' key={idx} className='flex gap-2 md:flex-col lg:flex-row'>
                                        <p>{link.label}:</p><p className='medium-14'>{link.value}</p>
                                    </Link>
                                ))}
                            </FooterColumn>
                        </nav>
                        <nav className='flex gap-4'>
                            <FooterColumn>
                                <ul>
                                    {SOCIALS.links.map((link, idx) => (
                                        <Link to="/" key={idx}>
                                            <img src={link} alt="socialIcons" height={22} width={22} />
                                        </Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        </nav>
                    </nav>
                </div>
                <div className="border bg-gray-20">
                    <p className="text-center text-[20px] text-gray-50">2024 Style Haven | All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
