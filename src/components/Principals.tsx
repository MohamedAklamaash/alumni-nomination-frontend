"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react'
import DrDamodaran from "./dr-damodharan"

interface Principal {
    id: number
    name: string
    period: string
    isCurrent: boolean
    image?: string
    qualifications: string
    description: string
}

// Sample data based on PSG Tech principals
const principalsData: Principal[] = [
    {
        id: 1,
        name: "Dr. K. Prakasan",
        period: "2019 - Present",
        image: "https://psgtech.edu/images/principal_vert.jpg",
        isCurrent: true,
        qualifications: "B.E., M.E., Ph.D.",
        description: "Dr. K. Prakasan is the current Principal of PSG College of Technology. He has been associated with the institution for over three decades and has served in various academic and administrative capacities. Under his leadership, the college continues to excel in academic excellence, research, and industry collaboration. His vision focuses on enhancing the global footprint of PSG Tech and strengthening industry-academia partnerships.",
    },
    {
        id: 2,
        name: "Dr. R. Rudramoorthy",
        period: "2005 - 2019",
        image: "https://psgtech.edu/images/principal_rud.jpg",
        isCurrent: false,
        qualifications: "B.E., M.E., Ph.D.",
        description: "Dr. R. Rudramoorthy served as the Principal of PSG College of Technology for a decade. During his tenure, the college witnessed significant growth in research output, international collaborations, and industry partnerships. He was instrumental in establishing several Centers of Excellence and enhancing the institution's research infrastructure.",
    },
    {
        id: 3,
        name: "Dr. S Vijayarangan",
        period: "2002 - 2005",
        image: "https://psgtech.edu/images/principal_sv.jpg",
        isCurrent: false,
        qualifications: "",
        description: "",
    },
    {
        id: 4,
        name: "Dr. P Radhakrishnan",
        period: "1994 - 2002",
        image: "https://psgtech.edu/images/princi_radhakrishnan.jpg",
        isCurrent: false,
        qualifications: "B.E., M.S., Ph.D.",
        description: "Dr. P Radhakrishnan had a distinguished tenure as the Principal of PSG College of Technology. Under his leadership, the college achieved autonomous status and established itself as one of the premier technical institutions in India. He was known for his emphasis on academic excellence and industry-relevant curriculum.",
    },
    {
        id: 5,
        name: "Dr. S Subramanyan",
        period: "1991 - 1994",
        image: "https://psgtech.edu/images/princi_subramanyan.jpg",
        isCurrent: false,
        qualifications: "B.E., M.S., Ph.D.",
        description: "",
    },
    {
        id: 6,
        name: "Dr. A Shanmugasundaram",
        period: "1986 - 1991",
        image: "https://psgtech.edu/images/princi_shanmugam.jpg",
        isCurrent: false,
        qualifications: "",
        description: "",
    },
    {
        id: 7,
        name: "Dr. K Venkataraman",
        period: "1982 - 1986",
        image: "https://psgtech.edu/images/princi_venkataraman.jpg",
        isCurrent: false,
        qualifications: "",
        description: "",
    },
    {
        id: 8,
        name: "Dr. R Subbayyan",
        period: "1970 - 1982",
        image: "https://psgtech.edu/images/princi_subbayyan.jpg",
        isCurrent: false,
        qualifications: "",
        description: "",
    },
    {
        id: 9,
        name: "Dr. G.R. Damodaran",
        period: "1951 - 1970",
        image: "https://psgtech.edu/images/g_r_damodaran.jpg",
        isCurrent: false,
        qualifications: "B.E., M.S., Ph.D.",
        description: "Dr. G.R. Damodaran served as the Principal of PSG College of Technology for two decades. He was also the Managing Trustee of PSG & Sons' Charities. His visionary leadership laid the foundation for the college's growth and excellence. He was instrumental in establishing several new departments and programs.",
    }
];

export default function Principals() {
    const [expandedId, setExpandedId] = useState<number | null>(1) // Default to current principal expanded

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Principals</h2>
                    <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6"></div>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                        The academic leaders who have shaped the educational excellence of PSG College of Technology.
                    </p>
                </motion.div>
                <DrDamodaran/>

                <div className="space-y-6">
                    {principalsData.map((principal, index) => (
                        <motion.div
                            key={principal.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`border rounded-xl overflow-hidden shadow-sm ${principal.isCurrent ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
                                }`}
                        >
                            <div
                                className={`p-6 cursor-pointer ${principal.isCurrent ? "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white" : ""
                                    }`}
                                onClick={() => toggleExpand(principal.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex items-center justify-center w-12 h-12 rounded-full ${principal.isCurrent
                                                ? "bg-white bg-opacity-20 text-white"
                                                : "bg-indigo-100 text-indigo-600"
                                                }`}
                                        >
                                            {principal.image ? (
                                                <img
                                                    src={principal.image || "/placeholder.svg"}
                                                    alt={principal.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <GraduationCap className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold ${principal.isCurrent ? "text-white" : "text-gray-800"}`}>
                                                {principal.name}
                                                {principal.isCurrent && (
                                                    <span className="ml-3 text-xs font-medium px-2 py-1 bg-white text-indigo-700 rounded-full">
                                                        Current
                                                    </span>
                                                )}
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                <p className={`text-sm ${principal.isCurrent ? "text-indigo-100" : "text-gray-500"}`}>
                                                    {principal.period}
                                                </p>
                                                <span
                                                    className={`hidden sm:inline-block h-1 w-1 rounded-full ${principal.isCurrent ? "bg-indigo-200" : "bg-gray-400"
                                                        }`}
                                                ></span>
                                                <p className={`text-sm ${principal.isCurrent ? "text-indigo-100" : "text-gray-500"}`}>
                                                    {principal.qualifications}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {expandedId === principal.id ? (
                                            <ChevronUp className={`w-5 h-5 ${principal.isCurrent ? "text-white" : "text-indigo-600"}`} />
                                        ) : (
                                            <ChevronDown className={`w-5 h-5 ${principal.isCurrent ? "text-white" : "text-indigo-600"}`} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {expandedId === principal.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-6 pt-2 bg-white"
                                >
                                    <p className="text-gray-700 mb-4">{principal.description}</p>
                                    {/* <div className="flex flex-wrap gap-3">
                                        {principal.isCurrent && (
                                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                Read Full Profile
                                            </button>
                                        )}
                                        <button className="px-4  relative z-10 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                            View Achievements
                                        </button>
                                    </div> */}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
