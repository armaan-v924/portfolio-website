import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./animated-section";
import NavBar from "./navigation-bar";

function Home() {
    // Scroll tracking for the hero section
    const { scrollY } = useScroll();

    // Parallax and fade for hero section
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -200]);
    const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);
    const opacity2 = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <>
            <div className="container relative max-w-[1280px] mx-auto">
                <NavBar
                    currentPage="Home"
                    className="absolute top-0 left-0 right-0 z-10"
                />
                <div className="hero min-h-screen flex flex-col justify-center overflow-hidden">
                    <motion.h1
                        style={{ y: y1, opacity: opacity1 }}
                        className="hero-title text-left pb-[1.875rem] font-black text-7xl tracking-wide"
                    >
                        Hi, I'm Armaan
                    </motion.h1>
                    <motion.p
                        style={{ y: y2, opacity: opacity2 }}
                        className="hero-subtitle text-left text-lg"
                    >
                        I'm a new grad software engineer focused on AI/ML,
                        passionate about solving complex problems and creating
                        impactful software solutions.
                    </motion.p>
                </div>

                {/* Section 1 */}

                <AnimatedSection>
                    <h2 className="section-title text-left font-bold text-5xl tracking-wide">
                        About Me
                    </h2>
                    <p className="section-subtitle text-left text-lg mt-4">
                        I have a passion for leveraging AI/ML to create
                        solutions that make a difference. From full-stack
                        development to working with data-driven projects, I’m
                        always excited to learn and grow.
                    </p>
                </AnimatedSection>

                {/* You can add more sections similarly */}
            </div>
        </>
    );
}

export default Home;
