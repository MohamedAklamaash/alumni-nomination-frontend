import { useState } from 'react';

const Milestones = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const timelineData = [
    {
      date: '1951',
      title: 'BE Electrical & Electronics & Mechanical Engg.',
      description: 'Bachelor of Engineering in Mechanical Engineering introduced.'
    },
    {
      date: '1953',
      title: 'BE Civil Engg.',
      description: 'Bachelor of Engineering in Civil Engineering introduced.'
    },
    {
      date: '1962',
      title: 'ME Structural Engg. & Engineering Design',
      description: 'Master’s programs in Structural Engineering and Engineering Design introduced.'
    },
    {
      date: '1964',
      title: 'BE Manufacturing Engg.',
      description: 'Bachelor of Engineering in Manufacturing Engineering introduced.'
    },
    {
      date: '1965',
      title: 'BE Textile Technology',
      description: 'Bachelor of Engineering in Textile Technology introduced.'
    },
    {
      date: '1968',
      title: 'BE ECE & Metallurgical Engg.',
      description: 'Electronics & Communication Engineering and Metallurgical Engineering programs introduced.'
    },
    {
      date: '1971',
      title: 'ME Textile Tech, MBA & BE Applied Science',
      description: 'Specialized shuttleless weaving curriculum and Applied Science introduced.'
    },
    {
      date: '1971',
      title: 'ME Control Systems',
      description: 'Master of Engineering in Control Systems introduced.'
    },
    {
      date: '1975',
      title: 'BE Production Engg. & MSc Applied Mathematics',
      description: 'Bachelor of Engineering in Production and MSc in Applied Mathematics introduced.'
    },
    {
      date: '1976',
      title: 'ME CSE & Industrial Metallurgy',
      description: 'Master’s programs in Computer Science & Engineering and Industrial Metallurgy introduced.'
    },
    {
      date: '1978',
      title: 'ME Industrial Engineering',
      description: 'Bachelor of Engineering in Industrial Engineering introduced.'
    },
    {
      date: '1983',
      title: 'MCA, MSc Applied Maths, BE. EEE',
      description: 'Master of Computer Applications and Electrical & Electronics Engineering introduced.'
    },
    {
      date: '1985',
      title: 'BSc Computer Systems & Design',
      description: 'Bachelor of Science in Computer Systems & Design introduced.'
    },
    {
      date: '1987',
      title: 'BE Computer Science & Engg.',
      description: 'Bachelor of Engineering in Computer Science introduced.'
    },
    {
      date: '1997',
      title: 'Msc. Software Systems',
      description: 'Bachelor of Engineering in Software Systems introduced.'
    },
    {
      date: '1998',
      title: 'ME Power Electronics & Drives',
      description: 'Bachelor of Engineering in Power Electronics introduced.'
    },
    {
      date: '1999',
      title: 'BE Information Technology & Automobile Engg.',
      description: 'Biomedical and Automobile Engineering introduced.'
    },
    {
      date: '2000',
      title: 'BE Biotechnology & ME VLSI Design',
      description: 'Programs in Biotechnology and VLSI Design introduced.'
    },
    {
      date: '2002',
      title: 'BE(SW) Production Engg.',
      description: 'Information Technology in Production Engineering introduced.'
    },
    {
      date: '2006',
      title: 'BE Biomedical Engg, BE Fashion Technology & ME Biotechnology',
      description: 'Accredited Biomedical Engineering and Nanoscience introduced.'
    },
    {
      date: '2007',
      title: 'BE ICE & Msc. TCS',
      description: 'Instrumentation & Control Engineering and Master in TCS introduced.'
    },
    {
      date: '2009',
      title: 'ME Automotive Engg. & ME Embedded & Real Time Systems',
      description: 'Programs in Automotive and Embedded & Real-Time Systems introduced.'
    },
    {
      date: '2011',
      title: 'BE Robotics & Automation Engg.',
      description: 'Bachelor of Engineering in Robotics & Automation introduced.'
    },
    {
      date: '2015',
      title: 'MSc Data Science & Msc. FDM',
      description: 'Master of Science in Data Science and Fashion Design & Management introduced.'
    },
    {
      date: '2020',
      title: 'MSc Cyber security ',
      description: 'Masters in Cyber Security introduced.'
    },
    {
      date: '2023',
      title: 'BE CSE (AI & ML)',
      description: 'Artificial Intelligence & Machine Learning specialization in Computer Science introduced.'
    }
  ];

  return (
    <div className="w-[80%] z-1000 flex flex-col ">
      <h2 className="text-4xl font-bold text p-6">PSG Milestones</h2>

      <div className="flex-1 p-6">
        <div className="relative max-w-3xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300"></div>

          {/* Timeline Events */}
          {timelineData.map((event, index) => (
            <div
              key={index}
              className="relative pl-16 pb-12"
              onMouseEnter={() => setActiveEvent(index)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 transform -translate-x-1/2">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-gray-600 ${activeEvent === index ? 'bg-gray-600' : 'bg-white'
                    }`}
                ></div>
              </div>

              {/* Content */}
              <div className={`transition-all duration-200 border p-5 rounded-2xl shadow-lg ${activeEvent === index ? 'transform -translate-y-1' : ''}`}>
                <div className="text-sm font-medium text-gray-500 mb-1">{event.date}</div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Milestones;