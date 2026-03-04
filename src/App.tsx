import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";

const Home = lazy(() => import("@/components/home-page"));
const Contact = lazy(() => import("@/components/contact/contact-page"));

function AppFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[320px] rounded-2xl border border-border/40 bg-transparent shadow-2xl backdrop-blur px-6 py-8 text-center">
                <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Warming Up
                </p>
                <p className="mt-2 text-lg font-semibold">
                    Loading the experience
                </p>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <TooltipProvider>
                <BrowserRouter>
                    <Suspense fallback={<AppFallback />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;
