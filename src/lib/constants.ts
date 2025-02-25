
import { AIModelsList } from "./types";


export const MAX_FILE_UPLOADS = 5;


export const NAV_LINKS = [
    {
        name: "Features",
        link: "#features",
    },
    {
        name: "Pricing",
        link: "#pricing",
    },
    {
        name: "Contact",
        link: "#",
    },
];


export const AIModels: AIModelsList = [
    {
        title: "Gemini",
        model: "gemini-2.0-flash-lite-preview-02-05",
        value: "gemini",
        path: "/gemini.svg",
        pro: false,
    },
    {
        title: "Llama",
        model: "meta-llama/llama-3.3-70b-instruct:free",
        value: "llama",
        path: "/llama.svg",
        pro: true,
    },
    {
        title: "Deepseek",
        model: "deepseek/deepseek-chat:free",
        value: "deepseek",
        path: "/deepseek.svg",
        pro: true,
    }
]

export const TESTIMONIALS = [
    {
        name: 'Alice',
        message:
        "Excalinote has completely transformed how I study and take notes! The AI-powered search makes finding answers in my PDFs effortless, and the ability to sketch diagrams right alongside my notes is a game-changer!",
    },
    {
        name: 'Bob',
        message:
        "I used to struggle with organizing my research, but Excalinote makes it so easy! The AI answers my questions instantly, and I can highlight, annotate, and sketch in one place. Highly recommended for students and professionals!",
    },
    {
        name: 'Charlie',
        message:
        "Finally, a note-taking app that does it all! Excalinote's AI assistant saves me hours of searching through documents, and the sketch feature is perfect for brainstorming ideas. It’s like having an AI-powered personal assistant!",
    },
    {
        name: 'David',
        message:
        "Excalinote makes working with PDFs a breeze! Whether I need to jot down notes, draw quick diagrams, or ask the AI a question, it’s all seamlessly integrated. This tool has become an essential part of my workflow!",
    },
    {
        name: 'Ella',
        message:
        "I love how intuitive Excalinote is! The AI is incredibly smart at pulling relevant information from my PDFs, and the note-taking experience feels natural. It’s an absolute must-have for anyone handling large amounts of documents!",
    },
    {
        name: 'Frank',
        message:
        "Excalinote has completely transformed how I study and take notes! The AI-powered search makes finding answers in my PDFs effortless, and the ability to sketch diagrams right alongside my notes is a game-changer!",
    },
    {
        name: 'Grace',
        message:
        "I used to struggle with organizing my research, but Excalinote makes it so easy! The AI answers my questions instantly, and I can highlight, annotate, and sketch in one place. Highly recommended for students and professionals!",
    },
    {
        name: 'Hank',
        message:
        "Finally, a note-taking app that does it all! Excalinote's AI assistant saves me hours of searching through documents, and the sketch feature is perfect for brainstorming ideas. It’s like having an AI-powered personal assistant!",
    },
    {
        name: 'Ivy',
        message:
        "Excalinote makes working with PDFs a breeze! Whether I need to jot down notes, draw quick diagrams, or ask the AI a question, it’s all seamlessly integrated. This tool has become an essential part of my workflow!",
    },
    {
        name: 'Jack',
        message:
        "I love how intuitive Excalinote is! The AI is incredibly smart at pulling relevant information from my PDFs, and the note-taking experience feels natural. It’s an absolute must-have for anyone handling large amounts of documents!",
    },
    {
        name: 'Katherine',
        message:
        "Excalinote has completely transformed how I study and take notes! The AI-powered search makes finding answers in my PDFs effortless, and the ability to sketch diagrams right alongside my notes is a game-changer!",
    },
    {
        name: 'Liam',
        message:
        "I used to struggle with organizing my research, but Excalinote makes it so easy! The AI answers my questions instantly, and I can highlight, annotate, and sketch in one place. Highly recommended for students and professionals!",
    },
    {
        name: 'Mia',
        message:
        "Finally, a note-taking app that does it all! Excalinote's AI assistant saves me hours of searching through documents, and the sketch feature is perfect for brainstorming ideas. It’s like having an AI-powered personal assistant!",
    },
    {
        name: 'Nathan',
        message:
        "Excalinote makes working with PDFs a breeze! Whether I need to jot down notes, draw quick diagrams, or ask the AI a question, it’s all seamlessly integrated. This tool has become an essential part of my workflow!",
    },
    {
        name: 'Olivia',
        message:
        "I love how intuitive Excalinote is! The AI is incredibly smart at pulling relevant information from my PDFs, and the note-taking experience feels natural. It’s an absolute must-have for anyone handling large amounts of documents!",
    },
    {
        name: 'Paul',
        message:
        "Excalinote has completely transformed how I study and take notes! The AI-powered search makes finding answers in my PDFs effortless, and the ability to sketch diagrams right alongside my notes is a game-changer!",
    },
    {
        name: 'Quinn',
        message:
        "I used to struggle with organizing my research, but Excalinote makes it so easy! The AI answers my questions instantly, and I can highlight, annotate, and sketch in one place. Highly recommended for students and professionals!",
    },
    {
        name: 'Rachel',
        message:
        "Finally, a note-taking app that does it all! Excalinote's AI assistant saves me hours of searching through documents, and the sketch feature is perfect for brainstorming ideas. It’s like having an AI-powered personal assistant!",
    },
    {
        name: 'Sam',
        message:
        "Excalinote makes working with PDFs a breeze! Whether I need to jot down notes, draw quick diagrams, or ask the AI a question, it’s all seamlessly integrated. This tool has become an essential part of my workflow!",
    },
];

export const PRICING_PLANS = [
    {
        name: "Free",
        price: {
            amount: 0,
            priceIds: {
                test: null,
                production: null
            }
        },
        features: [
            { text: "PDF uploads (up to 5)", included: true },
            { text: "AI-powered personal assistant", included: true },
            { text: "Editor and whiteboard access", included: true },
            { text: "Unlimited exports", included: true },
            { text: "Multiple AI models", included: false },
            { text: "Higher-quality responses", included: false },
            { text: "Priority Support", included: false}
        ]
    }, 
    {
        name: "Pro",
        price: {
            amount: 8,
            priceIds: {
                test: "price_1QuBRdGo9KkoC8bFOxXBVjdx",
                production: null
            }
        },
        popular: true,
        features: [
            { text: "Unlimited PDF uploads", included: true },
            { text: "AI-powered personal assistant", included: true },
            { text: "Editor and whiteboard access", included: true },
            { text: "Unlimited exports", included: true },
            { text: "Multiple AI models", included: true },
            { text: "Higher-quality responses", included: true },
            { text: "Priority Support", included: true}
        ]
    }
]