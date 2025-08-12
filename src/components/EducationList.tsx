import { formatDate } from "../utils/formatDate";
import ResumeSection from "./ResumeSection";

interface Education {
    degree: string;
    institution: string;
    startDate: string
    endDate: string;
}

export default function EducationList({education}: {education: Education[]}){
    return (
        <ResumeSection title="Education">
            {education.map((edu, ids) => (
                <div key={ids} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-gray 600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
            ) )}
        </ResumeSection>
    )
}