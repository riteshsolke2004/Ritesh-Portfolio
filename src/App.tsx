import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./components/About").then(m => ({ default: m.About || m.default })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact || m.default })));
const Hero = lazy(() => import("./components/Hero").then(m => ({ default: m.Hero || m.default })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer || m.default })));
const Education = lazy(() => import("./components/Education").then(m => ({ default: m.Education || m.default })));
const Achievements = lazy(() => import("./components/Achievements").then(m => ({ default: m.Achievements || m.default })));

const queryClient = new QueryClient();
  
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Standalone section routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/education" element={<Education />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

