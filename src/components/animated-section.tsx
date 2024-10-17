import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    delay = 0,
    duration = 0.8,
}) => {
    // Reference for tracking in-view state
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: false,
    });

    return (
        <motion.div
            ref={sectionRef}
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration, delay }}
            className="min-h-[50vh] max-h-[100vh] flex flex-col justify-center overflow-hidden mt-16"
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
