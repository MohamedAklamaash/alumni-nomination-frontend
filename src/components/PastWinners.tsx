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
    name: "Dr. K. V. Srinivasan",
    title: "Managing Director",
    company: "Premier Mills, Coimbatore",
    qualification: "",
    degree: "1983 BTech (Textile Technology)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2023awardees/srinivasan_new.jpg",
  },
  {
    name: "Mr. M. Chandrasekar",
    title: "Chairman",
    company: "Tamilnadu Electricity Regulatory Commission, Chennai",
    qualification: "",
    degree: "1983 B.E (Electrical and Electronics Engineering)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2023awardees/chandrasekar.jpeg",
  },
  {
    name: "Dr. Raj Rajkumar",
    title: "George Westinghouse Professor",
    company: "Carnegie Mellon University, USA",
    qualification: "Department of Electrical and Computer Engineering",
    degree: "1984 B.E (Electronics and Communication Engineering)",
    profileUrl: "https://www.ece.cmu.edu/directory/images/faculty/R/raj-rajkumar-800x800.png",
  },
  {
    name: "Mr. N. Palani Kumanan",
    title: "Distinguished Software Engineer",
    company: "Dow Jones & Co., The Wall Street Journal, New York, USA",
    qualification: "Pulitzer Prize Winner",
    degree: "1988 MCA",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2023awardees/palanikumanan_new.jpg",
  },
  {
    name: "Dr. N. Anandavalli",
    title: "Director",
    company: "CSIR - Structural Engineering Research Centre, Chennai",
    qualification: "",
    degree: "1993 M.E (Structural Engineering)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2023awardees/anandavalli_new.jpg",
  },
  {
    name: "Mr. Nagarajan Maran",
    title: "Founder & CEO",
    company: "Kaar Technologies, Dallas, USA",
    qualification: "",
    degree: "1994 B.E (Production Engineering)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2023awardees/nagarajan_maran_new.jpg",
  },
  {
    name: "Mr. S. Senthil Avoodai Krishna Raj IPS",
    title: "Deputy Inspector General (DIG) of Police",
    company: "Uttarakhand",
    qualification: "",
    degree: "1995 B.E (Electrical and Electronics Engineering)",
    profileUrl: "", // no public image found—please provide if available
  },
  {
    name: "Mrs. Anandi Ramalingam",
    title: "Information Commissioner",
    company: "Government of India, New Delhi",
    qualification: "",
    degree: "1979 - 1984 BE (ECE)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2024awardees/anandi.jpg",
  },
  {
    name: "Mr. Loganathan Palanisamy",
    title: "Director of Engineering",
    company: "Yahoo, San Francisco, USA",
    qualification: "",
    degree: "1979 - 1984 BE (Mech)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2024awardees/loga.jpg",
  },
  {
    name: "Mrs. Kalpana Arvind",
    title: "Outstanding Scientist, Associate Director at LEOS-ISRO",
    company: "Bengaluru",
    qualification: "",
    degree: "1981 - 1985 BE (ECE)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2024awardees/kalpana.jpg",
  },
  {
    name: "Mr. Suresh Muthuswami",
    title: "Chairman of North America",
    company: "Tata Consultancy Services, New Jersey, USA",
    qualification: "",
    degree: "1983 - 1986 MCA",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2024awardees/suresh.jpg",
  },
  {
    name: "Mr. Albert Thomas",
    title: "Industry Supply Chain Executive",
    company: "Oracle, Atlanta, USA",
    qualification: "",
    degree: "1987 - 1991 BE (Production)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2024awardees/albertthomas.jpg",
  },
  {
    name: "Mr. Leela Kaza",
    title: "Founder & Co - Chief Executive Officer",
    company: "Bounteous x Accolite, Dallas, USA",
    qualification: "",
    degree: "1987 - 1992 BE SW (Mech)",
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2024awardees/leela.jpg",
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
