import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

const WinnerCard = ({ name, title, company, qualification, degree, profileUrl }: {
  name: string;
  title: string;
  company: string;
  qualification: string;
  degree: string;
  profileUrl: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <img
          src={profileUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 font-semibold mb-1">{title}</p>
        <p className="text-gray-500 text-sm mb-2">{company}</p>
        {qualification && (
          <p className="text-gray-500 text-sm mb-2">{qualification}</p>
        )}
        <span className="text-indigo-600 font-medium text-sm">{degree}</span>
      </div>
    </motion.div>
  );
};

const winners2025 = [
  {
    name: "Mrs. Kavitha Krishnan",
    title: "Chief Technology Officer",
    company: "Customer Innovation Services, SAP Labs, Bengaluru, India",
    qualification: "",
    degree: "MCA, 1998",
    profileUrl: "https://media.licdn.com/dms/image/v2/D5603AQH2eVR8rQcHQQ/profile-displayphoto-shrink_800_800/B56ZcwlimgGQAc-/0/1748866837491?e=1758758400&v=beta&t=5LuNeTHzvm9VrGjyMUJSZbwr7ZJ2d2t9qKRYfg9HqRk",
  },
  {
    name: "Mrs. Vanitha Kumar",
    title: "Senior Vice-President",
    company: "Software Engineering, Qualcomm Technologies Inc, California, USA",
    qualification: "",
    degree: "B.E. Electronics & Communication Engineering, 1994",
    profileUrl: "https://media.licdn.com/dms/image/v2/C5603AQHdKaprEnxxHw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1637800441183?e=1758758400&v=beta&t=GPizH85l_oViITTuQ-LPBA8N2ySNrIgObrxbhCh6Z08",
  },
  {
    name: "Mr. Lakshmi Narasimha Moorthy K",
    title: "Co-Founder and CEO",
    company: "nicheBrains, Hyderabad, India",
    qualification: "",
    degree: "B.E. Mechanical Engineering, 1996",
    profileUrl: "https://media.licdn.com/dms/image/v2/D5603AQHASXufx_9DXQ/profile-displayphoto-crop_800_800/B56ZhrrNkuHUAI-/0/1754153148089?e=1758758400&v=beta&t=ZIz8yk8FdPHJUb3_utN2PrrZgY_hxcX4L4q1NXiPPm4",
  },
  {
    name: "Mr. Srinivasan Ravi",
    title: "Chairman & Managing Director",
    company: "Craftsman Automation, Coimbatore, India",
    qualification: "",
    degree: "B.E. Mechanical Engineering, 1984",
    profileUrl: "https://autocomponentsindia.com/wp-content/uploads/2014/01/challenge_1.jpg",
  },
  {
    name: "Mr. Cottalango Leon",
    title: "Distinguished Engineer",
    company: "Sony Pictures Imageworks, California, USA",
    qualification: "",
    degree: "B.E. Computer Science & Engineering, 1992",
    profileUrl: "https://media.licdn.com/dms/image/v2/D5603AQFv1cHi6aAUPg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720022264101?e=1758758400&v=beta&t=wp67OY4kKjQdYqNRj-ACU_0AP4LBMYJbOx5ufvKoloA",
  },
  {
    name: "Mr. Gowthaman Ranganathan",
    title: "Former Director, Oracle America Inc.",
    company: "Entrepreneur, Angel Investor, Software Executive, California, USA",
    qualification: "",
    degree: "B.E. Production Engineering, 1995",
    profileUrl: "https://media.licdn.com/dms/image/v2/C5603AQGBvsI0dZPhXQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1523580314625?e=1758758400&v=beta&t=UeRA_HKUxVQsBXXi-ekI1IWxOC74gMosrZsLin10FOs",
  },
];

const winners2023 = [
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
    profileUrl: "https://psgtech.edu/distinalumni/assets/images/2023awardees/Senthil%20Avoodai_new.jpg",
  },
];

const winners2024 = [
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
      
      {/* 2025 Winners Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-platinum-300 to-indigo-200 mb-8">
          Distinguished Alumni Awardees 2025
        </h2>
        <div className="flex flex-col sm:hidden gap-6">
          {winners2025.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full mx-auto max-w-fit">
          {winners2025.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
      </div>

      {/* 2024 Winners Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-platinum-300 to-indigo-200 mb-8">
          Distinguished Alumni Awardees 2024
        </h2>
        <div className="flex flex-col sm:hidden gap-6">
          {winners2024.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full mx-auto max-w-fit">
          {winners2024.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
      </div>

      {/* 2023 Winners Section */}
      <div>
        <h2 className="text-4xl font-bold bg-clip-text lg:mb-16 text-transparent bg-gradient-to-r from-platinum-300 to-indigo-200 mb-8">
          Distinguished Alumni Awardees 2023
        </h2>
        <div className="flex flex-col sm:hidden gap-6">
          {winners2023.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full mx-auto max-w-fit">
          {winners2023.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastWinners;
