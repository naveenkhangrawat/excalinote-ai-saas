import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Wrapper from './Wrapper';
import uuid4 from 'uuid4';


const PRODUCT_LINKS = [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Testimonials", href: "#" },
];

const RESOURCES_LINKS = [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Support", href: "#" },
    { label: "Success Stories", href: "#" },
];

const COMPANY_LINKS = [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
];

const SOCIAL_LINKS = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
];

const Footer = () => {
    return (
        <footer className="relative border-t border-border pt-16 pb-8 md:pb-0 w-full overflow-hidden">
            <Wrapper className="">

                <div className="absolute -top-1/8 lg:-top-1/2 inset-x-0 mx-auto bg-primary/50 lg:bg-primary/70 rounded-full w-1/2 h-1/4 blur-[6rem] lg:blur-[12rem]" />

                <div className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0" />


                <div className="grid gap-8 xl:grid-cols-3 xl:gap-8">
                    <div className="flex flex-col items-start justify-start md:max-w-[300px]">
                        <Link href="/" className="flex items-center gap-3 shrink-0">
                            <Image src={'./logo.svg'} alt='Excalinote' width={36} height={36} />
                            <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800'>
                                Excalinote
                            </h3>
                        </Link>
                        <p className="text-muted-foreground mt-4 text-sm">
                            The most powerful AI-powered note-taking platform for students and professionals.
                        </p>
                        <div className="mt-4 text-sm text-muted-foreground">
                            <p className='font-bold text-slate-700'>Made in India</p>
                            <p>support@excalinote.com</p>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            {SOCIAL_LINKS.map(({icon: Icon, href}) => (
                                <Link
                                    key={uuid4()}
                                    href={href}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Icon className="size-5" />
                                </Link>
                            ))}
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-medium">Product</h3>
                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    {PRODUCT_LINKS.map((link) => (
                                        <li key={uuid4()}>
                                            <Link
                                                href={link.href}
                                                className="hover:text-foreground transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                        
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-base font-medium">Resources</h3>
                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    {RESOURCES_LINKS.map((link) => (
                                        <li key={uuid4()}>
                                            <Link
                                                href={link.href}
                                                className="hover:text-foreground transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>                                            
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-medium">Company</h3>
                            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                {COMPANY_LINKS.map((link) => (
                                    <li key={uuid4()}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-border/40 py-8 flex flex-col md:flex-row items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Excalinote. All rights reserved.
                    </p>
                </div>

            </Wrapper>
        </footer>
    );
};

export default Footer;