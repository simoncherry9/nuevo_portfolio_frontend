export interface Experience {
    id?: number; 
    title: string;
    company: string;
    startDate: string;
    endDate?: string | null;
    description?: string;
    isActive: number;
    createdAt: string;
  }
  