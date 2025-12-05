import Image from 'next/image';
import React, { useState } from 'react';

const AchievementSection = () => {
  return (
    <main id='achievement' className='w-full relative z-10 flex flex-col justify-center min-h-screen items-center bg-neutral-950 py-20'>
      <section className="w-full max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className='text-shadow-lg text-shadow-gray-500'>
              My
            </span>
             <span className="bg-gradient-to-r from-teal-400 to-violet-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">ผลงานและโปรเจคที่ผมภูมิใจนำเสนอ</p>
        </div>

        <AGrid  />
      </section>
    </main>
  );
};

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "ระบบ E-Commerce เต็มรูปแบบพร้อม payment gateway และ admin dashboard",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    demoUrl: "#",
    githubUrl: "#",
    category: "Web App"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "แอปพลิเคชันจัดการงานแบบ real-time พร้อม collaboration features",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    tags: ["React", "Firebase", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
    category: "Web App"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "เว็บไซต์ portfolio แบบ interactive พร้อม animations และ 3D elements",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    tags: ["Next.js", "Three.js", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
    category: "Design"
  },
  {
    id: 4,
    title: "AI Chat Application",
    description: "แชทบอทที่ใช้ AI สำหรับตอบคำถามและช่วยเหลือผู้ใช้งาน",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    demoUrl: "#",
    githubUrl: "#",
    category: "AI/ML"
  }
];

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  category: string;
};

export const AGrid = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web App", "Design", "AI/ML"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === cat
                ? 'bg-gradient-to-r from-teal-400 to-violet-500 text-white shadow-lg shadow-violet-500/50'
                : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({
  project,
  index
}: {
  project: Project;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
           style={{ padding: '2px' }}>
        <div className="w-full h-full bg-neutral-900 rounded-2xl" />
      </div>

      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`} />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-4 py-1.5 bg-neutral-950/80 backdrop-blur-sm text-teal-400 text-sm font-medium rounded-full border border-teal-400/30">
              {project.category}
            </span>
          </div>

          {/* Action Buttons - Show on Hover */}
          <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <a
              href={project.demoUrl}
              className="px-6 py-3 bg-gradient-to-r from-teal-400 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
            >
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="px-6 py-3 bg-neutral-950/90 backdrop-blur-sm text-white font-semibold rounded-lg border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-violet-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-neutral-800 text-gray-300 text-sm rounded-full border border-neutral-700 group-hover:border-violet-500/50 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

export default AchievementSection;