// VISION & MISSION
import WhoAreWeImg from '../assets/team/group/whoAreWe.png';
import VissionMissionImg from '../assets/team/group/visionMission.png';

export const vision = {
    whoAreWe: {
        eyebrow: 'who are we',
        headline: 'Turning Customer',
        highlightedText: 'Signals Into Growth',
        description: [
            "Attributics is a customer lifecycle–focused growth partner for enterprise brands.",
            "We help organizations transform scattered customer data, fragmented journeys, and complex Martech stacks into cohesive, intelligence-led lifecycle systems , built to drive measurable business impact.",
        ],
        image: WhoAreWeImg
    },

    statement: {
        normal: "Sustainable growth is engineered at the intersection of data, automation, and lifecycle intelligence.",
        highlighted: "",
    },

    vissionMission: {
        eyebrow: 'mission & vision',
        vision: {
            headline: 'Vision',
            description: 'To empower leading brands to turn data, technology, and marketing into lasting customer lifetime value — through intelligence, automation, and operational clarity.',
        },
        mission: {
            headline: 'Mission',
            description: [
                "We embed lifecycle intelligence into existing Martech ecosystems, without requiring brands to rebuild from scratch.",
                "We help enterprises:",
            ],
            points: [
                "Unify customer data into a 360° view",
                "Optimize lifecycle journeys across channels",
                "Enable real-time segmentation and personalization",
                "Improve retention, conversion, and LTV",
                "Drive measurable ROI from existing technology investments",
            ],
        },
        image: VissionMissionImg
    },
}

// METRICS CARDS
export const metricCards = [
    { metric: 20, unit: "%", postive: true, subheadline: "Peak Revenue Growth" },
    { metric: 50, unit: "%", postive: true, subheadline: "CRM-Driven Uplift" },
    { metric: 15, unit: "%", postive: true, subheadline: "Customer Lifetime Value" },
    { metric: 3, unit: "X", postive: true, subheadline: "Faster Execution" }
]

// TEAM MEMBERS
import VishalA from '../assets/team/VishalA.png';
import VakeshS from '../assets/team/VakeshS.png';
import ShashankK from '../assets/team/ShashankK.png';
import ShreyaM from '../assets/team/ShreyaM.png';
import MudarB from '../assets/team/MudarB.png';
import MadhuriK from '../assets/team/MadhuriK.png';

export const team = {
    eyebrow: 'Our Team',
    headline: 'Meet Our',
    highlighted: 'Team',
    members: [
        {
            id: 1,
            name: 'Vishal Agarwal',
            role: 'Founder',
            bio: 'With over 10 years of experience in AI and marketing technology, leading innovation.',
            img: VishalA,
        },
        {
            id: 2,
            name: 'Vakesh Singh',
            role: 'CTO',
            bio: 'Expert in machine learning and data science, driving technical excellence.',
            img: VakeshS,
        },
        {
            id: 3,
            name: 'Shashank Kumar',
            role: 'CFO',
            bio: 'Marketing strategist with a passion for customer success and growth.',
            img: ShashankK,
        },
        {
            id: 4,
            name: 'Shreya Mehta',
            role: 'Founder',
            bio: 'Business development leader focused on strategic partnerships.',
            img: ShreyaM,
        },
        {
            id: 5,
            name: 'Mudar Bharmal',
            role: 'Founder',
            bio: 'Product visionary dedicated to solving complex marketing challenges.',
            img: MudarB,
        },
        {
            id: 6,
            name: 'Madhuri Kurhade',
            role: 'Founder',
            bio: 'Operations expert ensuring seamless execution and growth.',
            img: MadhuriK,
        },
        {
            id: 7,
            name: 'Vishal Agarwal',
            role: 'Founder',
            bio: 'With over 10 years of experience in AI and marketing technology, leading innovation.',
            img: VishalA,
        },
        {
            id: 8,
            name: 'Vakesh Singh',
            role: 'CTO',
            bio: 'Expert in machine learning and data science, driving technical excellence.',
            img: VakeshS,
        },
    ],
}

// GET STARTED CTA
export const getstarted = {
    eyebrow: 'Ready to Transform Your Growth?',
    headline: [
        'Add Intelligence.',
        'Unlock',
    ],
    highlighted: [
        'Retention',
        'Revenue',
        'Engagement',
        'Conversion'
    ],
    description: "Book a personalized demo with our experts and see how Attributics can revolutionize your customer lifecycle marketing.",
    ctaText: 'Schedule Your Demo',
}