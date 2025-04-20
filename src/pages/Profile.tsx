import { BACKEND_URL } from "@/constants/backend";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UploadResponse = {
  fileId: string;
  url: string;
};

type ProfileBody = {
  phone: string;
  course: string;
  graduationYear: number;
  rollNo: string;
  companyName?: string;
  designation?: string;
  linkedInProfile?: string;
  resumeUrl: string;
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

const Profile = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>("");
  const [course, setCourse] = useState<string>(courses[0]);
  const [graduationYear, setGraduationYear] = useState<number>(new Date().getFullYear());
  const [rollNo, setRollNo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [linkedInProfile, setLinkedInProfile] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Please login to continue.");
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const response: AxiosResponse<{ isProfileComplete: boolean }> = await axios.get(
          `${BACKEND_URL}/users/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.isProfileComplete) {
          toast.error("Profile already exists.");
          navigate("/home/dashboard");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching user profile:", error.message);
        } else {
          console.error("Unknown error fetching user profile:", error);
        }
        toast.error("Error fetching user profile.");
      }
    })();
  }, [navigate]);

  /**
   * Uploads PDF to NestJS GridFS endpoint.
   * Returns the public URL (/files/:id) or null on failure.
   */
  const handleResumeUpload = async (): Promise<string | null> => {
    if (!resumeFile) return null;

    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("file", resumeFile);

      const response: AxiosResponse<UploadResponse> = await axios.post(
        `${BACKEND_URL}/pdf/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.url;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Resume upload failed:", error.message);
      } else {
        console.error("Unexpected error during resume upload:", error);
      }
      toast.error("Failed to upload resume.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    setIsLoading(true);
    try {
      const resumeUrl = await handleResumeUpload();
      if (!resumeUrl) return;

      const profileBody: ProfileBody = {
        phone,
        course,
        graduationYear,
        rollNo,
        companyName,
        designation,
        linkedInProfile,
        resumeUrl,
      };

      await axios.post(
        `${BACKEND_URL}/profiles`,
        profileBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      toast.success("Profile created successfully!");
      navigate("/home/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Profile creation failed:", error.message);
        toast.error(error.response?.data?.message || "Failed to create profile.");
      } else {
        console.error("Unexpected error creating profile:", error);
        toast.error("An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="bg-transparent outline-none w-full text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Course */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <select
              className="bg-transparent outline-none w-full text-white"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c} value={c} className="bg-slate-800">
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Graduation Year */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="number"
              placeholder="Graduation Year"
              required
              min={2000}
              max={2100}
              className="bg-transparent outline-none w-full text-white"
              value={graduationYear}
              onChange={(e) => setGraduationYear(Number(e.target.value))}
            />
          </div>

          {/* Roll Number */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="text"
              placeholder="Roll Number"
              required
              className="bg-transparent outline-none w-full text-white"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>

          {/* Company Name */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="text"
              placeholder="Company Name"
              className="bg-transparent outline-none w-full text-white"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Designation */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="text"
              placeholder="Designation"
              className="bg-transparent outline-none w-full text-white"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5c]">
            <input
              type="url"
              placeholder="LinkedIn Profile URL"
              className="bg-transparent outline-none w-full text-white"
              value={linkedInProfile}
              onChange={(e) => setLinkedInProfile(e.target.value)}
            />
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col gap-2 px-5 py-2.5 rounded-lg bg-[#333A5c]">
            <label className="text-xs text-gray-400">
              Upload Resume (PDF/DOC)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="bg-transparent text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Submit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
