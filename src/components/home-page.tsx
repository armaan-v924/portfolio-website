import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxSection from "./animated-section";
import NavBar from "./navigation-bar";
import { Button } from "./ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function Home() {
    // Scroll tracking for the hero section
    const { scrollY } = useScroll();

    // Parallax and fade for hero section
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -200]);
    const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);
    const opacity2 = useTransform(scrollY, [0, 300], [1, 0]);

    const arrowAnimation = {
        y: [0, 10, 0], // Move down by 10px and back up
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    };

    const navigate = useNavigate();

    // Reference to the next section
    const nextSectionRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    // Function to handle click on the ArrowDown icon
    const scrollToNextSection = () => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="container relative max-w-[1280px] mx-auto">
                <NavBar
                    currentPage="Home"
                    className="absolute top-0 left-0 right-0 z-10"
                />
                <div className="hero relative min-h-screen flex flex-col justify-center overflow-hidden">
                    <motion.h1
                        style={{ y: y1, opacity: opacity1 }}
                        className="hero-title text-left pb-[1.875rem] font-black text-7xl tracking-wide"
                    >
                        Hi, I'm Armaan
                    </motion.h1>
                    <motion.div
                        style={{ y: y2, opacity: opacity2 }}
                        className="hero-subtitle text-left text-lg space-y-10"
                    >
                        <p>
                            I'm a new grad software engineer focused on AI/ML,
                            passionate about solving complex problems and
                            creating impactful software solutions.
                        </p>
                        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row-reverse md:space-x-reverse md:space-x-2 md:items-center">
                            <Button
                                className="group"
                                onClick={() => navigate("/contact")}
                            >
                                Let's get in touch
                                <ArrowRight
                                    size={16}
                                    className="ml-2 group-hover:-rotate-45 transition-transform"
                                />
                            </Button>
                            <Button
                                variant={"secondary"}
                                onClick={() => navigate("/resume")}
                                className="group"
                            >
                                Check out my Resume
                                <ArrowRight
                                    size={16}
                                    className="ml-2 group-hover:-rotate-45 transition-transform"
                                />
                            </Button>
                        </div>
                    </motion.div>
                    {/* ArrowDown Icon */}
                    <motion.div
                        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
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
                </div>
            </div>

            {/* Section 1 */}
            <div ref={nextSectionRef}>
                <ParallaxSection
                    header={
                        <h2 className="section-title text-left font-bold text-5xl tracking-wide">
                            About Me
                        </h2>
                    }
                    showArrow
                    nextSectionRef={projectsRef}
                >
                    <p className="section-subtitle text-left text-lg mt-4">
                        I'm currently a student at UT Austin studying Electrical
                        and Computer Engineering, on the software engineering
                        track, and I'm projected to graduate in May 2025.
                    </p>
                    <p className="section-subtitle text-left text-lg mt-2">
                        I have a passion for leveraging AI/ML to create
                        solutions that make a difference. From full-stack
                        development to working with data-driven projects, I’m
                        always excited to learn and grow.
                    </p>
                    <p className="section-subtitle text-left text-lg mt-2">
                        Currently, I'm working at Alation, a data catalog and
                        governance company, as a Software Engineering Intern on
                        the People team, working on a full-stack application
                        helping managers make data-driven decisions about
                        employee compensation.
                    </p>
                </ParallaxSection>
            </div>

            {/* Section 2 */}
            <div ref={projectsRef}>
                <ParallaxSection
                    header={
                        <h2 className="section-title text-left font-bold text-5xl tracking-wide">
                            Projects
                        </h2>
                    }
                >
                    <p className="section-subtitle text-left text-lg mt-4 mb-4">
                        I've worked on a variety of projects, from full-stack
                        web applications to AI/ML models. Here are a few of my
                        favorites:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="flex flex-col">
                            <CardHeader className="text-left">
                                <CardTitle>
                                    Are You Social Distancing?
                                </CardTitle>
                                <CardDescription>
                                    A machine learning model that detects
                                    whether faces in provided media are wearing
                                    masks.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow text-left">
                                <h3 className="font-semibold">
                                    Technologies Used
                                </h3>
                                <p className="font-light">
                                    Python, PyTorch, OpenCV
                                </p>
                            </CardContent>
                            <CardFooter className={"flex flex-row-reverse"}>
                                <Button
                                    onClick={() =>
                                        window.open(
                                            "https://github.com/armaan-v924/are-you-social-distancing"
                                        )
                                    }
                                >
                                    <GitHubLogoIcon className="mr-2" />
                                    View Source Code
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col">
                            <CardHeader className="text-left">
                                <CardTitle>Resource Manager</CardTitle>
                                <CardDescription>
                                    A full-stack web application that manages
                                    and allocates shared resources among project
                                    teams.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow text-left">
                                <h3 className="font-semibold">
                                    Technologies Used
                                </h3>
                                <p className="font-light">
                                    React, TypeScript, Python, Flask, MongoDB
                                </p>
                            </CardContent>
                            <CardFooter
                                className={
                                    "flex flex-row-reverse justify-between"
                                }
                            >
                                <Button
                                    className="group"
                                    onClick={() =>
                                        window.open(
                                            "https://software-project.armaanv.com/"
                                        )
                                    }
                                >
                                    See the Project in Action
                                    <ArrowRight
                                        size={16}
                                        className="ml-2 transition-transform group-hover:-rotate-45"
                                    />
                                </Button>
                                <Button
                                    variant={"secondary"}
                                    onClick={() =>
                                        window.open(
                                            "https://github.com/arnav2503/ece461L_Group5"
                                        )
                                    }
                                >
                                    <GitHubLogoIcon className="mr-2" />
                                    View Source Code
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col text-left">
                            <CardHeader className="flex-grow-0">
                                <CardTitle>Personal Website</CardTitle>
                                <CardDescription>
                                    This website! A portfolio to showcase my
                                    work and experience.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <h3 className="font-semibold">
                                    Technologies Used
                                </h3>
                                <p className="font-light">
                                    React, TypeScript, Framer Motion
                                </p>
                            </CardContent>
                            <CardFooter
                                className={
                                    "flex flex-row-reverse justify-between"
                                }
                            >
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Button className="group">
                                            See the Website in Action
                                            <ArrowRight
                                                size={16}
                                                className="ml-2 transition-transform group-hover:-rotate-45"
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        You're already here! Feel free to
                                        explore.
                                    </TooltipContent>
                                </Tooltip>
                                <Button
                                    variant={"secondary"}
                                    onClick={() =>
                                        window.open(
                                            "https://github.com/armaan-v924/portfolio-website"
                                        )
                                    }
                                >
                                    <GitHubLogoIcon className="mr-2" />
                                    View Source Code
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </ParallaxSection>
            </div>
            {}
        </>
    );
}

export default Home;
