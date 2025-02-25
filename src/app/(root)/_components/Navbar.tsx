"use client";

import React, { RefObject, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { cn } from '@/lib/utils';
import Wrapper from './Wrapper';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/constants';
import AnimationContainer from './AnimationContainer';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton, } from '@clerk/nextjs';
import { MenuIcon, XIcon } from 'lucide-react';
import { useClickOutside } from '@/hooks/use-click-outside';


function Navbar() {

    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const mobileMenuRef = useClickOutside(() => {
        if (open) setOpen(false);
    });

    const { scrollY } = useScroll({
        target: ref as RefObject<HTMLDivElement>,
        offset: ["start start", "end start"],
    });

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <header className="fixed w-full top-0 inset-x-0 z-50">
            {/* Desktop */}
            <motion.div
                animate={{
                    width: visible ? "40%" : "100%",
                    y: visible ? 20 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 40,
                }}
                style={{
                    minWidth: "800px",
                }}
                className={cn("hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full backdrop-blur",
                visible && "bg-background/80 py-2.5 w-full shadow-input border border-gray-400/30 shadow-2xl"
                )}
            >
                <Wrapper className="flex items-center justify-between lg:px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/" className="flex items-center gap-3 shrink-0">
                            <Image src={'./logo.svg'} alt='Logo' width={36} height={36} />
                            <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800'>
                                Excalinote
                            </h3>
                        </Link>
                    </motion.div>

                    <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-2 text-sm text-foreground/70 font-medium">
                        <AnimatePresence>
                            {NAV_LINKS.map((link, index) => (
                                <AnimationContainer
                                    key={index}
                                    animation="fadeDown"
                                    delay={0.1 * index}
                                >
                                    <div className="relative">
                                        <Link href={link.link} className="hover:text-foreground transition-all duration-500 hover:bg-gray-300/40 rounded-md px-4 py-2">
                                            {link.name}
                                        </Link>
                                    </div>
                                </AnimationContainer>
                            ))}
                        </AnimatePresence>
                    </div>

                    <AnimationContainer animation="fadeLeft" delay={0.1}>
                        <div className="flex items-center gap-x-4">
                            <SignedIn>
                                <Link href="/workspace">
                                    <button className="px-4 py-2 rounded-md font-medium border border-neutral-300 bg-primary text-primary-foreground text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                        Workspace
                                    </button>
                                </Link>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <Link href="/sign-in">
                                    <button className="px-4 py-2 rounded-md font-medium border border-neutral-300 bg-neutral-100 text-neutral-800 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                        Sign in
                                    </button>
                                </Link>
                                

                                <Link href={"/sign-up"}>
                                    <button className="px-4 py-2 text-sm bg-primary text-white rounded-md font-medium transform hover:-translate-y-1 transition duration-400">
                                        Sign up
                                    </button>
                                </Link>
                            </SignedOut>
                        </div>
                    </AnimationContainer>
                </Wrapper>
            </motion.div>

            {/* mobile */}
            <motion.div
                animate={{
                    y: visible ? 20 : 0,
                    borderTopLeftRadius: open ? "0.75rem" : "2rem",
                    borderTopRightRadius: open ? "0.75rem" : "2rem",
                    borderBottomLeftRadius: open ? "0" : "2rem",
                    borderBottomRightRadius: open ? "0" : "2rem",
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 50,
                }}
                className={cn(
                    "flex relative flex-col lg:hidden w-full justify-between items-center mx-auto py-4 z-50",
                    visible && "bg-background w-11/12 border",
                    open && "border-transparent"
                )}
            >
                <Wrapper className="flex items-center justify-between lg:px-4">
                    <div className="flex items-center justify-between gap-x-4 w-full">
                        <AnimationContainer animation="fadeRight" delay={0.1}>
                            <Link href="/" className="flex items-center gap-3 shrink-0">
                                <Image src={'./logo.svg'} alt='Logo' width={36} height={36} />
                                <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800'>
                                    Excalinote
                                </h3>
                            </Link>
                        </AnimationContainer>

                        <AnimationContainer animation="fadeLeft" delay={0.1}>
                            <div className="flex items-center justify-center gap-x-4">
                                <Button size="sm">
                                    <Link href="/signup" className="flex items-center">
                                        Get started
                                    </Link>
                                </Button>
                                {open ? (
                                    <XIcon
                                        className="text-black dark:text-white"
                                        onClick={() => setOpen(!open)}
                                    />
                                ) : (
                                    <MenuIcon
                                        className="text-black dark:text-white"
                                        onClick={() => setOpen(!open)}
                                    />
                                )}
                            </div>
                        </AnimationContainer>
                    </div>
                </Wrapper>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={mobileMenuRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex rounded-b-xl absolute top-16 bg-background inset-x-0 z-50 flex-col items-start justify-start gap-2 w-full px-4 py-8 shadow-xl"
                        >
                            {NAV_LINKS.map((navItem, idx: number) => (
                                <AnimationContainer
                                    key={`link=${idx}`}
                                    animation="fadeRight"
                                    delay={0.1 * (idx + 1)}
                                    className="w-full"
                                >
                                    <Link
                                        href={navItem.link}
                                        onClick={() => setOpen(false)}
                                        className="relative text-foreground hover:bg-gray-300/40 w-full px-4 py-2 rounded-lg"
                                    >
                                        <motion.span>{navItem.name}</motion.span>
                                    </Link>
                                </AnimationContainer>
                            ))}
                            <AnimationContainer animation="fadeUp" delay={0.5} className="w-full flex flex-col gap-y-2">
                                <SignedIn>
                                    <Link href="/workspace" className="w-full">
                                        <Button
                                            onClick={() => setOpen(false)}
                                            variant="default"
                                            className="block md:hidden w-full"
                                        >
                                            Workspace
                                        </Button>
                                    </Link>
                                </SignedIn>
                                <SignedOut>
                                    <Link href="/sign-in" className="w-full">
                                        <Button
                                            onClick={() => setOpen(false)}
                                            variant="outline"
                                            className="block md:hidden w-full"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/sign-up" className="w-full">
                                        <Button
                                            onClick={() => setOpen(false)}
                                            variant="default"
                                            className="block md:hidden w-full"
                                        >
                                            Start for free
                                        </Button>
                                    </Link>
                                </SignedOut>
                            </AnimationContainer>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </header>
    )
}

export default Navbar