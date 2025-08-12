import { useQuery } from "@tanstack/react-query";
import api from '../services/api'
import { type Resume } from "../types/resume";

export function useResumeData(){
    return useQuery<Resume>({
        queryKey: ['resume'],
        queryFn: async () => {
            const {data: listData} = await api.get('/legacy/resume?page=1&limit=1');
            const resumeId = listData.data.data[0].id;
            const {data: resumeData} = await api.get(`/legacy/resume/${resumeId}`)
            if (!listData?.data?.length) {
        throw new Error("No resumes found");
            }
            return {
        personalInfo: {
          name: resumeData.personalInfo?.name || "",
          contact: resumeData.personalInfo?.contact || "",
          title: resumeData.personalInfo?.title || "",
        },
        summary: resumeData.summary || "",
        experiences: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || [],
      };
    },
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 5 * 60 * 1000
    })
}