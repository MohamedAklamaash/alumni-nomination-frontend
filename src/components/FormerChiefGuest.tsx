import { useChiefGuestContext } from "@/hooks/useChiefGuest";
import { motion } from 'framer-motion';


const GuestCard = () => {



  const chiefguest = useChiefGuestContext();

  return <div className="flex flex-col rounded-xl p-5 w-full ">
      
      <span className="text-4xl text-white font-bold mb-10 ">
            Former Chief Guest
          </span>
      <div className="flex flex-col gap-20 lg:flex-row items-center w-full">

        
        <div className="w-40 sm:w-60 md:w-80 lg:w-96 lg:my-10 aspect-square rounded-full overflow-hidden border shadow-md">
          <img
            src={chiefguest.guest.avatar}
            alt={chiefguest.guest.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full lg:w-[65%]">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-platinum-300 to-indigo-200">
            {chiefguest.guest.name}
          </span>
          <p className="flex flex-col gap-2 my-10 text-justify mr-10 text-md lg:text-xl text-gray-300">
            {chiefguest.guest.description.map((value) => {
              return `${value}. `
            })}
          </p>
        </div>
        


        
        
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-indigo-200 mb-4">Directorships</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {chiefguest.guest.directorship.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-indigo-200 my-5">Awards & Recognition</h2>
        <div className="grid my-10 md:grid-cols-2 lg:grid-cols-3 list-inside text-black gap-3 space-y-2">
          {chiefguest.guest.awards.map((award, index) => (
            <motion.div whileHover={{scale:1.3,transition:{duration:0.2}}} key={index} className="cursor-pointer text-black md:h-30 px-5 py-7 rounded-2xl bg-white">{award}</motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-indigo-200 mb-4">Education</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {chiefguest.guest.education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </div>
  </div>

};

const FormerChiefGuest = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-bl from-indigo-800 via-blue-900 to-gray-800 min-h-screen px-10 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="flex flex-col lg:w-[80%] items-center">
        
        
        <GuestCard/>
    
      </div>
    </div>
  )
}

export default FormerChiefGuest