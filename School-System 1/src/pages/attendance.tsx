import type { AttendanceStatus } from '../context/StudentContext';
import React from "react";
import { Link } from 'react-router-dom';
import { useStudentContext } from '../context/StudentContext';

const statusColor: Record<AttendanceStatus, string> = {
  Present: "bg-gray-100 text-gray-700 font-semibold",
  Absent: "bg-gray-100 text-red-500 font-semibold",
  Late: "bg-gray-100 text-yellow-500 font-semibold",
  Permissioned: "bg-gray-100 text-blue-500 font-semibold",
};

const gradeOptions = ["Grade 9", "Grade 10", "Grade 11"];

export default function Attendance() {
  const { students, selectedGrade, setSelectedGrade } = useStudentContext();
  const records = students[selectedGrade] || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-8">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between w-full max-w-6xl mb-8">
        <div className="flex items-center gap-8">
          <span className="font-bold text-lg flex items-center gap-2">
            <span className="inline-block w-4 h-4 bg-black rounded-sm" />
            123 School
          </span>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/attendance" className="hover:text-primary">Attendance</Link></li>
            <li><Link to="/reports" className="hover:text-primary">Reports</Link></li>
            <li><Link to="#" className="hover:text-primary">Settings</Link></li>
          </ul>
        </div>
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-8 h-8 rounded-full border" />
      </nav>
      <main className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Daily Attendance</h1>
        <p className="text-blue-500 mb-6">Overview of student attendance for today</p>
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="grade-select" className="font-medium">Select Grade:</label>
          <select
            id="grade-select"
            className="px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
          >
            {gradeOptions.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 font-medium text-gray-500">Student Name</th>
                <th className="py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 font-medium text-gray-500">Arrival Time</th>
                <th className="py-3 px-4 font-medium text-gray-500">Reason for Lateness</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => (
                <tr key={rec.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4">{rec.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-4 py-1 rounded-full text-sm ${statusColor[rec.status]}`}>{rec.status}</span>
                  </td>
                  <td className="py-3 px-4 text-blue-600 underline cursor-pointer">{rec.arrivalTime}</td>
                  <td className="py-3 px-4 text-blue-500">{rec.reasonForLateness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
} 