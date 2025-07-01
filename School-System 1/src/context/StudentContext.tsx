import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type AttendanceStatus = "Present" | "Absent" | "Late" | "Permissioned";
export interface Student {
  name: string;
  id: string;
  status: AttendanceStatus;
  arrivalTime: string;
  reasonForLateness: string;
}

function generateStudents(grade: number): Student[] {
  const statuses: AttendanceStatus[] = ["Present", "Absent", "Late", "Permissioned"];
  const reasons = ["-", "Traffic", "Doctor's Appointment", "Overslept", "Family Emergency", "Bus Delay"];
  const times = ["9:00 AM", "9:15 AM", "8:55 AM", "-", "9:20 AM", "8:50 AM", "9:30 AM"];
  return Array.from({ length: 10 }, (_, i) => {
    const status = statuses[i % statuses.length];
    return {
      name: [
        "Ethan Harper", "Olivia Bennett", "Noah Carter", "Ava Davis", "Liam Evans",
        "Sophia Foster", "Jackson Green", "Isabella Hayes", "Lucas Ingram", "Mia Jenkins"
      ][i] || `Student ${grade}-${i + 1}`,
      id: `${grade}${(i + 1).toString().padStart(3, "0")}`,
      status,
      arrivalTime: status === "Present" || status === "Late" ? times[i % times.length] : "-",
      reasonForLateness: status === "Late" || status === "Permissioned" ? reasons[i % reasons.length] : "-",
    };
  });
}

const initialStudents: Record<string, Student[]> = {
  "Grade 9": generateStudents(9),
  "Grade 10": generateStudents(10),
  "Grade 11": generateStudents(11),
};

interface StudentContextType {
  students: Record<string, Student[]>;
  setStudents: React.Dispatch<React.SetStateAction<Record<string, Student[]>>>;
  selectedGrade: string;
  setSelectedGrade: React.Dispatch<React.SetStateAction<string>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Record<string, Student[]>>(initialStudents);
  const [selectedGrade, setSelectedGrade] = useState<string>("Grade 9");

  return (
    <StudentContext.Provider value={{ students, setStudents, selectedGrade, setSelectedGrade }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudentContext must be used within a StudentProvider");
  return context;
} 