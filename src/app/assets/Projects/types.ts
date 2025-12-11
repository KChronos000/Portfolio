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
  demoUrl?: string;
  githubUrl?: string;
  date: string;
  issuer?: string;
  fullDescription?: string;
  features?: string[];
  details?: string[];
  technologies?: string[];
};
