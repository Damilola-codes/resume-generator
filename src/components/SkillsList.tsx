import ResumeSection from "./ResumeSection";

interface SkillCategory{
    category: string;
    items: string[];
}

export default function SkillsList({skills}: {skills: SkillCategory[]}){
    return (
        <ResumeSection title="Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((group, idx) => (
                    <div key={idx}>
                        <h4 className="font-semibold text-gray-800">{group.category}</h4>
                        <ul className="flex flex-wrap gap-2 mt-1">{group.items.map((skill, i) => (
                            <li key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{skill}</li>
                        ))}</ul>
                    </div>
                ))}
            </div>
        </ResumeSection>
    )
}