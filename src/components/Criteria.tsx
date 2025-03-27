import { motion } from "framer-motion";

const CriteriaSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative bg-gray-100 py-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-indigo-100/40 to-gray-100 opacity-90 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,197,253,0.1),transparent_70%)] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-800 text-center mb-12"
        >
          Criteria for Distinguished Alumni Nominations
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Criteria 1
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Innovations in the application of technology, design &
              development, achievements, awards & recognition (external &
              internal), technical leadership activities & positions,
              fellowships in professional organizations, patents & publications,
              industry standards activities, collaborations with academia,
              community service.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Criteria 2
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Exceptional management skills, a leadership position with company,
              awards & recognition, Board memberships, Fellowships,
              testimonials, global stature, collaborations with academia,
              community service, team leadership in setting up new enterprises,
              mentoring track record.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Criteria 3
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Significant entrepreneurial skills & accomplishments, a creation
              of support structure for entrepreneurs, the success of start-ups
              in establishing market presence, the scale.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Criteria 4
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Significant accomplishments in various areas—service to society,
              service to the institute, service to alumni, excellence in public
              administration, notable achievements in media & fine arts,
              leadership and innovation, the scale of impact.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Criteria 5
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Academic achievements and honours, intellectual contributions to
              the field of expertise, pioneering work, journal papers & citation
              indices, conference papers, books and book chapters, number of
              Ph.D scholars guided, visiting professorship, lectureships,
              fellowships in professional associations, student mentoring &
              welfare activities, peer testimonials, awards & recognition.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              Criteria 6
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Preferred age category is 45 to 55 years of age.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CriteriaSection;
