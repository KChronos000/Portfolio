"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import type { Project } from "@/app/assets/Projects/types";
import { Calendar, ExternalLink, Github, X, ChevronLeft, ChevronRight, Award, ShieldCheck, Bookmark, Globe, Copy, Check, Columns2, Rows2 } from "lucide-react";
import { Palette, Gamepad2, Grid3x3, LayoutGrid } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

const isValidUrl = (url?: string | null) => {
  if (!url) return false;
  const u = url.trim();
  if (u === "#" || u === "" || u.toLowerCase() === "n/a") return false;
  return /^https?:\/\//i.test(u);
};

const AchievementSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) {
          console.error('Fetch failed:', res.status)
          setProjects([])
          return
        }
        const data = await res.json()
        setProjects(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Fetch error:", err)
        setProjects([])
      }
    }

    fetchProjects();
  }, []);

  return (
    <main id='projects' className='w-full relative z-10 flex flex-col justify-center min-h-screen items-center bg-neutral-950 py-20 bg-grid-pattern'>
      <section className="w-full max-w-7xl px-4">
        <div className="mb-12 text-center relative">
          {/* Subtle radial gradient glow (purple/teal) behind hero title, low opacity */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[280px] sm:w-[450px] md:w-[600px] h-[120px] sm:h-[180px] md:h-[220px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(20,184,166,0.08)_50%,transparent_70%)] blur-2xl pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
            <span className='text-shadow-lg text-shadow-gray-500'>My</span>
            <span className="bg-linear-to-r from-emerald-400 to-violet-500 bg-clip-text text-transparent ml-3">Projects & Achievements</span>
          </h2>
          <p className="text-gray-400 text-lg relative z-10">ผลงาน การศึกษา และใบประกาศนียบัตร</p>
        </div>

        <AGrid projects={projects} />
      </section>
    </main>
  );
};

const AGrid = ({ projects }: { projects: Project[] }) => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalLayoutMode, setModalLayoutMode] = useState<'side' | 'top'>('side');
  const categories = ["All", "Web App", "Design", "Game", "Certificate"];
  const categoryIcons: Record<string, React.ReactNode> = {
    "All": <Grid3x3 size={18} />,
    "Design": <Palette size={18} />,
    "Game": <Gamepad2 size={18} />,
    "Certificate": <Award size={18} />,
  };

  const [desktopCols, setDesktopCols] = useState<2 | 3>(3);
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const gridColsClass = desktopCols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";


  
  
  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold
                transition-all duration-500 ease-out cursor-pointer
                ${isActive 
                  ? 'bg-linear-to-r from-emerald-400 to-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-105 border-transparent' 
                  : 'bg-neutral-900/50 text-gray-400 border border-neutral-700/50 hover:border-violet-500/50 hover:text-white hover:bg-neutral-800'
                }
              `}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:rotate-12'}`}>
                {categoryIcons[cat] || <LayoutGrid size={18} />}
              </span>
              <span className="text-sm tracking-wide">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Columns Selector */}
      <div className="hidden md:flex justify-center gap-3 mb-12">
        {[2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setDesktopCols(n as 2 | 3)}
            className={`
              group relative px-5 py-2 rounded-full text-sm font-semibold cursor-pointer
              transition-all duration-300 ease-out
              ${desktopCols === n
                  ? "bg-linear-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-500/40 scale-105 ring-2 ring-violet-500/50 border-transparent" 
                  : "bg-neutral-800/80 text-gray-400 hover:bg-neutral-700 hover:text-white border border-neutral-700/50"
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5">
                {Array.from({ length: n }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-4 rounded-full transition-all ${
                      desktopCols === n ? "bg-green-200" : "bg-gray-600 group-hover:bg-gray-400"
                    }`}
                  />
                ))}
              </span>
              {/* <span>{n}</span> */}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className={`grid grid-cols-1 ${gridColsClass} gap-8`}>
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={`${project.id}-${desktopCols}`} 
            project={project} 
            index={index}
            onShowDetails={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="text-gray-500 text-xl">ยังไม่มีผลงานในหมวดหมู่นี้</p>
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          layoutMode={modalLayoutMode}
          onChangeLayoutMode={setModalLayoutMode}
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
  onShowDetails
}: {
  project: Project;
  index: number;
  onShowDetails: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayImage = project.image;
  const isCertificate = project.category === "Certificate";

    const [canHover, setCanHover] = useState(true);

useEffect(() => {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  setCanHover(mq.matches);

  const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}, []);

  return (
    <div
      className={`group relative bg-neutral-900 border border-neutral-800/60 shadow-lg shadow-black/40 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isCertificate ? 'hover:shadow-emerald-500/10 hover:border-emerald-500/30' : 'hover:shadow-violet-500/10 hover:border-violet-500/30'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!canHover) onShowDetails();
      }}
      style={{ 
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        cursor: canHover ? 'default' : 'pointer'
      }}
    >
      {/* Holographic glowing borders for Certificates */}
      <div className={`absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`}
           style={{
             padding: '1.5px',
             backgroundImage: isCertificate 
               ? 'linear-gradient(to right, #34d399, #10b981, #6366f1)' 
               : 'linear-gradient(to right, #34d399, #8b5cf6)'
           }}
      >
        <div className="w-full h-full bg-neutral-900 rounded-2xl" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Image Section */}
        <div 
          className="relative h-56 w-full overflow-hidden rounded-t-2xl"
        >
          {displayImage ? (
            <Image
              src={displayImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
              ไม่มีรูปภาพ
            </div>
          )}

          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/40 to-transparent opacity-90" />

          {/* Special Ribbon/Badge for Achievements */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md flex items-center gap-1.5 border ${
              isCertificate 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' 
                : 'bg-neutral-950/80 text-violet-300 border-violet-500/30'
            }`}>
              {isCertificate ? <Award className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
              {project.category}
            </span>
          </div>

          {!canHover && (
            <div className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-950/60 backdrop-blur-md">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Desktop: overlay แบบเดิม hover-to-reveal ปุ่มเต็ม เฉพาะเครื่องที่ hover ได้จริง */}
          {canHover && (
            <div className={`absolute inset-0 flex items-center justify-center bg-neutral-950/40 backdrop-blur-xs transition-all duration-300 ${
              isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
              <button
                onClick={onShowDetails}
                className="px-6 py-2.5 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-linear-to-r from-teal-400 to-violet-500 hover:shadow-violet-500/40"
              >
                ดูรายละเอียด
              </button>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col grow justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-300 transition-colors duration-300">
              {project.title}
            </h3>
            
            {/* Show issuer if it's an achievement */}
            {isCertificate && project.issuer && (
              <div className="flex items-center gap-1.5 text-emerald-400/80 text-xs font-medium mb-3">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{project.issuer.replace("มอบโดย : ", "")}</span>
              </div>
            )}

            <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-neutral-850 text-gray-300 text-xs rounded-md border border-neutral-800"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-md">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({
  project,
  layoutMode,
  onChangeLayoutMode,
  onClose
}: {
  project: Project;
  layoutMode: 'side' | 'top';
  onChangeLayoutMode: (mode: 'side' | 'top') => void;
  onClose: () => void;
}) => {                                          // ← เปิดวงเล็บฟังก์ชันตรงนี้
  const allImages = [project.image, ...(project.otherImages || [])];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {                              // ← ต้องอยู่ตรงนี้ ก่อนวงเล็บปิดของฟังก์ชัน
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, []);


  const isCertificate = project.category === "Certificate";
  const hasDemo = isValidUrl(project.demoUrl);
  const hasGithub = isValidUrl(project.githubUrl);

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSideLayout = layoutMode === 'side';

  // Container layout class
  const containerClass = `grid grid-cols-1 gap-0 ${isSideLayout ? 'lg:grid-cols-12' : ''}`;

  // Left Side (Images & Gallery) layout class
  const leftSideClass = isSideLayout
    ? "lg:col-span-7 bg-neutral-950 p-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-800"
    : "lg:col-span-12 bg-neutral-950 p-6 flex flex-col justify-center border-b border-neutral-800";

  // Right Side (Info Block) layout class
  const rightSideClass = isSideLayout
    ? "lg:col-span-5 p-8 flex flex-col justify-between"
    : "lg:col-span-12 p-8 flex flex-col justify-between";

  // Main Viewer aspect ratio class
  const mainViewerClass = `relative aspect-video w-full overflow-hidden rounded-2xl cursor-zoom-in group/viewer shadow-lg ${
    isSideLayout ? 'max-h-[400px]' : 'max-h-[400px] lg:max-h-[520px]'
  }`;

  // Custom active background class for the layout toggle segment control
  const activeBgClass = isCertificate 
    ? 'bg-linear-to-r from-emerald-400 to-teal-500 text-neutral-950 shadow-md shadow-emerald-400/20 font-bold' 
    : 'bg-linear-to-r from-teal-400 to-violet-500 text-white shadow-md shadow-violet-500/20 font-bold';

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Controls Bar (Layout Selector & Close Button) */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5">
            {/* Layout Toggle - Hidden on mobile/tablet as layout is naturally stacked */}
            <div className="hidden lg:flex bg-neutral-950/80 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-md items-center gap-1">
              <button
                onClick={() => onChangeLayoutMode('side')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  isSideLayout
                    ? activeBgClass
                    : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="แสดงรูปด้านข้าง (Side-by-Side)"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>ด้านข้าง</span>
              </button>
              <button
                onClick={() => onChangeLayoutMode('top')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  !isSideLayout
                    ? activeBgClass
                    : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="แสดงรูปด้านบน (Top-to-Bottom)"
              >
                <Rows2 className="w-3.5 h-3.5" />
                <span>ด้านบน</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 bg-neutral-800/80 hover:bg-neutral-700 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer shadow-lg"
              title="ปิด"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={containerClass}>
            {/* Left Side: Images & Gallery */}
            <div className={leftSideClass}>
              {/* Main Viewer */}
              <div 
                className={mainViewerClass}
                onClick={() => setIsImageExpanded(true)}
              >
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - Full size`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2"
                />
                
                {/* Image Navigator */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(p => (p - 1 + allImages.length) % allImages.length) }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-full transition-colors backdrop-blur-xs z-10 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(p => (p + 1) % allImages.length) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-full transition-colors backdrop-blur-xs z-10 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery (Shows Event photos nicely) */}
              {allImages.length > 1 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
                    {isCertificate ? "ภาพกิจกรรม / แฟ้มสะสมงานเพิ่มเติม" : "รูปภาพผลงาน"}
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all border ${
                          i === currentImageIndex 
                            ? 'border-emerald-400 ring-2 ring-emerald-500/20 scale-105' 
                            : 'border-neutral-800 opacity-60 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <Image src={img} alt={`Thumb ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Information Block */}
            <div className={rightSideClass}>
              <div>
                {/* Category & Badge */}
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full mb-4 border ${
                  isCertificate 
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/20' 
                    : 'bg-violet-950/60 text-violet-400 border-violet-500/20'
                }`}>
                  {isCertificate ? <Award className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                  {project.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-snug">
                  {project.title}
                </h2>

                {/* Credential Block (Special for Certificates) */}
                {isCertificate ? (
                  <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 mb-6 flex flex-col gap-3">
                    {project.issuer && (
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">ผู้มอบใบประกาศนียบัตร</p>
                          <p className="text-sm font-semibold text-gray-200 leading-tight">{project.issuer.replace("มอบโดย : ", "")}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">วันที่ออกใบรับรอง</p>
                        <p className="text-sm font-semibold text-gray-200">
                          {new Date(project.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Example Credential ID support */}
                    {/* {project.id && (
                      <div className="flex items-start gap-2.5 border-t border-neutral-900 pt-2 mt-1">
                        <Bookmark className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="w-full flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-500">รหัสอ้างอิง</p>
                            <p className="text-sm font-semibold text-gray-300 font-mono">CRED-{project.id}2025</p>
                          </div>
                          <button 
                            onClick={() => handleCopyId(`CRED-${project.id}2025`)}
                            className="p-1.5 hover:bg-neutral-800 rounded-md text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="คัดลอกรหัส"
                          >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )} */}
                  </div>
                ) : (
                  /* Standard Project Info Block */
                  <div className="flex flex-col gap-2.5 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4.5 h-4.5 text-violet-400" />
                      <span>{new Date(project.date).toLocaleDateString("th-TH", { year: "numeric", month: "long" })}</span>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">คำอธิบาย</h3>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-light">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* Dynamic List: Curriculum/Learnings or Features */}
                {(project.features && project.features.length > 0) && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      {isCertificate ? " เนื้อหาและหัวข้อหลักในการฝึกอบรม" : "💡 ฟีเจอร์เด่น / ระบบหลัก"}
                    </h3>
                    <ul className="space-y-1.5">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isCertificate ? 'bg-emerald-400' : 'bg-violet-400'}`} />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies / Skills Used */}
                {(project.technologies && project.technologies.length > 0) && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      {isCertificate ? "ทักษะที่ได้ฝึกฝน & เครื่องมือ" : "เทคโนโลยีที่เลือกใช้"}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 text-xs rounded-lg font-medium border ${
                            isCertificate 
                              ? 'bg-emerald-950/20 text-emerald-300 border-emerald-500/20' 
                              : 'bg-violet-950/20 text-violet-300 border-violet-500/20'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-neutral-800">
                {isCertificate && project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 w-full bg-linear-to-r from-emerald-400 to-teal-500 text-neutral-950 font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer"
                  >
                    <Globe className="w-4.5 h-4.5" />
                    ลิงก์
                  </a>
                ) : (
                  <>
                    {hasDemo && (
                      <a
                        href={project.demoUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 flex-1 bg-linear-to-r from-teal-400 to-violet-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4.5 h-4.5" />
                        View Project
                      </a>
                    )}

                    {hasGithub && (
                      <a
                        href={project.githubUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 flex-1 bg-neutral-800 hover:bg-neutral-750 text-white font-bold rounded-xl border border-neutral-700 hover:border-violet-500/30 transition-all cursor-pointer"
                      >
                        <Github className="w-4.5 h-4.5" />
                        Source Code
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Lightbox */}
      {isImageExpanded && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsImageExpanded(false)}
        >
          <button
            onClick={() => setIsImageExpanded(false)}
            className="absolute top-5 right-5 z-20 p-3 bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Zoomed`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 5px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 9px;
        }
      `}</style>
    </>
  );
};

export default AchievementSection;