import { ThemeProvider } from "@/components/theme/theme-provider";

import Home from "@/components/home-page";
import About from "@/components/about/about-page";
import Contact from "@/components/contact/contact-page";

import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
