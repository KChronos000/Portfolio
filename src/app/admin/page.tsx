"use client"

import React, { useState, useEffect } from 'react'

const AdminPage = () => {
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [otherFiles, setOtherFiles] = useState<File[]>([]);
  const initialFormState = {
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    image: '',
    otherImages: '',
    tags: '',
    features: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    date: new Date().toISOString().split('T')[0],
    issuer: ''
  }

  interface Project {
    id?: number;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    image: string;
    otherImages: string | string[];
    tags: string | string[];
    features: string | string[];
    technologies: string | string[];
    demoUrl: string | null;
    githubUrl: string | null;
    date: string;
    issuer: string;
  }

  const [formData, setFormData] = useState(initialFormState)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? ''

  useEffect(() => {
    if (authorized) fetchProjects()
  }, [authorized])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  const handleSubmitAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true)
      setError('')
    } else {
      setError('รหัสผ่านไม่ถูกต้อง')
    }
  }

  const stringToArray = (str: string) => str ? str.split(',').map(s => s.trim()).filter(s => s !== "") : []

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const body = new FormData();
    
    body.append('id', editingId?.toString() || '');
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('fullDescription', formData.fullDescription);
    body.append('category', formData.category);
    body.append('date', formData.date);
    body.append('issuer', formData.issuer);
    body.append('demoUrl', formData.demoUrl || '');
    body.append('githubUrl', formData.githubUrl || '');

    body.append('tags', JSON.stringify(stringToArray(formData.tags as string)));
    body.append('technologies', JSON.stringify(stringToArray(formData.technologies as string)));
    body.append('features', JSON.stringify(stringToArray(formData.features as string)));

    if (mainFile) {
      body.append('mainImageFile', mainFile);
    } else {
      body.append('image', formData.image);
    }

    if (otherFiles.length > 0) {
      otherFiles.forEach((file) => {
        body.append('otherImageFiles', file);
      });
    } else {
      const existingOthers = Array.isArray(formData.otherImages) 
        ? formData.otherImages 
        : stringToArray(formData.otherImages);
      body.append('otherImages', JSON.stringify(existingOthers));
    }

    const res = await fetch('/api/projects', {
      method: 'POST',
      body: body,
    });

    if (res.ok) {
      setFormData(initialFormState);
      setMainFile(null);
      setOtherFiles([]);
      setEditingId(null);
      fetchProjects();
      alert('บันทึกเรียบร้อยแล้ว');
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id || null);
    setFormData({
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      category: project.category,
      image: project.image,
      otherImages: Array.isArray(project.otherImages) ? project.otherImages.join(', ') : project.otherImages,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
      features: Array.isArray(project.features) ? project.features.join(', ') : project.features,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      date: project.date,
      issuer: project.issuer
    });
    setMainFile(null);
    setOtherFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setOtherFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setOtherFiles(prev => prev.filter((_, i) => i !== index));
  };  

  const handleDelete = async (id: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?')) return;
    
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (res.ok) {
        fetchProjects();
        alert('ลบข้อมูลเรียบร้อยแล้ว');
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!ADMIN_PASSWORD) return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-slate-900 to-black flex items-center justify-center">
      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-300">
        Config Error: Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-slate-900 to-black text-white">
      {!authorized ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-gray-900/60 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/5">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl mb-4">
                  <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h2>
                <p className="text-gray-400 text-sm mt-2">เข้าสู่ระบบเพื่อจัดการโปรเจกต์</p>
              </div>
              <form onSubmit={handleSubmitAuth} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">รหัสผ่าน</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02]"
                >
                  เข้าสู่ระบบ
                </button>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Project Management
              </h1>
              <p className="text-gray-400 text-sm">จัดการและแก้ไขโปรเจกต์ของคุณ</p>
            </div>
            <button 
              onClick={() => setAuthorized(false)} 
              className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 px-6 py-2.5 rounded-xl transition-all duration-200 font-medium border border-gray-700/50 hover:border-gray-600 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </span>
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-gray-900/60 backdrop-blur-2xl border border-gray-700/30 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-xl">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-cyan-400">
                {editingId ? `แก้ไขโปรเจกต์ #${editingId}` : 'เพิ่มโปรเจกต์ใหม่'}
              </h3>
            </div>
            
            <form onSubmit={handleSaveProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-cyan-400 rounded-full"></span>
                      ชื่อโปรเจกต์ *
                    </label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      required 
                      placeholder="ระบุชื่อโปรเจกต์"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-purple-400 rounded-full"></span>
                      หมวดหมู่
                    </label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})} 
                      placeholder="เช่น Web App, Certificate" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-blue-400 rounded-full"></span>
                      ผู้มอบ (Issuer)
                    </label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.issuer} 
                      onChange={e => setFormData({...formData, issuer: e.target.value})} 
                      placeholder="มอบให้โดย..." 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-pink-400 rounded-full"></span>
                      วันที่
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      value={formData.date} 
                      onChange={e => setFormData({...formData, date: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">รูปภาพหลัก (Upload)</label>
                    <input 
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl bg-linear-to-r file:from-cyan-500/10 file:to-blue-500/10 file:text-cyan-400 file:border file:border-cyan-500/30 hover:file:bg-cyan-500/20 file:transition-all cursor-pointer bg-gray-800/40 border border-gray-700/50 rounded-xl px-3 py-2"
                      onChange={e => setMainFile(e.target.files?.[0] || null)} 
                    />
                    {mainFile && (
                      <p className="text-xs text-cyan-400 mt-1.5 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {mainFile.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ลิงก์ Demo (URL)</label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.demoUrl} 
                      onChange={e => setFormData({...formData, demoUrl: e.target.value})} 
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ลิงก์ GitHub (URL)</label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.githubUrl} 
                      onChange={e => setFormData({...formData, githubUrl: e.target.value})} 
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">คำอธิบายสั้นๆ</label>
                <input 
                  className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="สรุปโปรเจกต์ในประโยคสั้นๆ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">รายละเอียดฉบับเต็ม</label>
                <textarea 
                  className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all h-24 resize-none placeholder-gray-500"
                  value={formData.fullDescription} 
                  onChange={e => setFormData({...formData, fullDescription: e.target.value})} 
                  placeholder="อธิบายรายละเอียดโปรเจกต์อย่างละเอียด..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tags (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.tags} 
                      onChange={e => setFormData({...formData, tags: e.target.value})} 
                      placeholder="React, Node.js, CSS" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">เทคโนโลยีที่ใช้ (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.technologies} 
                      onChange={e => setFormData({...formData, technologies: e.target.value})} 
                      placeholder="TypeScript, MongoDB, Tailwind"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ฟีเจอร์เด่น (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.features} 
                      onChange={e => setFormData({...formData, features: e.target.value})} 
                      placeholder="Real-time updates, User authentication"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      รูปภาพอื่นๆ (เลือกเพิ่มได้หลายครั้ง)
                    </label>
                    <input 
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:bg-linear-to-r file:from-cyan-500/10 file:to-blue-500/10 file:text-cyan-400 file:border file:border-cyan-500/30 hover:file:bg-cyan-500/20 file:transition-all cursor-pointer bg-gray-800/40 border border-gray-700/50 rounded-xl px-3 py-2"
                      onChange={handleFileChange}
                    />
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {otherFiles.map((file, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 text-xs bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                          <button 
                            type="button"
                            onClick={() => removeSelectedFile(idx)}
                            className="hover:text-red-400 ml-1 font-bold transition-colors"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      
                      {otherFiles.length === 0 && editingId && (
                        <p className="text-xs text-gray-500 italic">ใช้รูปภาพเดิมที่มีอยู่ ({Array.isArray(formData.otherImages) ? formData.otherImages.length : 0} รูป)</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มโปรเจกต์'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={() => {setEditingId(null); setFormData(initialFormState); setMainFile(null); setOtherFiles([])}} 
                    className="px-8 bg-gray-800/80 hover:bg-gray-700/80 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600"
                  >
                    ยกเลิก
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Projects Table */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/60">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">หัวข้อ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ประเภท</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">วันที่</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr 
                      key={p.id} 
                      className="border-b border-gray-700/50 hover:bg-gray-700/20 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">{p.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{p.title}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{p.date}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleEditClick(p)} 
                          className="mr-2 text-cyan-400 hover:text-cyan-300 border border-blue-500/30 hover:border-cyan-400/50 px-4 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                          แก้ไข
                        </button>
                        <button 
                          onClick={() => p.id && handleDelete(p.id)} 
                          className="text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-4 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage