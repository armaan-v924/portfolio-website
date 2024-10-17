import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ParallaxSectionProps {
    header: React.ReactNode;
    children: React.ReactNode;
    showArrow?: boolean;
    nextSectionRef?: React.RefObject<HTMLDivElement>;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    header,
    children,
    showArrow = false,
    nextSectionRef,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // Get the vertical scroll position
    const { scrollY } = useScroll();

    // States to hold the element's position and height
    const [elementTop, setElementTop] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);

    // Measure the element's position and height
    useLayoutEffect(() => {
        const measureElement = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setElementTop(rect.top + window.scrollY);
                setElementHeight(rect.height);
            }
        };

        measureElement();
        window.addEventListener("resize", measureElement);

        return () => {
            window.removeEventListener("resize", measureElement);
        };
    }, []);

    // Calculate scroll progress
    const start = elementTop - window.innerHeight;
    const end = elementTop + elementHeight;
    const scrollProgress = useTransform(scrollY, [start, end], [0, 1]);

    const yHeader = useTransform(scrollProgress, [0, 1], [-20, 20]);
    const yContent = useTransform(scrollProgress, [0, 1], [-50, 50]);
    const opacity = useTransform(
        scrollProgress,
        [0, 0.25, 0.75, 1],
        [0, 1, 1, 0]
    );

    // Animation for the ArrowDown icon
    const arrowAnimation = {
        y: [0, 10, 0], // Move down by 10px and back up
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    };

    const scrollToNextSection = () => {
        if (nextSectionRef?.current) {
            nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div ref={ref} className="relative container max-w-[1280px] mx-auto">
            <div className="min-h-screen flex flex-col justify-center">
                <motion.div style={{ y: yHeader, opacity }}>
                    {header}
                </motion.div>
                <motion.div style={{ y: yContent, opacity }}>
                    {children}
                </motion.div>
            </div>

            {showArrow && nextSectionRef && (
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    animate={arrowAnimation}
                    onClick={scrollToNextSection}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            scrollToNextSection();
                        }
                    }}
                >
                    <ArrowDown
                        size={32}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    />
                </motion.div>
            )}
        </div>
    );
};

export default ParallaxSection;
