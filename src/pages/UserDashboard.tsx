import React, { useEffect, useState, FC } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/constants/backend";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Criteria {
  id: string;
  text: string;
}

interface Nominee {
  name: string;
  email: string;
  phone: string;
  rollNo: string;
  course: string;
  graduationYear: number;
  relationshipWithNominator: string;
  currentEmployment: string;
  linkedInProfile: string;
}

type Answers = Record<string, string>;

interface ErrorResponse {
  message?: string; // Made optional to handle cases where it might not exist
  error?: string;
  statusCode?: number;
}

type NominationBase = {
  userId: string;
  nomineeType: 'MYSELF' | 'OTHERS';
  nominatedYear: number;
  profileId: string;
  answers: { criteriaId: string; response: string }[];
};

type SelfNomination = NominationBase & {
  nomineeType: 'MYSELF';
  rollNo: string;
};

type OtherNomination = NominationBase & {
  nomineeType: 'OTHERS';
  nominee: Nominee;
};

const courses = [
  "AUTOMOBILE_ENGINEERING",
  "BIOMEDICAL_ENGINEERING",
  "CIVIL_ENGINEERING",
  "COMPUTER_SCIENCE_ENGINEERING",
  "COMPUTER_SCIENCE_ENGINEERING_AI_ML",
  "ELECTRICAL_ELECTRONICS_ENGINEERING",
  "ELECTRONICS_AND_COMMUNICATION_ENGINEERING",
  "INSTRUMENTATION_AND_CONTROL_ENGINEERING",
  "MECHANICAL_ENGINEERING",
  "METALLURGICAL_ENGINEERING",
  "PRODUCTION_ENGINEERING",
  "ROBOTICS_AND_AUTOMATION_ENGINEERING",
  "BIOTECHNOLOGY",
  "FASHION_TECHNOLOGY",
  "INFORMATION_TECHNOLOGY",
  "TEXTILE_TECHNOLOGY",
  "ELECTRICAL_ELECTRONICS_ENGINEERING_SANDWICH",
  "MECHANICAL_ENGINEERING_SANDWICH",
  "PRODUCTION_ENGINEERING_SANDWICH",
  "APPLIED_SCIENCE",
  "COMPUTER_SYSTEMS_AND_DESIGN",
  "AUTOMOTIVE_ENGINEERING",
  "BIOMETRICS_AND_CYBERSECURITY",
  "COMPUTER_SCIENCE_ENGINEERING_PG",
  "CONTROL_SYSTEMS",
  "EMBEDDED_AND_REALTIME_SYSTEMS",
  "ENGINEERING_DESIGN",
  "INDUSTRIAL_ENGINEERING",
  "INDUSTRIAL_METALLURGY",
  "MANUFACTURING_ENGINEERING",
  "POWER_ELECTRONICS_AND_DRIVES",
  "STRUCTURAL_ENGINEERING",
  "VLSI_DESIGN",
  "BIOTECHNOLOGY_PG",
  "NANO_SCIENCE_AND_TECHNOLOGY",
  "TEXTILE_TECHNOLOGY_PG",
  "PG_CERTIFICATE_WELDING_AND_QUALITY_ENGINEERING",
  "CERTIFICATE_WELDING_AND_QUALITY_ENGINEERING_INTEGRATED",
  "APPLIED_MATHEMATICS",
  "CYBER_SECURITY_INTEGRATED",
  "DATA_SCIENCE_INTEGRATED",
  "SOFTWARE_SYSTEMS_INTEGRATED",
  "THEORETICAL_COMPUTER_SCIENCE_INTEGRATED",
  "FASHION_DESIGN_AND_MERCHANDISING_INTEGRATED",
  "MASTER_OF_COMPUTER_APPLICATIONS",
  "MBA",
  "MBA_WASTE_MANAGEMENT_AND_SOCIAL_ENTREPRENEURSHIP",
  "PHD",
];


const NominationForm: FC = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [nomineeType, setNomineeType] = useState<'MYSELF' | 'OTHERS'>('MYSELF');
  const [nominee, setNominee] = useState<Nominee>({
    name: '', email: '', phone: '', rollNo: '', course: courses[0],
    graduationYear: new Date().getFullYear(), relationshipWithNominator: '',
    currentEmployment: '', linkedInProfile: ''
  });
  const [rollNo, setRollNo] = useState<string>('');

  const token = localStorage.getItem('access_token');
  const [userId, setuserId] = useState<string>('')
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get<{ id: string, isProfileComplete: boolean }>(`${BACKEND_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.data.isProfileComplete) {
          navigate('/profile')
        }
        setuserId(res.data.id);
      } catch (err) {
        toast.error('Failed to load user ID');
      }
    };
    fetchUserId();
  }
    , [token]);
  useEffect(() => {
    if (!token) {
      toast.error('Please login to continue.');
      navigate('/login');
      return;
    }
    const fetch = async () => {
      try {
        const res = await axios.get<Criteria[]>(`${BACKEND_URL}/criteria`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCriteria(res.data);
      } catch (err) {
        toast.error('Failed to load criteria');
      }
    };
    fetch();
  }, [token, navigate]);

  const handleAnswerChange = (criteriaId: string) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAnswers(prev => ({ ...prev, [criteriaId]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error('User not identified');

    const mappedAnswers = criteria.map(c => ({ criteriaId: c.id, response: answers[c.id] ?? '' }));

    const base: NominationBase = {
      userId,
      nomineeType,
      nominatedYear: 2025,
      profileId: '',
      answers: mappedAnswers
    };

    let payload: SelfNomination | OtherNomination;

    if (nomineeType === 'MYSELF') {
      payload = { ...base, nomineeType: 'MYSELF', rollNo };
    } else {
      payload = { ...base, nomineeType: 'OTHERS', nominee };
    }

    try {
      await axios.post(`${BACKEND_URL}/nominations`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Nomination submitted successfully');
      navigate('/home/dashboard');
    } catch (error) {

      const axiosError = error as AxiosError<ErrorResponse>;
      const msg = axiosError.response?.data?.message || 'Failed to submit nomination';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-3xl text-indigo-300">
        <ToastContainer />
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Nominate</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col sm:flex-row sm:space-x-8">
            {(['MYSELF', 'OTHERS'] as const).map(type => (
              <label key={type} className="flex items-center text-white mb-2 sm:mb-0">
                <input
                  type="radio"
                  value={type}
                  checked={nomineeType === type}
                  onChange={() => setNomineeType(type)}
                  className="mr-2"
                />
                {type === 'MYSELF' ? 'Self' : 'Other'}
              </label>
            ))}
          </div>

          {nomineeType === 'MYSELF' ? (
            <div>
              <label className="block mb-1 text-white">Your Roll Number</label>
              <input
                type="text"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-white">Name</label>
                  <input
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.name}
                    onChange={e => setNominee({ ...nominee, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.email}
                    onChange={e => setNominee({ ...nominee, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.phone}
                    onChange={e => setNominee({ ...nominee, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Roll Number</label>
                  <input
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.rollNo}
                    onChange={e => setNominee({ ...nominee, rollNo: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Course</label>
                  <select
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.course}
                    onChange={e => setNominee({ ...nominee, course: e.target.value })}
                  >
                    {courses.map(c => (
                      <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-white">Graduation Year</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.graduationYear}
                    onChange={e => setNominee({ ...nominee, graduationYear: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Relationship With Nominator</label>
                  <input
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.relationshipWithNominator}
                    onChange={e => setNominee({ ...nominee, relationshipWithNominator: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white">Current Employment</label>
                  <input
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.currentEmployment}
                    onChange={e => setNominee({ ...nominee, currentEmployment: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 text-white">LinkedIn Profile</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nominee.linkedInProfile}
                    onChange={e => setNominee({ ...nominee, linkedInProfile: e.target.value })}
                  />
                </div>
              </div>
              {/* <div>
                <label className="block mb-1 text-white">Email</label>
                <input type="email" className="input" value={nominee.email} onChange={e => setNominee({ ...nominee, email: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 text-white">Phone</label>
                <input type="tel" className="input" value={nominee.phone} onChange={e => setNominee({ ...nominee, phone: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 text-white">Roll Number</label>
                <input className="input" value={nominee.rollNo} onChange={e => setNominee({ ...nominee, rollNo: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 text-white">Course</label>
                <select className="input" value={nominee.course} onChange={e => setNominee({ ...nominee, course: e.target.value })}>
                  {courses.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-white">Graduation Year</label>
                <input type="number" className="input" value={nominee.graduationYear} onChange={e => setNominee({ ...nominee, graduationYear: Number(e.target.value) })} required />
              </div>
              <div>
                <label className="block mb-1 text-white">Relationship</label>
                <input className="input" value={nominee.relationshipWithNominator} onChange={e => setNominee({ ...nominee, relationshipWithNominator: e.target.value })} required />
              </div>
              <div>
                <label className="block mb-1 text-white">Current Employment</label>
                <input className="input" value={nominee.currentEmployment} onChange={e => setNominee({ ...nominee, currentEmployment: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-white">LinkedIn Profile</label>
                <input type="url" className="input" value={nominee.linkedInProfile} onChange={e => setNominee({ ...nominee, linkedInProfile: e.target.value })} />
              </div> */}
            </>
          )}

          <div className="space-y-4">
            {criteria.map(c => (
              <div key={c.id}>
                <label className="block mb-1 text-white font-medium">{c.text}</label>
                <textarea
                  value={answers[c.id] ?? ''}
                  onChange={handleAnswerChange(c.id)}
                  required
                  className="w-full px-4 py-2 rounded bg-[#333A5c] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:opacity-90 transition"
          >
            Submit Nomination
          </button>
        </form>
      </div >
    </div >
  );
};

export default NominationForm;
