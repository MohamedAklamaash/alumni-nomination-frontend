"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/constants/backend"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Profile {
  phone?: string
  linkedInProfile?: string
  resumeUrl?: string
}

interface Answer {
  id: string
  criteria: { text: string }
  response: string
}

interface Nominee {
  email: string
}

interface Nomination {
  id: string
  nomineeType: string
  nominatedYear: string
  nominatedEmail: string
  nominee?: Nominee
  answers: Answer[]
}

interface User {
  id: string
  firstName: string
  lastName?: string
  email: string
  role: string
  profile?: Profile
  nominations: Nomination[]
}

interface NominationStats {
  email: string
  nominationCount: number
}

interface Stats {
  totalUsers: number
  totalNominations: number
  nominationsByType: { [key: string]: number }
  nominationsByYear: { [key: string]: number }
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<{ [key: string]: string }>({})
  const [nominationStats, setNominationStats] = useState<NominationStats[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalNominations: 0,
    nominationsByType: {},
    nominationsByYear: {},
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      toast.error("Please login to continue.")
      navigate("/login")
      return
    }
    ; (async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (resp.data.role !== "ADMIN") {
          toast.error("Only admins can access this page.")
          navigate("/home/dashboard")
        }
      } catch (err) {
        toast.error("Error fetching user profile.")
        navigate("/login")
      }
    })()
  }, [navigate])

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) return

    const fetchData = async () => {
      try {
        const res = await axios.get<User[]>(`${BACKEND_URL}/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUsers(res.data)

        const nominationRes = await axios.get<NominationStats[]>(`${BACKEND_URL}/admin/nominations`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setNominationStats(nominationRes.data)

        const tabState: { [key: string]: string } = {}
        res.data.forEach((user: User) => {
          if (user.nominations) {
            user.nominations.forEach((nom: Nomination) => {
              tabState[nom.id] = "answers"
            })
          }
        })
        setActiveTab(tabState)

        const nonAdminUsers = res.data.filter((u: User) => u.role !== "ADMIN")
        const allNominations = nonAdminUsers.flatMap((user: User) => user.nominations)

        const typeCount: { [key: string]: number } = {}
        allNominations.forEach((nom: Nomination) => {
          typeCount[nom.nomineeType] = (typeCount[nom.nomineeType] || 0) + 1
        })

        const yearCount: { [key: string]: number } = {}
        allNominations.forEach((nom: Nomination) => {
          yearCount[nom.nominatedYear] = (yearCount[nom.nominatedYear] || 0) + 1
        })

        setStats({
          totalUsers: nonAdminUsers.length,
          totalNominations: allNominations.length,
          nominationsByType: typeCount,
          nominationsByYear: yearCount,
        })
      } catch (err) {
        console.error("Failed to fetch admin data", err)
        toast.error("Unable to load admin data.")
      }
    }

    fetchData()
  }, [])

  const filteredUsers = users.filter((user: User) => {
    if (user.role === "ADMIN") return false

    const fullName = `${user.firstName} ${user.lastName || ""}`.toLowerCase()
    const email = user.email.toLowerCase()
    const term = searchTerm.toLowerCase()

    return fullName.includes(term) || email.includes(term)
  })

  const renderTypeChart = () => {
    const types = Object.keys(stats.nominationsByType)
    const maxCount = Math.max(...Object.values(stats.nominationsByType).map(Number))

    return (
      <div className="space-y-2">
        {types.map((type) => {
          const count = stats.nominationsByType[type]
          const percentage = maxCount ? (count / maxCount) * 100 : 0

          return (
            <div key={type} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{type}</span>
                <span>{count}</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderYearChart = () => {
    const years = Object.keys(stats.nominationsByYear).sort()
    const maxCount = Math.max(...Object.values(stats.nominationsByYear).map(Number))

    return (
      <div className="space-y-2">
        {years.map((year) => {
          const count = stats.nominationsByYear[year]
          const percentage = maxCount ? (count / maxCount) * 100 : 0

          return (
            <div key={year} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{year}</span>
                <span>{count}</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Total Users</h3>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Total Nominations</h3>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-white">{stats.totalNominations}</p>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">Nomination Types</h3>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-white">{Object.keys(stats.nominationsByType).length}</p>
            </div>
          </div>
        </div>

        {/* Nomination Stats Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Nomination Statistics by Email</h3>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-2 text-left border-b border-gray-600">Email</th>
                    <th className="px-4 py-2 text-left border-b border-gray-600">Nomination Count</th>
                  </tr>
                </thead>
                <tbody>
                  {nominationStats.map((stat, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}>
                      <td className="px-4 py-3 border-b border-gray-600">{stat.email}</td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
                          {stat.nominationCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {nominationStats.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-center text-gray-400">
                        No nomination statistics available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="12" width="6" height="8" />
                  <rect x="9" y="8" width="6" height="12" />
                  <rect x="15" y="4" width="6" height="16" />
                </svg>
                Nominations by Type
              </h3>
            </div>
            <div className="p-4">{renderTypeChart()}</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
                Nominations by Year
              </h3>
            </div>
            <div className="p-4">{renderYearChart()}</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User List */}
        {filteredUsers.map((user: User) => (
          <div key={user.id} className="bg-gray-800 border border-gray-700 rounded-lg mb-6 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <h3 className="text-white text-xl font-semibold">
                  {user.firstName} {user.lastName || ""}
                </h3>
                <span className="px-2 py-1 text-xs rounded-full border border-blue-400 text-blue-400">{user.role}</span>
              </div>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Phone:</span> {user.profile?.phone || "N/A"}
                </div>
                <div>
                  <span className="text-gray-400">LinkedIn:</span>{" "}
                  {user.profile?.linkedInProfile ? (
                    <a
                      href={user.profile.linkedInProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-400"
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Resume:</span>{" "}
                  {user.profile?.resumeUrl ? (
                    <a
                      href={user.profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-green-400"
                    >
                      Download
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>

              {user.nominations.length === 0 ? (
                <p className="text-gray-400 italic">No nominations found.</p>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Nominations ({user.nominations.length})</h3>
                  <div className="h-64 overflow-y-auto rounded-md border border-gray-700 p-1">
                    <div className="p-3 space-y-4">
                      {user.nominations.map((nom: Nomination) => (
                        <div key={nom.id} className="bg-gray-700 p-4 rounded-xl">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="px-2 py-1 text-xs rounded-md bg-gray-600 text-white">
                              {nom.nomineeType}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-md border border-gray-500 text-gray-300">
                              {nom.nominatedYear}
                            </span>
                          </div>

                          <p className="text-sm mb-1">
                            <span className="text-gray-400">Nominated Email:</span> {nom.nominatedEmail}
                          </p>
                          {nom.nominee?.email && (
                            <p className="text-sm mb-3">
                              <span className="text-gray-400">Nominee Email:</span> {nom.nominee.email}
                            </p>
                          )}

                          <div className="w-full">
                            <div className="flex border-b border-gray-600 mb-2">
                              <button
                                className={`py-2 px-4 text-sm font-medium ${activeTab[nom.id] === "answers"
                                    ? "text-white border-b-2 border-blue-500"
                                    : "text-gray-400 hover:text-white"
                                  }`}
                                onClick={() => setActiveTab({ ...activeTab, [nom.id]: "answers" })}
                              >
                                Answers
                              </button>
                            </div>

                            <div className={activeTab[nom.id] === "answers" ? "block" : "hidden"}>
                              <div className="h-40 overflow-y-auto rounded-md border border-gray-600">
                                <div className="p-3 space-y-3">
                                  {nom.answers.map((ans: Answer) => (
                                    <div key={ans.id} className="bg-gray-600 rounded-lg p-3 border border-gray-500">
                                      <p className="text-sm font-semibold text-gray-200">Criteria:</p>
                                      <p className="text-sm italic mb-2">{ans.criteria.text}</p>
                                      <p className="text-sm font-semibold text-gray-200">Response:</p>
                                      <p className="text-sm">{ans.response}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-gray-400">No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard