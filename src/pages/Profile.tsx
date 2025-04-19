import { BACKEND_URL } from "@/constants/backend";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

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

const Profile = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState(courses[0]);
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear());
  const [rollNo, setRollNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [linkedInProfile, setLinkedInProfile] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please login to continue.");
      navigate("/login");
    }

    (async () => {
      try {
        const user = await axios.get(`${BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (user.data.isProfileComplete) {
          toast.error("Profile already exists.");
          navigate("/home/dashboard");
        }
      } catch (err) {
        toast.error("Error fetching user profile.");
      }
    })();
  }, []);

  const handleResumeUpload = async (): Promise<string | null> => {
    if (!resumeFile) return null;

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post(CLOUDINARY_URL, formData);
      const { public_id } = response.data;

      // Construct PDF URL explicitly to ensure it's viewable
      const pdfUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${public_id}.pdf`;
      return pdfUrl;
    } catch (err) {
      toast.error("Failed to upload resume.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    setIsLoading(true);
    try {
      const resumeUrl = await handleResumeUpload();
      if (!resumeUrl) return;

      const profileBody = {
        phone,
        course,
        graduationYear,
        rollNo,
        companyName,
        designation,
        linkedInProfile,
        resumeUrl,
      };

      const res = await fetch(`${BACKEND_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(profileBody),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile created successfully!");
        navigate("/home/dashboard");
      } else {
        toast.error(data.message || "Failed to create profile.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs same as before */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input type="tel" placeholder="Phone Number" required className="bg-transparent outline-none w-full text-white"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <select className="bg-transparent outline-none w-full text-white" value={course} onChange={(e) => setCourse(e.target.value)}>
              {courses.map((c) => (
                <option key={c} value={c} className="bg-slate-800">
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input type="number" placeholder="Graduation Year" required min={2000} max={2100}
              className="bg-transparent outline-none w-full text-white" value={graduationYear}
              onChange={(e) => setGraduationYear(Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input type="text" placeholder="Roll Number" required className="bg-transparent outline-none w-full text-white"
              value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input type="text" placeholder="Company Name" className="bg-transparent outline-none w-full text-white"
              value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input type="text" placeholder="Designation" className="bg-transparent outline-none w-full text-white"
              value={designation} onChange={(e) => setDesignation(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input type="url" placeholder="LinkedIn Profile URL" className="bg-transparent outline-none w-full text-white"
              value={linkedInProfile} onChange={(e) => setLinkedInProfile(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2 px-5 py-2.5 rounded-lg bg-[#333A5c]">
            <label className="text-xs text-gray-400">Upload Resume (PDF/DOC)</label>
            <input type="file" accept=".pdf,.doc,.docx" required onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="bg-transparent text-white" />
          </div>
          <button type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium disabled:opacity-50"
            disabled={isLoading}>
            {isLoading ? "Uploading..." : "Submit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
