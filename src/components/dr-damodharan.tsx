"use client"

import { motion } from "framer-motion"

export default function DrDamodaran() {

  return (
    <section className=" px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Founder and Principal</h2>

          <div className="inline-block">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-gray-200 mb-6">
              <img
                src="https://platinum.psgtech.ac.in/assets/images/G-R-DAMODARAN.jpg"
                alt="Dr. G.R. Damodaran"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-800">Dr. G.R. Damodaran</h3>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
