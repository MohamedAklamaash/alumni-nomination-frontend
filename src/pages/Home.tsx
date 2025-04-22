import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import FormerChiefGuest from "@/components/FormerChiefGuest";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/Gallery";
import { useChiefGuestContext } from "@/hooks/useChiefGuest";
import chief_guest_24 from "@/constants/chiefguest2024";
import chief_guest_23 from "@/constants/chiefguest2023";
import { assets } from "@/assets/assets";
import { Menu } from "lucide-react";
import Updates from "@/components/Updates";

const pages: { title: string; link: string }[] = [
  { title: "Distinguished Alumni", link: "/distinguishedalumni" },
  { title: "About College", link: "/about-college" },
];
const toggleOptions: string[] = ["2024", "2023"];

const FoundationLanding = () => {
  const navigate = useNavigate();
  const glowControls = useAnimation();

  const invitationRef = useRef<HTMLDivElement | null>(null);
  const criteriaRef = useRef<HTMLDivElement | null>(null);
  const winnersRef = useRef<HTMLDivElement | null>(null);

  const [currentYear, setCurrentYear] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const chiefguest = useChiefGuestContext();

  useEffect(() => {
    chiefguest.setGuest(currentYear === 0 ? chief_guest_24 : chief_guest_23);
  }, [currentYear, chiefguest]);

  useEffect(() => {
    glowControls.start({
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.6, 0.4],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [glowControls]);

  const handleYearToggle = (index: number) => {
    setCurrentYear(index);
    invitationRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNavClick = (link: string) => {
    navigate(link);
    setIsMenuOpen(false);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);              // change “50” to whatever offset you like :contentReference[oaicite:0]{index=0}
    };
    window.addEventListener("scroll", handleScroll);    // listen for scroll :contentReference[oaicite:1]{index=1}
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 relative scroll-smooth">
      {/* Background Pulse */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      {/* Header */}
      <header
        className={`
          sticky top-0 z-50 p-6 flex justify-between items-center
          backdrop-blur-md transition-colors duration-300 shadow-lg
          ${isScrolled
            ? "bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900"   // blue glass when scrolled
            : ""         // original glass at top
          }
        `}
      >        <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-white tracking-wide drop-shadow-md"
      >
          <div className="text-2xl">
            <span className="text-indigo-300">Foundation</span> Day 2025
          </div>
        </motion.h1>

        <nav className="flex items-center">
          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden text-white hover:bg-gray-500 cursor-pointer rounded-md p-1 z-50"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <Menu size={36} />
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-36 w-48 bg-white backdrop-blur-lg border rounded-xl shadow-xl z-50">
              {pages.map((page, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNavClick(page.link)}
                >
                  {page.title}
                </motion.div>
              ))}
              <div className="border-t my-2" />
              {toggleOptions.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="w-full text-left px-4 py-2 text-indigo-600 border-b hover:bg-gray-50"
                  onClick={() => handleYearToggle(idx)}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Desktop Links + Year Toggles */}
          <div className="hidden lg:flex items-center space-x-4">
            {pages.map((page, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="p-2 rounded-lg bg-indigo-700/80 backdrop-blur-sm text-white cursor-pointer"
                onClick={() => handleNavClick(page.link)}
              >
                {page.title}
              </motion.div>
            ))}
            {toggleOptions.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="p-2 rounded-lg bg-indigo-700/80 backdrop-blur-sm text-white cursor-pointer"
                onClick={() => handleYearToggle(idx)}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl font-bold text-white leading-tight drop-shadow-md"
            >
              Foundation Day 2025
              <br />
              <span className="text-transparent text-4xl bg-clip-text bg-gradient-to-r from-indigo-300 to-gray-400">
                PSG College of Technology
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-gray-300"
            >
              Rooted in Legacy, Rising with Vision.
            </motion.p>
          </div>
        </div>
      </main>
      <Updates />

      {/* Year Toggle Buttons (below hero) */}
      <div className="flex relative z-10 bg-white gap-5 p-5 justify-center">
        {toggleOptions.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03, boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.12)", transition: { duration: 0.2 } }}
            className={`z-1000 cursor-pointer text-lg rounded-full py-3 px-8 border ${idx === currentYear ? 'bg-indigo-600 text-white ' : ''}`} onClick={() => handleYearToggle(idx)}
          >
            {opt}
          </motion.button>
        ))}
      </div>
      {/* Invitation Section */}
      <section ref={invitationRef} id="invitation" className="bg-white py-10">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-4xl font-bold p-6">Invitation</h2>
          <img
            src={currentYear === 0 ? assets.invitation_24 : assets.invitation_23}
            alt="Invitation"
            className="w-full max-w-4xl"
          />
        </div>
      </section>
      {/* Chief Guest Section */}
      <section ref={criteriaRef} id="chiefguest" className="min-h-screen bg-platinum-500">
        <FormerChiefGuest />
      </section>

      {/* Highlights Video */}
      <section className=" relative z-10 bg-white py-10">
        <div className="flex flex-col items-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Highlights Video</h2>
          <div className="w-full max-w-4xl aspect-video shadow-lg rounded-xl overflow-hidden">
            <iframe
              src={
                currentYear === 0
                  ? "https://www.youtube.com/embed/oGKBokED8qM"
                  : "https://www.youtube.com/embed/ZISPz-Ll-vo"
              }
              title="Founders Day Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section ref={winnersRef} id="past-winners">
        <PhotoGallery />
      </section>

      <Footer />
    </div>
  );
};

export default FoundationLanding;
