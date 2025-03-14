export interface Experience {
    id?: number; // Opcional porque al crear aún no tiene ID
    title: string;
    company: string;
    startDate: string;
    endDate?: string | null;
    description?: string;
    isActive: number;
    createdAt: string;
  }
  