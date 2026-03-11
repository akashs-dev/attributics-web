import Logo from '../assets/logo/AttributicsLogo.png';
import Wordmark from '../assets/logo/AttributicsWordmark.png';

export const brand = {
    logo: Logo,
    wordmark: Wordmark,
    name: 'Attributics Tech Pvt. Ltd.',
    tagline: 'AI-Powered Revenue Intelligence',
}

export const nav = {
    links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        {
            label: 'Resources',
            href: '/resources',
        },
        { label: 'Careers', href: '/careers' },
    ],
    cta: {
        login: 'Login',
        demo: 'Book a meeting',
        contact: 'Contact Us',
    },
}

export const footer = {
    socials: [
        {
            logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
            name: "LinkedIn",
            href: "https://www.linkedin.com/company/attributicslab/",
        }
    ],
    links: [
        {
            title: 'Company',
            items: [
                {
                    label: 'Home',
                    href: '/',
                },
                {
                    label: 'Services',
                    href: '/services',
                },
                {
                    label: 'About',
                    href: '/about',
                },
            ]
        },
        {
            title: 'Resources',
            items: [
                {
                    label: 'Resources',
                    href: '/resources',
                },
                {
                    label: 'Careers',
                    href: '/careers',
                },
                {
                    label: 'Privacy Policy',
                    href: '/privacy',
                },
            ]
        }
    ],
    copyright: '© 2026 Attributics. All rights reserved.',
}