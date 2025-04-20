import { useState } from 'react';

const Milestones = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const timelineData = [
    {
      date: 'January 2024',
      title: 'Project Inception',
      description: 'Initial concept development and market research.'
    },
    {
      date: 'February 2024',
      title: 'Design Phase',
      description: 'UI/UX design and prototyping for stakeholder approval.'
    },
    {
      date: 'March 2024',
      title: 'Development Kickoff',
      description: 'Started coding the core functionality and infrastructure.'
    },
    {
      date: 'May 2024',
      title: 'Alpha Testing',
      description: 'Internal testing phase with focus groups.'
    },
    {
      date: 'July 2024',
      title: 'Beta Release',
      description: 'Limited public release to gather user feedback.'
    },
    {
      date: 'September 2024',
      title: 'Feature Expansion',
      description: 'Added enhanced features based on beta user feedback.'
    },
    {
      date: 'October 2024',
      title: 'Public Launch',
      description: 'Official product release with marketing campaign.'
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