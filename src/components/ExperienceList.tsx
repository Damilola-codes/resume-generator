import { formatDate } from "../utils/formatDate";
import ResumeSection from "./ResumeSection";

interface Experience{
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    responsibilites: string[];
}

export default function ExperienceList({experiences}: {experiences: Experience[]}){
    return (
        <ResumeSection title="Experience">
            {experiences.map((exp: Experience) => (
                <div key={exp.id} className="mb-4">
                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">{exp.responsibilites.map((task, ids) => (
                        <li key={ids}>{task}</li>
                    ))}</ul>
                </div>
            ))}
        </ResumeSection>
    );
}