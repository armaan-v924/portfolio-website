import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxSection from "./animated-section";
import NavBar from "./navigation-bar";
import { Button } from "./ui/button";
import { ArrowDown, ArrowRight, Code, Gauge, Globe, ScanFace } from "lucide-react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// @ts-expect-error -- svg module typing handled by vite-plugin-svgr
import AlationLogo from "@/images/alation.svg?react";
// @ts-expect-error -- svg module typing handled by vite-plugin-svgr
import AppleLogo from "@/images/apple.svg?react";
// @ts-expect-error -- svg module typing handled by vite-plugin-svgr
import UTSeal from "@/images/ut_austin.svg?react";
// @ts-expect-error -- svg module typing handled by vite-plugin-svgr
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
            ease: [0.42, 0, 0.58, 1] as const,
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
                        className="hero-title text-left pb-[1.5rem] font-semibold text-5xl tracking-tight"
                    >
                        Hi, I'm Armaan
                    </motion.h1>
                    <motion.div
                        style={{ y: y2, opacity: opacity2 }}
                        className="hero-subtitle text-left text-lg space-y-10"
                    >
                        <p>
                            I'm a Software Engineer passionate about building
                            scalable data systems and applying machine learning
                            in real-world, high-impact products.
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
                    fullHeight
                    header={
                        <h2 className="section-title text-left font-semibold text-3xl tracking-tight">
                            About Me
                        </h2>
                    }
                    showArrow
                    nextSectionRef={experienceRef}
                >
                    <p className="section-subtitle text-left text-lg mt-4">
                        I’m a Software Engineer at Vectra AI, where I build and
                        maintain scalable, distributed data systems that power
                        AI-driven cybersecurity. My work focuses on developing
                        high-performance data pipelines and real-time processing
                        frameworks deployed across global infrastructure.
                    </p>
                    <p className="section-subtitle text-left text-lg mt-2">
                        I graduated from the University of Texas at Austin with
                        a B.S. in Electrical and Computer Engineering, where I
                        explored applied machine learning, systems programming,
                        and compiler design. I’m passionate about solving
                        complex engineering problems—especially those at the
                        intersection of data, infrastructure, and intelligent
                        systems—and continuously seek opportunities to build
                        impactful, production-ready software.
                    </p>
                </ParallaxSection>
            </div>

            <div ref={experienceRef}>
                <ParallaxSection
                    header={
                        <h2 className="section-title text-left font-semibold text-3xl tracking-tight">
                            Experience
                        </h2>
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
                        <Card className="flex flex-col gap-2">
                            <CardHeader className="flex-grow-0 pb-3">
                                <CardTitle className="flex min-h-[72px] items-center justify-between gap-4">
                                    <VectraLogo className="inline-block w-40 h-10" />
                                    <div className="text-right">
                                        <div className="text-base font-medium">
                                            Vectra AI
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Austin, TX
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[3rem]">
                                    <h3 className="text-base font-medium">
                                        Software Engineer
                                    </h3>
                                    <div className="text-sm text-muted-foreground">
                                        Since June 2025
                                    </div>
                                </div>
                                <div className="text-start">
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground/90">
                                        <li>
                                            Improve and maintain JetStream,
                                            Vectra AI’s internal real-time data
                                            processing and execution framework
                                            built in Python and deployed on
                                            Kubernetes, supporting
                                            fault-tolerant, scalable processing
                                            of millions of data points across
                                            six global regions with cross-region
                                            replication and synchronization.
                                        </li>
                                        <li>
                                            Developing a new Snapshot ETL
                                            pipeline within JetStream to
                                            consolidate legacy data collection
                                            and processing systems,
                                            incorporating Delta tables on S3 and
                                            SCD Type 2 logic to improve compute
                                            efficiency and streamline data
                                            access for detection algorithms
                                            running every 15 minutes.
                                        </li>
                                        <li>
                                            Ensure system reliability as part of
                                            the on-call rotation, proactively
                                            identifying and mitigating a
                                            large-scale data backlog that
                                            threatened SLOs. Prevented downtime
                                            and preserved detection accuracy for
                                            customer-facing systems by triaging
                                            and resolving issues using
                                            OpenSearch, Grafana/Prometheus, and
                                            PagerDuty.
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 text-sm flex flex-col items-start gap-1">
                                <div className="minor-heading">Tech Stack</div>
                                <p className="text-muted-foreground/90">
                                    Python, Docker, Kubernetes, AWS, Grafana,
                                    PagerDuty, JIRA
                                </p>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex min-h-[72px] items-center justify-between gap-4">
                                    <AlationLogo
                                        className="inline-block h-8 w-auto fill-alation"
                                        preserveAspectRatio="xMinYMid meet"
                                    />
                                    <div className="text-right">
                                        <div className="text-base font-medium">
                                            Alation
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Remote
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[3rem]">
                                    <h3 className="text-base font-medium">
                                        Total Rewards Intern, Software Engineering
                                    </h3>
                                    <div className="text-sm text-muted-foreground">
                                        February 2024 - December 2024
                                    </div>
                                </div>
                                <div className="text-start">
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground/90">
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
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 text-sm flex flex-col items-start gap-1">
                                <div className="minor-heading">Tech Stack</div>
                                <p className="text-muted-foreground/90">
                                    React, TypeScript, Flask, Python, Pandas,
                                    Okta, SentenceTransformers
                                </p>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2">
                            <CardHeader className="flex-grow-0 pb-3">
                                <CardTitle className="flex min-h-[72px] items-center justify-between gap-4">
                                    <AppleLogo
                                        className="inline-block h-10 w-auto fill-apple"
                                        preserveAspectRatio="xMinYMid meet"
                                    />
                                    <div className="text-right">
                                        <div className="text-base font-medium">
                                            Apple
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Remote
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[3rem]">
                                    <h3 className="text-base font-medium">
                                        T1 iOS Technical Support Advisor, AppleCare
                                    </h3>
                                    <div className="text-sm text-muted-foreground">
                                        June 2022 - June 2023
                                    </div>
                                </div>
                                <div className="text-start">
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground/90">
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
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 text-sm flex flex-col items-start gap-1">
                                <div className="minor-heading">Skills Used</div>
                                <p className="text-muted-foreground/90">
                                    Customer Service, Technical Support,
                                    Troubleshooting, Documentation.
                                </p>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2">
                            <CardHeader className="flex-grow-0 pb-3">
                                <CardTitle className="flex min-h-[72px] items-center justify-between gap-4">
                                    <img
                                        src="newday.png"
                                        alt="NewDay USA"
                                        className="inline-block h-14"
                                    />
                                    <div className="text-right">
                                        <div className="text-base font-medium">
                                            NewDay USA
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Fulton, MD
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[3rem]">
                                    <h3 className="text-base font-medium">
                                        Intranet Developer Intern, IT
                                    </h3>
                                    <div className="text-sm text-muted-foreground">
                                        June 2020 - August 2020
                                    </div>
                                </div>
                                <div className="text-start">
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground/90">
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
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 text-sm flex flex-col items-start gap-1">
                                <div className="minor-heading">Skills Used</div>
                                <p className="text-muted-foreground/90">
                                    HTML, CSS, JavaScript, SharePoint
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </ParallaxSection>
            </div>

            <div ref={eduRef}>
                <ParallaxSection
                    header={
                        <h2 className="section-title text-left font-semibold text-3xl tracking-tight">
                            Education
                        </h2>
                    }
                >
                    <Card className="mt-4 flex flex-col gap-2">
                        <CardHeader className="flex-grow-0 pb-3">
                            <CardTitle className="flex min-h-[72px] items-center justify-between gap-4">
                                <UTSeal className="inline-block h-14 w-auto" />
                                <div className="text-right">
                                    <div className="text-base font-medium">
                                        University of Texas at Austin
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Austin, TX
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                            <div className="border-t border-border/40" />
                            <div className="text-left">
                                <h3 className="text-base font-medium">
                                    B.S., Electrical and Computer Engineering
                                </h3>
                                <div className="text-sm text-muted-foreground">
                                    May 2025
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </ParallaxSection>
            </div>

            <div ref={projectsRef}>
                <ParallaxSection
                    header={
                        <h2 className="section-title text-left font-semibold text-3xl tracking-tight">
                            Projects
                        </h2>
                    }
                >
                    <p className="section-subtitle text-left text-lg mt-4 mb-4">
                        I've worked on a variety of projects, from full-stack
                        web applications to AI/ML models. Here are a few of my
                        favorites:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
                        <Card className="flex flex-col gap-2 h-full">
                            <CardHeader className="flex-grow-0 pb-3 space-y-2 text-left">
                                <div className="flex items-center justify-between gap-4 text-left">
                                    <CardTitle className="text-base font-medium">
                                        Clang Static Analyzer Study
                                    </CardTitle>
                                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/20">
                                        <Gauge className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <p className="text-left text-sm text-muted-foreground/90 min-h-[3.75rem] leading-relaxed">
                                    Built a report on the performance of the
                                    Clang Static Analyzer, specifically in taint
                                    analysis, on a set of open source C/C++
                                    programs, including OpenSSL, Redis, and
                                    Postgres.
                                </p>
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[2.25rem]">
                                    <h3 className="minor-heading">
                                        Tech Stack
                                    </h3>
                                    <p className="text-sm text-muted-foreground/90">
                                        C, C++, Clang, LLVM
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 flex flex-col items-start gap-2">
                                <div className="minor-heading">Links</div>
                                <div className="flex flex-wrap gap-2">
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
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2 h-full">
                            <CardHeader className="flex-grow-0 pb-3 space-y-2 text-left">
                                <div className="flex items-center justify-between gap-4 text-left">
                                    <CardTitle className="text-base font-medium">
                                        Are You Social Distancing?
                                    </CardTitle>
                                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/20">
                                        <ScanFace className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <p className="text-left text-sm text-muted-foreground/90 min-h-[3.75rem] leading-relaxed">
                                    A machine learning model that detects
                                    whether faces in provided media are wearing
                                    masks.
                                </p>
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[2.25rem]">
                                    <h3 className="minor-heading">
                                        Tech Stack
                                    </h3>
                                    <p className="text-sm text-muted-foreground/90">
                                        Python, PyTorch, OpenCV
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 flex flex-col items-start gap-2">
                                <div className="minor-heading">Links</div>
                                <div className="flex flex-wrap gap-2">
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
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2 h-full">
                            <CardHeader className="flex-grow-0 pb-3 space-y-2 text-left">
                                <div className="flex items-center justify-between gap-4 text-left">
                                    <CardTitle className="text-base font-medium">
                                        Resource Manager
                                    </CardTitle>
                                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/20">
                                        <Code className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <p className="text-left text-sm text-muted-foreground/90 min-h-[3.75rem] leading-relaxed">
                                    A full-stack web application that manages
                                    and allocates shared resources among project
                                    teams.
                                </p>
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[2.25rem]">
                                    <h3 className="minor-heading">
                                        Tech Stack
                                    </h3>
                                    <p className="text-sm text-muted-foreground/90">
                                        React, TypeScript, Python, Flask, MongoDB
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 flex flex-col items-start gap-2">
                                <div className="minor-heading">Links</div>
                                <div className="flex flex-wrap gap-2">
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
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col gap-2 h-full">
                            <CardHeader className="flex-grow-0 pb-3 space-y-2 text-left">
                                <div className="flex items-center justify-between gap-4 text-left">
                                    <CardTitle className="text-base font-medium">
                                        Personal Website
                                    </CardTitle>
                                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card/20">
                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow pt-0 space-y-3 text-sm leading-relaxed">
                                <div className="border-t border-border/40" />
                                <p className="text-left text-sm text-muted-foreground/90 min-h-[3.75rem] leading-relaxed">
                                    This website! A portfolio to showcase my
                                    work and experience.
                                </p>
                                <div className="border-t border-border/40" />
                                <div className="text-left min-h-[2.25rem]">
                                    <h3 className="minor-heading">
                                        Tech Stack
                                    </h3>
                                    <p className="text-sm text-muted-foreground/90">
                                        React, TypeScript, Framer Motion
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4 border-t border-border/40 flex flex-col items-start gap-2">
                                <div className="minor-heading">Links</div>
                                <div className="flex flex-wrap gap-2">
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
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </ParallaxSection>
            </div>

        </>
    );
}

export default Home;
