export type ProjectCategory = "Web App" | "AI/ML" | "Design" | "Game";

export type Project = {
 id: number;
  title: string;
  description: string;
  image: string;
  otherImages?: string[]; // <- ถ้าใช้ otherImages ด้วย อย่าลืมใส่
  category: "Web App" | "Design" | "Game" | "Certificate";
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  date: string;
  issuer?: string; // ✅ แก้ตรงนี้ ให้เป็น optional ก็ได้
  fullDescription?: string;
  features?: string[];
  details?: string[];
  technologies?: string[];

};
