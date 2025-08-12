export interface Resume {
    personalInfo: {
        name: string;
        title: string;
        contact: string;
    };
    summary: string;
    experiences: {
        id: string;
        jobTitle: string;
        company: string;
        startDate: string;
        endDate: string;
        responsibilities: string;
    } [];
    education: {
        degree: string;
        institution: string;
        startDate: string;
        endDate: string;
    }[];
    skills: {
        category: string;
        items: string[];
    }[];
}