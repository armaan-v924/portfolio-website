import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
    currentPage: string;
    className?: string;
    id?: string;
}

function NavBar({ currentPage, className }: NavBarProps) {
    const navigate = useNavigate();
    const [hoveredPage, setHoveredPage] = useState<string | null>(null);
    const reducedMotion = useReducedMotion();

    const pages = [
        { name: "Home", route: "/" },
        { name: "About", route: "/about" },
        { name: "Contact", route: "/contact" },
    ];

    // Refs
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // State for arrow's x position
    const [xPosition, setXPosition] = useState<number | null>(null);

    // Function to calculate and set x position
    const calculatePosition = (pageName: string) => {
        const buttonIndex = pages.findIndex((page) => page.name === pageName);
        if (buttonIndex === -1) return;

        const button = buttonRefs.current[buttonIndex];
        const container = containerRef.current;

        if (button && container) {
            const relativeX = button.offsetLeft - button.offsetWidth / 7;
            setXPosition(relativeX);
        }
    };

    // Function to delay position calculation using requestAnimationFrame
    const delayedCalculatePosition = (pageName: string) => {
        requestAnimationFrame(() => {
            calculatePosition(pageName);
        });
    };

    // Set initial position on mount and when currentPage changes
    useLayoutEffect(() => {
        const timeoutId = setTimeout(() => {
            delayedCalculatePosition(currentPage);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    // Move arrow to hovered page or back to current page
    useLayoutEffect(() => {
        if (hoveredPage) {
            delayedCalculatePosition(hoveredPage);
        } else {
            delayedCalculatePosition(currentPage);
        }
    }, [hoveredPage, currentPage]);

    // Recalculate position on window resize
    useLayoutEffect(() => {
        const handleResize = () => {
            if (hoveredPage) {
                delayedCalculatePosition(hoveredPage);
            } else {
                delayedCalculatePosition(currentPage);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [hoveredPage, currentPage]);

    return (
        <div className="flex flex-row place-items-center justify-between">
            <div className="flex flex-row">
                <img
                    src="/icon.svg"
                    alt="Logo"
                    onClick={() => navigate("/")}
                    className="h-16 cursor-pointer"
                />
                <div
                    className={cn(
                        "relative flex flex-row items-center space-x-5",
                        className
                    )}
                    ref={containerRef}
                >
                    {xPosition !== null && (
                        <motion.div
                            className="absolute transform left-0 z-10 pointer-events-none"
                            initial={false}
                            animate={{
                                x: xPosition,
                            }}
                            transition={{
                                type: reducedMotion ? "tween" : "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                        >
                            <ArrowRight className="size-4 text-accent" />
                        </motion.div>
                    )}

                    {pages.map((page, index) => (
                        <Button
                            key={page.name}
                            variant="ghost"
                            className="w-16 relative hover:bg-inherit hover:text-inherit"
                            onMouseEnter={() => setHoveredPage(page.name)}
                            onMouseLeave={() => setHoveredPage(null)}
                            onClick={() => navigate(page.route)}
                            ref={(el) => (buttonRefs.current[index] = el)}
                        >
                            {page.name}
                        </Button>
                    ))}
                </div>
            </div>
            <ModeToggle />
        </div>
    );
}

export default NavBar;
