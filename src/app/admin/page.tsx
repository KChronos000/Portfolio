"use client"

import React, { useState, useEffect } from 'react'

const AdminPage = () => {
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [otherFiles, setOtherFiles] = useState<File[]>([]); // เปลี่ยนเป็น Array ของ File
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
    
    // ใส่ข้อมูล Text ทั่วไป
    body.append('id', editingId?.toString() || '');
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('fullDescription', formData.fullDescription);
    body.append('category', formData.category);
    body.append('date', formData.date);
    body.append('issuer', formData.issuer);
    body.append('demoUrl', formData.demoUrl || '');
    body.append('githubUrl', formData.githubUrl || '');

    // แปลง Array เป็น JSON string สำหรับ Field ที่เป็น Array เดิม
    body.append('tags', JSON.stringify(stringToArray(formData.tags as string)));
    body.append('technologies', JSON.stringify(stringToArray(formData.technologies as string)));
    body.append('features', JSON.stringify(stringToArray(formData.features as string)));

    // 1. จัดการรูปภาพหลัก
    if (mainFile) {
      body.append('mainImageFile', mainFile);
    } else {
      body.append('image', formData.image); // ส่ง URL เดิมถ้าไม่ได้อัปโหลดใหม่
    }

    // 2. จัดการรูปภาพอื่นๆ (Multiple)
    if (otherFiles.length > 0) {
      otherFiles.forEach((file) => {
        body.append('otherImageFiles', file); // ใช้ชื่อ key เดียวกันซ้ำๆ เพื่อส่งเป็น List
      });
    } else {
      // ถ้าไม่มีไฟล์ใหม่ ให้ส่ง path รูปเดิมไป (ต้องจัดการให้เป็น JSON string)
      const existingOthers = Array.isArray(formData.otherImages) 
        ? formData.otherImages 
        : stringToArray(formData.otherImages);
      body.append('otherImages', JSON.stringify(existingOthers));
    }

    const res = await fetch('/api/projects', {
      method: 'POST',
      body: body, // ส่ง FormData
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

  // ฟังก์ชันสำหรับเตรียมข้อมูลเพื่อแก้ไข
const handleEditClick = (project: Project) => {
  setEditingId(project.id || null);
  setFormData({
    title: project.title,
    description: project.description,
    fullDescription: project.fullDescription,
    category: project.category,
    image: project.image,
    // แปลง Array กลับเป็น String เพื่อแสดงใน Input
    otherImages: Array.isArray(project.otherImages) ? project.otherImages.join(', ') : project.otherImages,
    tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
    features: Array.isArray(project.features) ? project.features.join(', ') : project.features,
    technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
    demoUrl: project.demoUrl || '',
    githubUrl: project.githubUrl || '',
    date: project.date,
    issuer: project.issuer
  });
  // ล้างไฟล์ที่ค้างจากการเลือกครั้งก่อน
  setMainFile(null);
  setOtherFiles([]);
};

// 1. ฟังก์ชันเลือกไฟล์ (เพิ่มต่อจากของเดิม ไม่ให้ทับกัน)
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const selectedFiles = Array.from(e.target.files);
    setOtherFiles(prev => [...prev, ...selectedFiles]); // ใช้ Spread operator เพื่อรวมไฟล์เก่ากับใหม่
  }
};

// 2. ฟังก์ชันลบไฟล์เฉพาะบางรูปออกจากคิวที่จะอัปโหลด
const removeSelectedFile = (index: number) => {
  setOtherFiles(prev => prev.filter((_, i) => i !== index));
};  

// ฟังก์ชันลบโปรเจกต์
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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-300">
        Config Error: Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {!authorized ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-gray-800/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-center mb-8 bg-linear-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <form onSubmit={handleSubmitAuth} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">รหัสผ่าน</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition"
                    placeholder="••••••••"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Project Management
            </h1>
            <button 
              onClick={() => setAuthorized(false)} 
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-xl transition-all duration-200 font-medium border border-gray-700"
            >
              Logout
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 text-emerald-400">
              {editingId ? `แก้ไขโปรเจกต์ #${editingId}` : 'เพิ่มโปรเจกต์ใหม่'}
            </h3>
            
            <form onSubmit={handleSaveProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ชื่อโปรเจกต์ *</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">หมวดหมู่</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})} 
                      placeholder="เช่น Web App, Certificate" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ผู้มอบ (Issuer)</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.issuer} 
                      onChange={e => setFormData({...formData, issuer: e.target.value})} 
                      placeholder="มอบให้โดย..." 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">วันที่</label>
                    <input 
                      type="date" 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
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
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                      onChange={e => setMainFile(e.target.files?.[0] || null)} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ลิงก์ Demo (URL)</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.demoUrl} 
                      onChange={e => setFormData({...formData, demoUrl: e.target.value})} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ลิงก์ GitHub (URL)</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.githubUrl} 
                      onChange={e => setFormData({...formData, githubUrl: e.target.value})} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">คำอธิบายสั้นๆ</label>
                <input 
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">รายละเอียดฉบับเต็ม</label>
                <textarea 
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition h-24 resize-none"
                  value={formData.fullDescription} 
                  onChange={e => setFormData({...formData, fullDescription: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tags (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.tags} 
                      onChange={e => setFormData({...formData, tags: e.target.value})} 
                      placeholder="React, Node.js, CSS" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">เทคโนโลยีที่ใช้ (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.technologies} 
                      onChange={e => setFormData({...formData, technologies: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">ฟีเจอร์เด่น (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 transition"
                      value={formData.features} 
                      onChange={e => setFormData({...formData, features: e.target.value})} 
                    />
                  </div>
                  
                  {/* รูปภาพอื่นๆ */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      รูปภาพอื่นๆ (เลือกเพิ่มได้หลายครั้ง)
                    </label>
                    <input 
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                      onChange={handleFileChange} // ใช้ฟังก์ชันที่เขียนใหม่ข้างบน
                    />
                    
                    {/* ส่วนแสดงรายชื่อไฟล์ที่กำลังจะอัปโหลด */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {otherFiles.map((file, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg">
                          {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                          <button 
                            type="button"
                            onClick={() => removeSelectedFile(idx)}
                            className="hover:text-red-400 ml-1 font-bold"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      
                      {/* แสดงสถานะกรณีแก้ไขโปรเจกต์ */}
                      {otherFiles.length === 0 && editingId && (
                        <p className="text-[10px] text-gray-500 italic">ใช้รูปภาพเดิมที่มีอยู่ ({Array.isArray(formData.otherImages) ? formData.otherImages.length : 0} รูป)</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20"
                >
                  {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มโปรเจกต์'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={() => {setEditingId(null); setFormData(initialFormState)}} 
                    className="px-8 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-200"
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