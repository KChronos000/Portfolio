import Image from 'next/image';
import React, { useState } from 'react';
import rawProjects from "@/app/assets/Projects/Projects.json";
import type { Project } from "@/app/assets/Projects/types";
import { Calendar, Tag, ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";


const projects = rawProjects as Project[];
const isValidUrl = (url?: string | null) => {
  if (!url) return false;

  const u = url.trim();
  if (u === "#" || u === "" || u.toLowerCase() === "n/a") return false;

  return /^https?:\/\//i.test(u);
};



const AchievementSection = () => {
  return (
    <main id='achievement' className='w-full relative z-10 flex flex-col justify-center min-h-screen items-center bg-neutral-950 py-20'>
      <section className="w-full max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className='text-shadow-lg text-shadow-gray-500'>
              My
            </span>
             <span className="bg-linear-to-r from-emerald-400 to-violet-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">ผลงานและโปรเจคที่ผมภูมิใจนำเสนอ</p>
        </div>

        <AGrid  />
      </section>
    </main>
  );
};

const AGrid = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ["All", "Web App", "Design", "Game", "Certificate"];
  

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
                ? 'bg-linear-to-r from-emerald-400 to-violet-500 text-white shadow-lg shadow-violet-500/50'
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
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onShowDetails={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
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
  const totalImages = project.otherImages ? project.otherImages.length + 1 : 1;

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
      <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
           style={{ padding: '2px' }}>
        <div className="w-full h-full bg-neutral-900 rounded-2xl" />
      </div>

      <div className="relative z-10">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden rounded-t-xl shadow-2xl group-hover:shadow-indigo-500/15 transition-shadow duration-500">
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`} />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-4 py-1.5 bg-neutral-950/80 backdrop-blur-sm text-teal-400 text-sm font-medium rounded-full border border-teal-400/30">
              {project.category}
            </span>
          </div>

          {/* Multiple Images Indicator */}
          {totalImages > 1 && (
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-full border border-gray-600/30">
                {totalImages} รูป
              </span>
            </div>
          )}

          {/* Action Buttons - Show on Hover */}
          <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={onShowDetails}
              className="px-6 py-3 bg-linear-to-r from-teal-400 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
            >
              Show
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-linear-to-r group-hover:from-teal-400 group-hover:to-violet-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
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

const ProjectModal = ({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) => {
  // Combine main image with other images
  const allImages = [project.image, ...(project.otherImages || [])];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const hasDemo = isValidUrl(project.demoUrl);
  const hasGithub = isValidUrl(project.githubUrl);


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 rounded-2xl shadow-2xl animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>

          {/* Hero Image with Gallery - คลิกได้ */}
          <div 
            className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl mt-2 cursor-zoom-in"
            onClick={() => setIsImageExpanded(true)}
          >
            <Image
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="w-full h-full object-contain transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-900/50 via-neutral-900/20 to-transparent pointer-events-none" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="px-4 py-1.5 bg-neutral-950/80 backdrop-blur-sm text-teal-400 text-sm font-medium rounded-full border border-teal-400/30">
                {project.category}
              </span>
            </div>

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute top-4 right-16 pointer-events-none">
                <span className="px-3 py-1.5 bg-neutral-950/80 backdrop-blur-sm text-gray-300 text-sm font-medium rounded-full border border-gray-600/30">
                  {currentImageIndex + 1} / {allImages.length}
                </span>
              </div>
            )}

            {/* Image Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-neutral-950/80 hover:bg-neutral-800 rounded-full transition-colors duration-300 backdrop-blur-sm z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-neutral-950/80 hover:bg-neutral-800 rounded-full transition-colors duration-300 backdrop-blur-sm z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
                  {allImages.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentImageIndex 
                          ? 'bg-teal-400 w-8' 
                          : 'bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="px-8 py-4 border-b border-neutral-800">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      i === currentImageIndex 
                        ? 'ring-2 ring-teal-400 scale-105' 
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Title, Date, and Issuer */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-linear-to-r from-teal-400 to-violet-500 bg-clip-text">
                {project.title}
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(project.date).toLocaleDateString(
                      "th-TH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                {project.issuer && (
                  <div className="flex items-center gap-2 text-teal-400">
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">{project.issuer}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">คำอธิบาย</h3>
              <p className="text-gray-400 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Features or Details */}
            {project.features && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">ฟีเจอร์หลัก</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.details && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">รายละเอียด</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  เทคโนโลยีที่ใช้
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-neutral-800 text-gray-300 text-sm rounded-lg border border-neutral-700 hover:border-violet-500/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {(hasDemo || hasGithub) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-neutral-800">
                {hasDemo && (
                  <a
                    href={project.demoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-teal-400 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Demo
                  </a>
                )}

                {hasGithub && (
                  <a
                    href={project.githubUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white font-semibold rounded-lg border border-neutral-700 hover:border-violet-500/50 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Image Lightbox - เปิดเต็มจอ */}
      {isImageExpanded && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsImageExpanded(false)}
        >
          <button
            onClick={() => setIsImageExpanded(false)}
            className="absolute top-4 right-4 z-10 p-3 bg-neutral-800/80 hover:bg-neutral-700 rounded-full transition-colors duration-300"
          >
            <X className="w-7 h-7 text-white" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Navigation in Lightbox */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 p-3 bg-neutral-900/80 hover:bg-neutral-800 rounded-full transition-colors duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 p-3 bg-neutral-900/80 hover:bg-neutral-800 rounded-full transition-colors duration-300 backdrop-blur-sm"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-2 bg-neutral-900/80 backdrop-blur-sm text-white text-lg font-medium rounded-full border border-gray-600/30">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(i);
                      }}
                      className={`transition-all duration-300 ${
                        i === currentImageIndex 
                          ? 'w-8 h-3 bg-teal-400 rounded-full' 
                          : 'w-3 h-3 bg-gray-500 hover:bg-gray-400 rounded-full'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thumb-neutral-700::-webkit-scrollbar-thumb {
          background-color: #404040;
          border-radius: 3px;
        }

        .scrollbar-track-neutral-900::-webkit-scrollbar-track {
          background-color: #171717;
        }
      `}</style>
    </>
  );
};

export default AchievementSection;