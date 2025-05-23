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
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

//@ts-ignore
import AlationLogo from "@/images/alation.svg?react";
//@ts-ignore
import AppleLogo from "@/images/apple.svg?react";
//@ts-ignore
import UTSeal from "@/images/ut_austin.svg?react";
//@ts-ignore
import VectraLogo from "@/images/vectra.svg?react";

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
    const experienceRef = useRef<HTMLDivElement>(null);
    const eduRef = useRef<HTMLDivElement>(null);

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
                        <div className="flex flex-col md:flex-row md:justify-between space-y-2">
                            <div className="flex flex-row space-x-1 md:items-center">
                                <Button
                                    variant={"outline"}
                                    className="w-[50%]"
                                    onClick={() =>
                                        window.open(
                                            "https://github.com/armaan-v924"
                                        )
                                    }
                                >
                                    <GitHubLogoIcon className="" />
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className="w-[50%]"
                                    onClick={() =>
                                        window.open(
                                            "https://www.linkedin.com/in/armaan-vakharia/"
                                        )
                                    }
                                >
                                    <LinkedInLogoIcon className="" />
                                </Button>
                            </div>
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
                                    onClick={() => window.open("/resume.pdf")}
                                    className="group"
                                >
                                    Check out my Resume
                                    <ArrowRight
                                        size={16}
                                        className="ml-2 group-hover:-rotate-45 transition-transform"
                                    />
                                </Button>
                            </div>
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
                    nextSectionRef={eduRef}
                >
                    <p className="section-subtitle text-left text-lg mt-4">
                        I'm a software engineer who recently graduated from the
                        University of Texas at Austin with my B.S. in Electrical
                        and Computer Engineering.
                    </p>
                    <p className="section-subtitle text-left text-lg mt-2">
                        I have a passion for leveraging AI/ML to create
                        solutions that make a difference. From full-stack
                        development to working with data-driven projects, I’m
                        always excited to learn and grow.
                    </p>
                    <p className="section-subtitle text-left text-lg mt-2">
                        I've recently accepted an offer to join Vectra AI as a
                        full-time software engineer, where I will be working on
                        building and improving their AI-driven cybersecurity
                        solutions.
                    </p>
                </ParallaxSection>
            </div>

            <div ref={eduRef}>
                <ParallaxSection
                    showArrow
                    nextSectionRef={projectsRef}
                    header={
                        <h2 className="section-title text-left font-bold text-5xl tracking-wide">
                            Education
                        </h2>
                    }
                >
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>
                                <UTSeal className="inline-block size-60 m-4" />
                            </CardTitle>
                            <h3 className="font-bold">
                                University of Texas at Austin
                            </h3>
                            <CardDescription>
                                B.S., Electrical and Computer Engineering
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-light">
                                GPA:&nbsp;
                                <span className="font-semibold">3.63/4.0</span>
                            </p>
                            <p className="font-light">
                                Graduation Date:&nbsp;
                                <span className="font-semibold">May 2025</span>
                            </p>
                        </CardContent>
                        <CardFooter>
                            <p className="font-semibold">
                                My favorite classes:&nbsp;
                            </p>
                            <p className="font-light">
                                Algorithms, Computer Architecture, Software
                                Engineering, Embedded Systems, Digital Logic
                                Design, Operating Systems, Data Science
                            </p>
                        </CardFooter>
                    </Card>
                </ParallaxSection>
            </div>

            <div ref={projectsRef}>
                <ParallaxSection
                    showArrow
                    nextSectionRef={experienceRef}
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
                                    Critical Performance Analysis of the Clang
                                    Static Analyzer
                                </CardTitle>
                                <CardDescription>
                                    Built a report on the performance of the
                                    Clang Static Analyzer, specifically in taint
                                    analysis, on a set of open source C/C++
                                    programs, including OpenSSL, Redis, and
                                    Postgres.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow text-left">
                                <h3 className="font-semibold">
                                    Technologies Used
                                </h3>
                                <p className="font-light">
                                    C, C++, Clang, LLVM
                                </p>
                            </CardContent>
                            <CardFooter className={"flex flex-row-reverse"}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className="group disabled:pointer-events-auto"
                                            disabled
                                        >
                                            More Information
                                            <ArrowRight
                                                size={16}
                                                className="ml-2 transition-transform group-hover:-rotate-45"
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Due to agreements with our sponsor, I
                                        can't share the report publicly. Feel
                                        free to reach out to me if you're
                                        interested in learning more about it.
                                    </TooltipContent>
                                </Tooltip>
                            </CardFooter>
                        </Card>
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
                                        <Button
                                            className="group disabled:pointer-events-auto"
                                            disabled
                                        >
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

            <div ref={experienceRef}>
                <ParallaxSection
                    header={
                        <h2 className="section-title text-left font-bold text-5xl tracking-wide">
                            My Professional Experience
                        </h2>
                    }
                >
                    <div className="grid grid-cols-1 gap-4 mt-8">
                        <Card className="flex flex-col">
                            <CardHeader className="flex-grow-0">
                                <CardTitle className="h-24">
                                    <VectraLogo className="inline-block mt-4 w-56 h-14" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <h3 className="font-semibold">
                                    Software Engineer
                                </h3>
                                <p className="font-light mb-3">
                                    Vectra AI | Starting June 2025 | Austin, TX
                                </p>
                                <div className="text-start">
                                    <ul className="font-light list-outside space-y-2">
                                        <li>I'll let you know when I start!</li>
                                    </ul>
                                </div>
                            </CardContent>
                            {/* <CardFooter className="flex-grow-0">
                                <span className="mr-2">Skills Used</span>
                                <p className="font-light"></p>
                            </CardFooter> */}
                        </Card>
                        <Card className="flex flex-col">
                            <CardHeader className="">
                                <CardTitle className="h-24">
                                    <AlationLogo className="inline-block w-56 fill-alation" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h3 className="font-semibold">
                                    Total Rewards Intern, Software Engineering
                                </h3>
                                <p className="font-light mb-3">
                                    Alation | February 2024 - December 2024 |
                                    Remote
                                </p>
                                <div className="text-start">
                                    <ul className="font-light list-outside space-y-2">
                                        <li>
                                            Spearheaded the development of a
                                            proprietary internal tool at Alation
                                            designed to optimize the comparison
                                            of market data for employee
                                            compensation, ensuring competitive
                                            and equitable salary and share grant
                                            decisions
                                        </li>
                                        <li>
                                            Solely responsible for the
                                            integration and analysis of complex
                                            datasets to accurately assess
                                            employee performance percentiles,
                                            directly influencing equity
                                            distribution and incentivization
                                            strategies
                                        </li>
                                        <li>
                                            Utilized advanced programming and
                                            data analysis skills to create a
                                            robust solution that automates the
                                            evaluation of compensation
                                            benchmarks, streamlining the
                                            decision-making process for to
                                            allocation of employee shares
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <span className="mr-2">Tech Stack</span>
                                <p className="font-light">
                                    React, TypeScript, Flask, Python, Pandas,
                                    Okta, SentenceTransformers
                                </p>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col">
                            <CardHeader className="flex-grow-0">
                                <CardTitle className="h-24">
                                    <AppleLogo className="inline-block mt-4 w-56 h-14 fill-apple" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <h3 className="font-semibold">
                                    T1 iOS Technical Support Advisor, AppleCare
                                </h3>
                                <p className="font-light mb-3">
                                    Apple | June 2022 - June 2023 | Remote
                                </p>
                                <div className="text-start">
                                    <ul className="font-light list-outside space-y-2">
                                        <li>
                                            Delivered exceptional technical
                                            support for Apple’s suite of mobile
                                            devices, earning a 97% customer
                                            satisfaction rating
                                        </li>
                                        <li>
                                            Managed high-volume call
                                            environments, skillfully addressing
                                            over 350 customer issues per quarter
                                        </li>
                                        <li>
                                            Documented interactions with detail
                                            and accuracy, providing valuable
                                            data for product improvement
                                            initiatives
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-grow-0">
                                <span className="mr-2">Skills Used</span>
                                <p className="font-light">
                                    Customer Service, Technical Support,
                                    Troubleshooting, Documentation.
                                </p>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col">
                            <CardHeader className="flex-grow-0">
                                <CardTitle className="h-24">
                                    <img
                                        src="newday.png"
                                        alt="NewDay USA"
                                        className="inline-block h-24"
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <h3 className="font-semibold">
                                    Intranet Developer Intern, IT
                                </h3>
                                <p className="font-light mb-3">
                                    NewDay USA | June 2020 - August 2020 |
                                    Fulton, MD
                                </p>
                                <div className="text-start">
                                    <ul className="font-light list-outside space-y-2">
                                        <li>
                                            Led the development of a new
                                            intranet portal, improving internal
                                            communication for over 600
                                            employees.
                                        </li>
                                        <li>
                                            Orchestrated department-specific
                                            training sessions, enhancing the
                                            company’s content management
                                            capabilities.
                                        </li>
                                        <li>
                                            Designed and implemented custom web
                                            elements tailored to departmental
                                            needs, utilizing HTML and CSS.
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-grow-0">
                                <span className="mr-2">Skills Used</span>
                                <p className="font-light">
                                    HTML, CSS, JavaScript, SharePoint
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </ParallaxSection>
            </div>
        </>
    );
}

export default Home;
