export type ProjectCategory =
  | "Web App"
  | "Design"
  | "Game"
  | "Certificate";


export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  otherImages?: string[];
  category: ProjectCategory;
  tags: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  date: string;
  issuer?: string;
  fullDescription?: string;
  features?: string[];
  details?: string[];
  technologies?: string[];
  order_index?: number;
  startDate?: string;
  endDate?: string;
  durationValue?: number | string;
  durationUnit?: string;
  rank?: string;
  level?: string;
};
