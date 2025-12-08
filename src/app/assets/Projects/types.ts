export type ProjectCategory = "Web App" | "AI/ML" | "Design" | "Game";

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  category: ProjectCategory;
};
