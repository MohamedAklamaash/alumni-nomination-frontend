"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, User } from "lucide-react"

interface Person {
  name: string
  title: string
  period?: string
  image?: string
}

interface Trustee {
  id: number
  name: string
  title: string
  period: string
  isCurrent: boolean
  image?: string
  description: string
}

const visionary: Person = {
  name: "Shri. P. S. Govindaswamy Naidu",
  title: "Founder",
  image: "https://platinum.psgtech.ac.in/assets/images/Govindaswamy.png",
}

const founders: Person[] = [
  {
    name: "PSG Venkataswamy Naidu",
    title: "Founder Trustee",
    period: "1926 - 1965",
    image: "https://platinum.psgtech.ac.in/assets/images/2.png",
  },
  {
    name: "PSG Rangaswamy Naidu",
    title: "Managing Trustee",
    period: "1926 - 1947",
    image: "https://platinum.psgtech.ac.in/assets/images/PSG-RANGASWAMY-NAIDU.jpg",
  },
  {
    name: "PSG Ganga Naidu",
    title: "Managing Trustee",
    period: "1947 - 1949",
    image: "https://platinum.psgtech.ac.in/assets/images/PSG-GANGA-NAIDU.jpg",
  },
  {
    name: "PSG Narayanaswamy Naidu",
    title: "Founder Trustee",
    period: "1926 - 1938",
    image: "https://platinum.psgtech.ac.in/assets/images/5.png",
  },
]

const trusteesData: Trustee[] = [
  {
    id: 1,
    name: "L. GOPALAKRISHNAN",
    image: "https://platinum.psgtech.ac.in/assets/images/truste.jpg",
    period: "2011 - till date",
    isCurrent: true,
    title: "Managing Trustee",
    description:
      "Shri L. Gopalakrishnan assumed the role of Managing Trustee in May 2011, emphasizing quality education and the significance of research. He promoted faculty research through initiatives like scholarships for research scholars and the creation of PSG Distinguished Professor Fellowship. Under his leadership, a Center for Excellence was established at PSG College of Technology and PSG Institute of Medical Sciences and Research. Additionally, a hospital was inaugurated at Karadivavi, and collaborations with U.S. and European universities were initiated.",
  },
  {
    id: 9,
    name: "G. Rangaswamy",
    image: "https://platinum.psgtech.ac.in/assets/images/GRANGASWAMY.jpg",
    period: "2005 - 2011",
    isCurrent: false,
    title: "Managing Trustee",
    description: "Served as Managing Trustee from 2005 to 2011.",
  },
  {
    id: 8,
    name: "V.Rajan",
    image: "https://platinum.psgtech.ac.in/assets/images/rajan.jpg",
    period: "2000 - 2005",
    isCurrent: false,
    title: "Managing Trustee",
    description: "Served as Managing Trustee from 2000 to 2005.",
  },
  {
    id: 7,
    name: "G.R.Karthikeyan",
    image: "https://platinum.psgtech.ac.in/assets/images/G-R-KARTHIKEYAN.jpg",
    period: "1990 - 2000",
    isCurrent: false,
    title: "Managing Trustee",
    description: "Served as Managing Trustee from 1990 to 2000.",
  },
  {
    id: 6,
    name: "G.Varadaraj",
    image: "https://platinum.psgtech.ac.in/assets/images/GVARATHARAJ.jpg",
    period: "1978 - 1990",
    isCurrent: false,
    title: "Managing Trustee",
    description: "Served as Managing Trustee from 1978 to 1990.",
  },
  {
    id: 5,
    name: "Dr. G.R. Damodaran",
    image: "https://platinum.psgtech.ac.in/assets/images/G-R-DAMODARAN.jpg",
    period: "1972 - 1978",
    isCurrent: false,
    title: "Managing Trustee",
    description: "Served as Managing Trustee from 1972 to 1978.",
  },
  {
    id: 4,
    name: "G.R.Govindarajulu",
    image: "https://platinum.psgtech.ac.in/assets/images/GRGOVINDARAJULU.jpg",
    period: "1949 - 1972",
    isCurrent: false,
    title: "Managing Trustee",
    description: "Served as Managing Trustee from 1949 to 1972.",
  },
]

export default function Trustees() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto mb-16">

        {/* Trustees Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Trustees</h2>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6" />
          <p className="text-gray-700 max-w-3xl mx-auto">
            The visionary leaders who have guided PSG College of Technology through its journey of excellence.
          </p>
        </motion.div>

                {/* Visionary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 mb-8"
        >
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-400 to-purple-400 shadow-lg">
                <img src={visionary.image || "/placeholder.svg"} alt={visionary.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Visionary
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{visionary.name}</h3>
            <p className="text-indigo-600 font-semibold text-sm">{visionary.title}</p>
          </div>
        </motion.div>

        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-400 to-purple-400 shadow-lg">
                    <img src={founder.image || "/placeholder.svg"} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Founder
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{founder.name}</h3>
                <p className="text-indigo-600 font-semibold text-sm">{founder.title}</p>
                {founder.period && <p className="text-gray-500 text-sm">{founder.period}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          {trusteesData.map((trustee, index) => (
            <motion.div
              key={trustee.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-xl overflow-hidden shadow-sm ${
                trustee.isCurrent ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`p-6 cursor-pointer ${
                  trustee.isCurrent ? "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white" : ""
                }`}
                onClick={() => toggleExpand(trustee.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${
                        trustee.isCurrent ? "bg-white bg-opacity-20 text-white" : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {trustee.image ? (
                        <img src={trustee.image} alt={trustee.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${trustee.isCurrent ? "text-white" : "text-gray-800"}`}>
                        {trustee.name}
                        {trustee.isCurrent && (
                          <span className="ml-3 text-xs font-medium px-2 py-1 bg-white text-indigo-700 rounded-full">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className={`text-sm ${trustee.isCurrent ? "text-indigo-100" : "text-gray-500"}`}>
                        {trustee.period}
                      </p>
                    </div>
                  </div>
                  <div>
                    {expandedId === trustee.id ? (
                      <ChevronUp className={`w-5 h-5 ${trustee.isCurrent ? "text-white" : "text-indigo-600"}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${trustee.isCurrent ? "text-white" : "text-indigo-600"}`} />
                    )}
                  </div>
                </div>
              </div>

              {expandedId === trustee.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 pt-2 bg-white"
                >
                  <p className="text-gray-700 mb-4">{trustee.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
