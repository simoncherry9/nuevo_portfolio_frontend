export interface BlogPost {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  author: string;
  isActive: boolean;
  imageUrl?: string; 
}
