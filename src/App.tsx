import { ThemeProvider } from "@/components/theme/theme-provider";

import Home from "@/components/home-page";
import Contact from "@/components/contact/contact-page";

import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <TooltipProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;
