import ResumeSection from './ResumeSection'

export default function SummarySection({summary}: {summary: string}){
    return (
        <ResumeSection title='Summary'>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
        </ResumeSection>
    )
}