import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WinnerCard = ({
  name,
  title,
  company,
  qualification,
  degree,
  profileUrl,
}: {
  name: string;
  title: string;
  company: string;
  qualification: string;
  degree: string;
  profileUrl?: string;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div className="w-[380px] bg-gray-200 p-6 rounded-md shadow-md relative z-20">
      <div className="absolute -top-12 right-5 rounded-md z-30">
        <img src="https://placehold.co/80" height={80} width={80} alt={name} />
      </div>
      <div className="flex flex-col justify-start">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (profileUrl ? navigate(profileUrl) : null)}
        >
          <span className="font-semibold leading-snug text-xl text-gray-800">
            {name}
          </span>
          {profileUrl && <ExternalLink className="w-4 h-4" />}
        </div>
        <span className="text-gray-600 mt-3 text-[15px]">{title}</span>
        <span className="text-gray-600 text-[15px]">{company}</span>
        <span className="text-gray-600 text-[15px]">{qualification}</span>
        <span className="font-semibold mt-2 text-blue-700">{degree}</span>
      </div>
    </motion.div>
  );
};

const winners = [
  {
    name: "Dr. Super Subburayan",
    title: "Managing Director",
    company: "Larsen & Toubro",
    qualification: "Additional qualification here",
    degree: "1983 BTech Textile",
    profileUrl: "/profile/super-subburayan", 
  },
  {
    name: "Jane Doe",
    title: "Chief Innovation Officer",
    company: "TechCorp",
    qualification: "Patent Holder",
    degree: "1990 MSc Engineering",
  },
  {
    name: "John Smith",
    title: "Founder",
    company: "StartUpX",
    qualification: "Entrepreneur of the Year",
    degree: "1985 BEng Mechanical",
  },
  {
    name: "Emily Chen",
    title: "Professor",
    company: "University of Excellence",
    qualification: "PhD Advisor",
    degree: "1988 PhD Physics",
  },
  {
    name: "Michael Patel",
    title: "VP of Operations",
    company: "Global Inc.",
    qualification: "Industry Leader",
    degree: "1984 BBA Management",
  },
];

const PastWinners = () => {
  return (
    <div className="relative bg-gradient-to-bl from-indigo-800 via-blue-900 to-gray-800 min-h-screen px-10 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
      <div>
        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-platinum-300 to-indigo-200">
          Former Winners
        </span>
      </div>
      <div className="flex flex-col sm:hidden gap-6 mt-16">
        {winners.map((winner, index) => (
          <WinnerCard key={index} {...winner} />
        ))}
      </div>
      <div className="hidden sm:flex flex-col mt-16 gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full mx-auto max-w-fit">
          {winners.slice(0, 3).map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mx-auto max-w-fit gap-16">
          {winners.slice(3, 5).map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastWinners;
