"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronDown, ChevronUp, Filter } from "lucide-react"

interface Update {
    id: string
    date: Date
    title: string
    content: string
    category?: string
}

const sampleUpdates: Update[] = [
    {
        id: "1",
        date: new Date("2025-09-03"),
        title: "Foundation Day 2025 - Event Day",
        content: "The Management, Principal, Staff and Students of PSG COLLEGE OF TECHNOLOGY cordially invite you to the FOUNDATION DAY 2025. Chief Guest: Dr. Shashi Tharoor, Honorable Member of Parliament for Thiruvanathapuram, Chairman - Parliamentary Committee on External Affairs, Government of India. Guest of Honour: Shri. D. Lakshminarayanaswamy, Trustee, SNR Sons Charitable Trust, Coimbatore. Shri. L. Gopalakrishnan, Managing Trustee, PSG & Sons' Charities will preside. Event: September 3, 2025 | 4:30 pm at PSG Tech Quadrangle.",
        category: "Foundation_Day",
    },
    {
        id: "2",
        date: new Date("2025-07-16"),
        title: "Last date for submitting the Nomination",
        content: "The final date to submit nominations for Distinguished Alumni Awards 2025 is July 16, 2025. Ensure all required documents and information are completed and submitted before the deadline. Late submissions will not be accepted.",
        category: "Foundation_Day",
    },
    // {
    //     id: "4",
    //     date: new Date("2025-04-05"),
    //     title: "Campus Recruitment Drive",
    //     content:
    //         "We are excited to announce the upcoming campus recruitment drive on April 30, 2025. Several top companies will be participating. Make sure to register in advance.",
    //     category: "Foundation_Day",
    // }
]

const categoryColors: Record<string, string> = {
    Distinguished_Alumni: "bg-indigo-100 text-indigo-800",
    Foundation_Day: "bg-green-100 text-green-800",
    Default: "bg-gray-100 text-gray-800",
}

export default function Updates({ updates = sampleUpdates }: { updates?: Update[] }) {
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const categories = ["All", ...Array.from(new Set(updates.map((update) => update.category || "Other")))]

    const sortedAndFilteredUpdates = [...updates]
        .filter((update) => !selectedCategory || selectedCategory === "All" || update.category === selectedCategory)
        .sort((a, b) => {
            if (sortOrder === "newest") {
                return b.date.getTime() - a.date.getTime()
            } else {
                return a.date.getTime() - b.date.getTime()
            }
        })

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <section className="py-16 px-6 relative z-10 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Updates</h2>
                    <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6"></div>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                        Stay informed about the latest news about the Foundation Day 2025
                    </p>
                </motion.div>

                {/* Filters and Sort Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-indigo-600" />
                        <span className="text-gray-700 font-medium">Filter by:</span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category === "All" ? null : category)}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${(category === "All" && !selectedCategory) || selectedCategory === category
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <Calendar size={16} className="text-indigo-600" />
                        <span className="text-gray-700">{sortOrder === "newest" ? "Newest First" : "Oldest First"}</span>
                        {sortOrder === "newest" ? (
                            <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                            <ChevronUp size={16} className="text-gray-500" />
                        )}
                    </button>
                </div>

                {/* Updates List */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {sortedAndFilteredUpdates.map((update) => (
                            <motion.div
                                key={update.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
                                                <Calendar className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{update.title}</h3>
                                                <p className="text-gray-500 text-sm">{formatDate(update.date)}</p>
                                            </div>
                                        </div>
                                        {update.category && (
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[update.category] || categoryColors.Default
                                                    }`}
                                            >
                                                {update.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-gray-700">{update.content}</p>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => toggleExpand(update.id)}
                                            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                                        >
                                            {expandedId === update.id ? (
                                                <>
                                                    <span className="text-sm font-medium">Show less</span>
                                                    <ChevronUp size={16} className="ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-sm font-medium">Read more</span>
                                                    <ChevronDown size={16} className="ml-1" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Expanded content */}
                                    <AnimatePresence>
                                        {expandedId === update.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4 pt-4 border-t border-gray-100"
                                            >
                                                {/* <div className="mt-4 flex gap-2">
                                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                                        Learn More
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                                        Register
                                                    </button>
                                                </div> */}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {sortedAndFilteredUpdates.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-gray-500">No updates found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* View All Button
                <div className="mt-10 text-center">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                        View All Updates
                    </button>
                </div> */}
            </div>
        </section>
    )
}
