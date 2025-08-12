import { useResumeData } from '../hooks/UseResumeData';
import PersonalInfo from '../components/PersonalInfo';
import SummarySection from '../components/SummarySection';
import ExperienceList from '../components/ExperienceList';
import EducationList from '../components/EducationList';
import SkillsList from '../components/SkillsList';
//import LoadingScreen from '../components/LoadingScreen';
export default function ResumePage() {
  const { data, isLoading, isError } = useResumeData();

  if (isLoading) return <p>Loading resume...</p>;
  if (isError) return <p>Error loading resume.</p>;
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <PersonalInfo {...data.personalInfo} />
      <SummarySection summary={data.summary} />
      <ExperienceList experiences={data.experiences} />
      <EducationList education={data.education} />
      <SkillsList skills={data.skills} />
    </div>
  );
}