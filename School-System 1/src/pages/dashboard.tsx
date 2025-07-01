import React, { useState } from "react";
import { Link } from 'react-router-dom';

// Types
type AttendanceStatus = "Present" | "Absent" | "Late";
interface Student {
  name: string;
  id: string;
  status: AttendanceStatus;
}

// Generate 100 students per grade
function generateStudents(grade: number): Student[] {
  const statuses: AttendanceStatus[] = ["Present", "Absent", "Late"];
  return Array.from({ length: 100 }, (_, i) => ({
    name: `Student ${grade}-${i + 1}`,
    id: `${grade}${(i + 1).toString().padStart(3, "0")}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
}

const initialStudents: Record<string, Student[]> = {
  "Grade 9": generateStudents(9),
  "Grade 10": generateStudents(10),
  "Grade 11": generateStudents(11),
};

const statusColor: Record<AttendanceStatus, string> = {
  Present: "bg-gray-100 text-gray-700",
  Absent: "bg-gray-100 text-red-500",
  Late: "bg-gray-100 text-yellow-500",
};

const statusOptionColor: Record<AttendanceStatus, string> = {
  Present: "#374151", // gray-700
  Absent: "#dc2626", // red-600
  Late: "#f59e0b",   // amber-500
};

const statusOptions: AttendanceStatus[] = ["Present", "Absent", "Late"];
const gradeOptions = ["Grade 9", "Grade 10", "Grade 11"];

export default function Dashboard() {
  const [students, setStudents] = useState<Record<string, Student[]>>(initialStudents);
  const [selectedGrade, setSelectedGrade] = useState<string>("Grade 9");

  const handleStatusChange = (grade: string, idx: number, newStatus: AttendanceStatus) => {
    setStudents(prev => {
      const updated = { ...prev };
      updated[grade] = updated[grade].map((student, i) =>
        i === idx ? { ...student, status: newStatus } : student
      );
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-bold text-lg flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-red-600 rounded-sm" />
            El Sewedy
          </span>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li><Link to="/dashboard" className="hover:text-red-600">Dashboard</Link></li>
            <li><Link to="/students" className="hover:text-red-600">Students</Link></li>
            <li><Link to="/attendance" className="hover:text-red-600">Attendance</Link></li>
            <li><Link to="#" className="hover:text-red-600">Reports</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              style={{ width: 120 }}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"/></svg>
            </span>
          </div>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-8 h-8 rounded-full border" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Dashboard</h1>
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="grade-select" className="font-medium">Select Grade:</label>
          <select
            id="grade-select"
            className="px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
          >
            {gradeOptions.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search students by name or ID"
            className="w-full px-4 py-3 rounded bg-white border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">{selectedGrade}</h2>
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-medium text-gray-500">Student Name</th>
                  <th className="py-3 px-4 font-medium text-gray-500">Student ID</th>
                  <th className="py-3 px-4 font-medium text-gray-500">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {students[selectedGrade].map((student, idx) => (
                  <tr key={student.id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-red-600 underline cursor-pointer">{student.id}</td>
                    <td className="py-3 px-4">
                      <select
                        className={`px-4 py-1 rounded focus:outline-none bg-gray-100 focus:ring-2 focus:ring-red-500`}
                        style={{ color: statusOptionColor[student.status] }}
                        value={student.status}
                        onChange={e => handleStatusChange(selectedGrade, idx, e.target.value as AttendanceStatus)}
                      >
                        {statusOptions.map(option => (
                          <option
                            key={option}
                            value={option}
                            style={{ color: statusOptionColor[option] }}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 