import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { BACKEND_URL } from "@/constants/backend";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AdminUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    profile: {
        phone: string;
        linkedInProfile: string;
        resumeUrl: string;
    } | null;
    nominations: Nomination[];
}

interface Nomination {
    id: string;
    nominatedEmail: string;
    nomineeType: string;
    nominatedYear: number;
    answers: {
        response: string;
        criteria: { text: string };
    }[];
    nominee: {
        email: string;
    } | null;
}

interface NominationStat {
    email: string;
    nominationCount: number;
}

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [stats, setStats] = useState<NominationStat[]>([]);

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();
   
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

                if (user.data.role !== "ADMIN") {
                    toast.error("Only admins can access this page.");
                    navigate("/home/dashboard");
                }
            } catch (err) {
                toast.error("Error fetching user profile.");
            }
        })();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, statRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/admin`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${BACKEND_URL}/admin/nominations`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                setUsers(userRes.data);
                setStats(statRes.data);
            } catch (err) {
                console.error("Failed to fetch admin data", err);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="bg-gray-800 p-4 rounded-2xl shadow mb-10">
                <h2 className="text-xl font-semibold mb-4">Nomination Statistics</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats}>
                        <XAxis dataKey="email" tick={{ fill: '#fff', fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={100} />
                        <YAxis tick={{ fill: '#fff' }} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} labelStyle={{ color: "#fff" }} />
                        <Bar dataKey="nominationCount" fill="#60A5FA" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-gray-800 rounded-2xl p-4 shadow hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-lg font-bold mb-2">{user.firstName}</h3>
                        <p className="text-sm text-gray-300 mb-1">Email: {user.email}</p>
                        {user.profile && (
                            <>
                                <p className="text-sm text-gray-300 mb-1">Phone: {user.profile.phone}</p>
                                <p className="text-sm text-gray-300 mb-1">
                                    <a
                                        href={user.profile.linkedInProfile}
                                        className="text-blue-400 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </p>
                                <p className="text-sm text-gray-300 mb-1">
                                    <a
                                        href={user.profile.resumeUrl}
                                        className="text-green-400 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Resume
                                    </a>
                                </p>
                            </>
                        )}
                        <p className="text-sm mt-2 text-gray-400">Nominations: {user.nominations.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
