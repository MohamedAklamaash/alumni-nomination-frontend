import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import CriteriaSection from "@/components/Criteria";
import PastWinners from "@/components/PastWinners";

const Landing = () => {
  const glowControls = useAnimation();
  const criteriaRef = useRef<HTMLElement>(null);
  const winnersRef = useRef<HTMLElement>(null);

  useEffect(() => {
    glowControls.start({
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.6, 0.4],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [glowControls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 overflow-hidden relative scroll-smooth">
      <div className="absolute top-20 left-20 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      <header className="relative z-10 p-6 flex justify-between items-center top-0">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-white tracking-wide drop-shadow-md"
        >
          <div className="text-2xl">
            {" "}
            <span className="text-indigo-300">Distinguished</span> Alumni Awards
          </div>
        </motion.h1>
        <nav className="space-x-6 sm:flex hidden items-center">
          <span
            onClick={() =>
              criteriaRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-white font-semibold hover:text-indigo-300 transition-all cursor-pointer"
          >
            Criteria
          </span>
          <span
            onClick={() =>
              winnersRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-white font-semibold hover:text-indigo-300 transition-all cursor-pointer"
          >
            Past Winners
          </span>
          <button
            onClick={() => alert("Nominate Now")}
            className="px-4 py-1 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-full shadow-md transition-all"
          >Login</button>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-8xl">
          {/* Left Content */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl font-bold text-white leading-tight drop-shadow-md"
            >
              Distinguished Alumni Award
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
              Recognizing alumni who have excelled in their fields.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(147, 197, 253, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-full shadow-md transition-all"
              onClick={() =>
                criteriaRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Nominate Now
            </motion.button>
          </div>
        </div>
      </main>
      <section
        id="criteria"
        ref={criteriaRef}
        className="min-h-screen bg-platinum-500"
      >
        <CriteriaSection />
      </section>

      <section id="past-winners" ref={winnersRef}>
        <PastWinners />
      </section>

      <footer className="relative z-10 p-6 text-center bg-platinum-500">
        <p>© 2025 PSG College of Technology. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
