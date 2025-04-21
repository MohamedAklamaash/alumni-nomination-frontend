import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import FormerChiefGuest from "@/components/FormerChiefGuest";
import Milestones from "@/components/MileStones";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/Gallery";
import { useChiefGuestContext } from "@/hooks/useChiefGuest";
import chief_guest_24 from "@/constants/chiefguest2024";
import chief_guest_23 from "@/constants/chiefguest2023";
import { assets } from "@/assets/assets";
import { Menu } from "lucide-react";


const pages = [
  {
    title:"Distingushed Alumini",
    link:"/distinguishedalumni"
  }
];

const toggle_options = ["2024", "2023"];

const FoundationLanding = () => {
  const navigate = useNavigate();
  const glowControls = useAnimation();
  const criteriaRef = useRef<HTMLElement>(null);
  const winnersRef = useRef<HTMLElement>(null);



  const [currentYear, setCurrentYear] = useState<number>(0);
  const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false);
  const chiefguest = useChiefGuestContext();



  useEffect(() => {
    console.log(currentYear);
    currentYear === 0 ? chiefguest.setGuest(chief_guest_24) : chiefguest.setGuest(chief_guest_23);
  }, [currentYear])


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
            <span className="text-indigo-300">Foundation
            </span> Day 2025
          </div>
        </motion.h1>
        <nav className="space-x-6 sm:flex items-center">

          <Menu size={36} className="block md:hidden text-white hover:bg-gray-500 cursor-pointer rounded-md p-1" onClick={() => setIsMenuOpen(prev => !prev)}/>
          
          {isMenuOpen && <div className=" absolute w-[15rem] right-0 p-2 border rounded-xl bg-white">
              {pages.map((value,key) => {
                return <motion.div key={key}
                whileHover={{scale:1.03,transition:{duration:0.2}}}
                whileTap={{scale:0.96,transition:{duration:0.3}}}
                className="p-2 rounded-lg cursor-pointer z-1000 hover:bg-gray-100"
                onClick={() => navigate(value.link)}
                >
                  {value.title}
                </motion.div>
              })}

            </div>}

          <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(147, 197, 253, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-8 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold rounded-full shadow-md transition-all"
              onClick={() => {
                navigate("/distinguishedalumni");
              }
              }
            >
              Distinguished Alumni
          </motion.button>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center max-w-8xl md:w-[80%]">
          {/* Left Content */}
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
              Recognizing alumni who have excelled in their fields.
            </motion.p>
            
          </div>
        </div>
      </main>

      <div className="flex flex-row bg-white gap-5 p-5 items-center justify-center">
        {toggle_options.map((value, key) => {
          return <motion.button key={key}

            onClick={() => setCurrentYear(key)}

            whileHover={{ scale: 1.03, boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.12)", transition: { duration: 0.2 } }}
            className={`z-1000 cursor-pointer text-lg rounded-full py-3 px-8 border ${key === currentYear ? 'bg-indigo-600 text-white ' : ''}`}>
            {value}
          </motion.button>
        })}
      </div>


      <section
        id="milestone"
        className="flex flex-col items-center justify-center z-1000 bg-white "
      >
        <Milestones />
        <div className="flex flex-col w-[80%]">
          <h2 className="text-4xl font-bold text p-6">Invitation</h2>
          <div className="flex flex-row items-center w-full justify-center mb-10 ">
            <img src={currentYear === 0 ? assets.invitation_24 : assets.invitation_23} alt="Invitation" className="w-[50rem]" />
          </div>

        </div>
      </section>


      <section
        id="chiefguest"
        ref={criteriaRef}
        className="min-h-screen bg-platinum-500"
      >
        <FormerChiefGuest />
      </section>


      <section className="bg-white py-10 z-1000">
        <div className="flex flex-col items-center justify-center px-4">
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

      <section id="past-winners" ref={winnersRef}>
        <PhotoGallery />
      </section>

      <Footer />


    </div>
  );
};

export default FoundationLanding;
