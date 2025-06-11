"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Milestones from "@/components/MileStones"
import Trustees from "@/components/Trustees"
import Principals from "@/components/Principals"
import PSG_Image from "@/assets/PSG_Medium_Cropped.jpg"
import { Menu, X } from "lucide-react"
import Footer from "@/components/Footer"
import DrDamodaran from "@/components/dr-damodharan"

export default function AboutCollege() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen relative scroll-smooth">
      {/* Background elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-400 rounded-full filter blur-3xl opacity-10 animate-pulse" />

      {/* Hero Section */}
      <section className="relative flex items-center flex-col overflow-hidden bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 py-20 px-6">
        {/* Top Left: Foundation Day */}
        <div
          className="text-2xl absolute top-4 left-4 md:top-6 md:left-6 font-semibold cursor-pointer text-white"
          onClick={() => navigate("/")}
        >
          <span className="text-indigo-300">Foundation</span> Day 2025
        </div>

        {/* Top Right: Desktop Button */}
        <div className="absolute top-4 max-lg:top-12 max-lg:right-2 right-4 md:top-6 md:right-6 hidden lg:block">
          <button
            onClick={() => navigate("/distinguishedalumni")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
          >
            Distinguished Alumni Awards
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="absolute top-4 right-4 lg:hidden z-50">
          <button onClick={() => setShowMenu(!showMenu)} className="text-white px-3 py-1 rounded-lg text-sm">
            {showMenu ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {showMenu && (
          <div className="absolute top-14 right-4 bg-white rounded-lg shadow-lg p-4 z-40 lg:hidden">
            <button
              onClick={() => {
                navigate("/distinguishedalumni")
                setShowMenu(false)
              }}
              className="text-indigo-700 font-semibold hover:underline"
            >
              Distinguished Alumni Awards
            </button>
          </div>
        )}

        {/* Main Hero Content */}
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              About <span className="text-indigo-300">PSG College of Technology</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Pioneering Excellence in Technical Education Since 1951
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Legacy Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-l-4 border-indigo-600 pl-4">Our Legacy</h2>
              <p className="text-gray-700 mb-4">
                PSG College of Technology is a Govt. Aided, Autonomous institution affiliated to Anna University and
                ISO&nbsp;9001:2015 certified. Established in 1951 by the PSG &amp; Sons' Charities Trust, the college is
                located 8&nbsp;km from Coimbatore Railway Station and 5&nbsp;km from the airport on a 45-acre campus
                supporting academic, residential, and recreational facilities.
              </p>
              <p className="text-gray-700 mb-4">
                Under the guidance of Managing Trustees such as Sri G&nbsp;R&nbsp;Govindarajulu,
                Dr&nbsp;G&nbsp;R&nbsp;Damodaran, and currently Sri&nbsp;L&nbsp;Gopalakrishnan, PSG Tech has been at the
                forefront of innovation in technical education.
              </p>
              <p className="text-gray-700">
                With over 8,500 students across 15 engineering and technology departments, plus programs in computer
                applications, management sciences, basic sciences, and humanities, PSG Tech offers 21 undergraduate and
                24 postgraduate programs, and hosts more than 500 research scholars.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src={PSG_Image || "/placeholder.svg"}
                alt="PSG College of Technology Campus"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trustees Section */}
      <Trustees />

      <DrDamodaran/>

      {/* Principals Section */}
      <Principals />

      {/* Vision & Mission Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-600"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                PSG College of Technology aspires to be recognised as one of the leaders in engineering education,
                research and application of knowledge to benefit society.
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                <li>To be a leading institution of global standards</li>
                <li>To foster innovation and entrepreneurship</li>
                <li>To contribute to the advancement of knowledge in science and technology</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-600"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To provide world-class engineering education, foster research and development, evolve innovative
                applications of technology, encourage entrepreneurship and mould young leaders for the betterment of
                society.
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                <li>Provide world-class Engineering Education</li>
                <li>Foster Research and Development</li>
                <li>Evolve Innovative applications of Technology</li>
                <li>Encourage Entrepreneurship</li>
                <li>Mould leaders for societal betterment</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Core Values</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "Striving for the highest standards in teaching, research, and institutional practices.",
              },
              {
                title: "Innovation",
                description: "Encouraging creative thinking and pioneering approaches to address challenges.",
              },
              {
                title: "Integrity",
                description: "Upholding ethical standards and fostering honesty and transparency.",
              },
              { title: "Inclusivity", description: "Embracing diversity and ensuring equal opportunities for all." },
              {
                title: "Social Responsibility",
                description: "Contributing to the betterment of society through education and research.",
              },
              {
                title: "Collaboration",
                description: "Fostering partnerships with industry, academia, and the community.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-600"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section id="milestone" className="py-16 bg-white">
        <div className="max-w-fit mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey Through the Years</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto" />
          </motion.div>
          <Milestones />
        </div>
      </section>
      <Footer />
    </div>
  )
}
