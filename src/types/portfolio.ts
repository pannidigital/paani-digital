export interface Project {
    title: string;
    image: string;
    summary: string;
    details: string;
    link?: string;
}

export interface Photo {
    id: number;
    src: string;
    alt: string;
    category: string;
}

export interface Video {
    id: number;
    title: string;
    category: string;
    url?: string;
}

export interface PortfolioData {
    caseStudies: {
        store: Project[];
        website: Project[];
    };
    photos: Photo[];
    videos: Video[];
}
