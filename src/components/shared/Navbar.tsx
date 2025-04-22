import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = [
  { title: "Distinguished Alumni", link: "/distinguishedalumni" },
  { title: "About College",       link: "/about-college"       },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (link: string) => {
    navigate(link);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 text-white z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Foundation Day 2025
        </motion.h1>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <motion.div
              key={page.title}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 cursor-pointer"
              onClick={() => handleNavClick(page.link)}
            >
              {page.title}
            </motion.div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700"
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          <Menu size={24} />
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
            {pages.map((page) => (
              <div
                key={page.title}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavClick(page.link)}
              >
                {page.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
