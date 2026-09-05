"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { ProjectCategory } from "@/app/api/projects/route";
export const dynamic = 'force-dynamic'
import Link from 'next/link'
const AdminPage = () => {
useEffect(() => {
  fetch('/api/auth/check').then(res => setAuthorized(res.ok))
}, [])
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [otherFiles, setOtherFiles] = useState<File[]>([]);
  const [isDateText, setIsDateText] = useState(false);
  const initialFormState = {
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    image: '',
    otherImages: [] as string[],
    tags: '',
    features: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    date: '',
    startDate: '',
    endDate: '',
    durationValue: '',
    durationUnit: '',
    issuer: '',
    rank: '',
    level: '',
    organizer: ''
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
  order_index?: number;
  startDate?: string;
  endDate?: string;
  durationValue?: string;
  durationUnit?: string;
  rank?: string;      
  level?: string;
  organizer?: string;
}

  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    if (authorized) fetchProjects()
  }, [authorized])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' })
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

const handleSubmitAuth = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthorized(true)
      setError('')
    } else {
      setError('รหัสผ่านไม่ถูกต้อง')
    }
  } catch (err) {
    console.error('Auth error:', err)
    setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
  }
}

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setAuthorized(false)
    }
  }

  const handleMove = async (id: number, direction: 'up' | 'down') => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return;
  if (direction === 'up' && index === 0) return;
  if (direction === 'down' && index === projects.length - 1) return;

  const newProjects = [...projects];
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  
  // สลับตำแหน่งใน Array (Local State เพื่อความลื่นไหล)
  [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
  setProjects(newProjects);

  // ส่งข้อมูลลำดับใหม่ทั้งหมดไปที่ API (แนะนำให้สร้าง API เฉพาะสำหรับ Reorder)
  try {
    await fetch('/api/projects/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        orders: newProjects.map((p, idx) => ({ id: p.id, order_index: idx })) 
      })
    });
  } catch (err) {
    console.error("Reorder error:", err);
    fetchProjects(); // ถ้า Error ให้โหลดข้อมูลจริงกลับมา
  }
};

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
    body.append('rank', formData.rank || '');
    body.append('level', formData.level || '');

    body.append('tags', JSON.stringify(stringToArray(formData.tags as string)));
    body.append('technologies', JSON.stringify(stringToArray(formData.technologies as string)));
    body.append('features', JSON.stringify(stringToArray(formData.features as string)));
    body.append('startDate', formData.startDate || '');
    body.append('endDate', formData.endDate || '');
    body.append('durationValue', formData.durationValue || '');
    body.append('durationUnit', formData.durationUnit || '');
    body.append('organizer', formData.organizer || '')

    if (mainFile) {
      body.append('mainImageFile', mainFile);
    } else {
      body.append('image', formData.image);
    }

const existingOthers = Array.isArray(formData.otherImages)
  ? formData.otherImages
  : stringToArray(formData.otherImages as string);
body.append('otherImages', JSON.stringify(existingOthers));

otherFiles.forEach((file) => {
  body.append('otherImageFiles', file);
});

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
  const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(project.date || '');
  setIsDateText(!isValidDateFormat && !!project.date);  setEditingId(project.id || null);
  setFormData({
    title: project.title || '',
    description: project.description || '',
    fullDescription: project.fullDescription || '',
    category: project.category || '',
    image: project.image || '',
    otherImages: Array.isArray(project.otherImages)
      ? project.otherImages
      : project.otherImages ? stringToArray(project.otherImages) : [],
    tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags || '',
    features: Array.isArray(project.features) ? project.features.join(', ') : project.features || '',
    technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies || '',
    demoUrl: project.demoUrl || '',
    githubUrl: project.githubUrl || '',
    date: project.date || '',
    issuer: project.issuer || '',
    startDate: project.startDate || '',
    endDate: project.endDate || '',
    durationValue: project.durationValue || '',
    durationUnit: project.durationUnit || '',
    rank: project.rank || '',     
    level: project.level || '',
    organizer: project.organizer || '',
  });
  setMainFile(null);
  setOtherFiles([]);
};

  const removeExistingImage = (index: number) => {
    // ตรวจสอบว่าถ้าเป็น string ให้แปลงเป็น array ก่อน (ป้องกันตัวแดง)
    const currentImages = Array.isArray(formData.otherImages) 
      ? formData.otherImages 
      : stringToArray(formData.otherImages as string);
    
    const updatedImages = currentImages.filter((_, i) => i !== index);
    
    // อัปเดตกลับไปเป็น Array (TypeScript อาจจะฟ้องถ้า initial state บอกว่าเป็น string)
    setFormData({ ...formData, otherImages: updatedImages });
  };

  // เพิ่มฟังก์ชันนี้ต่อจาก removeExistingImage
  const removeMainImage = () => {
    setFormData({ ...formData, image: '' }); // ล้าง URL รูปเดิมใน state
    setMainFile(null); // ล้างไฟล์ใหม่ที่อาจจะเลือกค้างไว้
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-slate-900 to-black text-gray-900 dark:text-white">
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
                  className="w-full bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-gray-900 dark:text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02]"
                >
                  เข้าสู่ระบบ
                </button>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}
              </form>
              {/* ปุ่มย้อนกลับ */}
              <Link
                href="/"
                className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900/60 border border-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition-all duration-300 backdrop-blur-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                หน้าแรก
              </Link>
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
            {/* Button Group */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 px-5 py-2.5 rounded-xl transition-all duration-200 font-medium border border-gray-700/50 hover:border-gray-600 backdrop-blur-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                หน้าหลัก
              </Link>

              {/* ปุ่ม Logout */}
              <button 
                onClick={handleLogout} 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2.5 rounded-xl transition-all duration-200 font-medium border border-red-500/20 hover:border-red-500/40 backdrop-blur-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
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
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
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
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value as ProjectCategory})}
                    >
                      <option value="" disabled>เลือกหมวดหมู่</option>
                      <option value="Web App">Web App</option>
                      <option value="Design">Design</option>
                      <option value="Game">Game</option>
                      <option value="Certificate">Certificate</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-blue-400 rounded-full"></span>
                      ผู้มอบ (Issuer)
                    </label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.issuer || ""}
                      onChange={e => setFormData({...formData, issuer: e.target.value})} 
                      placeholder="มอบให้โดย..." 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-teal-400 rounded-full"></span>
                      หน่วยงานผู้จัด
                    </label>
                    <input
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2"
                      value={formData.organizer}
                      onChange={e => setFormData({ ...formData, organizer: e.target.value })}
                      placeholder="เช่น วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                        <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
                        อันดับ/ผลรางวัล
                      </label>
                      <select
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2"
                        value={formData.rank}
                        onChange={e => setFormData({ ...formData, rank: e.target.value })}
                      >
                        <option value="">ไม่ระบุ</option>
                        <option value="เข้าร่วม">เข้าร่วม</option>
                        <option value="ผ่านเข้ารอบ">ผ่านเข้ารอบ / ผ่านการคัดเลือก</option>
                        <option value="ผ่านการคัดเลือก">ผ่านการคัดเลือก</option>
                        <option value="ผ่าน">ผ่าน</option>
                        <option value="ผ่านการทดสอบ">ผ่านการทดสอบ</option>
                        <option value="รางวัลชมเชย">รางวัลชมเชย</option>
                        <option value="รองชนะเลิศอันดับ 2">รองชนะเลิศอันดับ 2</option>
                        <option value="รองชนะเลิศอันดับ 1">รองชนะเลิศอันดับ 1</option>
                        <option value="ชนะเลิศ">ชนะเลิศ / อันดับ 1</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2  items-center gap-2">
                        <span className="w-1 h-4 bg-rose-400 rounded-full"></span>
                        ระดับการแข่งขัน
                      </label>
                      <select
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2"
                        value={formData.level}
                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                      >
                        <option value="">ไม่ระบุ</option>
                        <option value="ระดับสถาบัน/โรงเรียน">ระดับสถาบัน/โรงเรียน</option>
                        <option value="ระดับเขตพื้นที่การศึกษา">ระดับเขตพื้นที่การศึกษา</option>
                        <option value="อำเภอ">ระดับอำเภอ</option>
                        <option value="ระดับจังหวัด">ระดับจังหวัด</option>
                        <option value="ระดับภาค">ระดับภาค</option>
                        <option value="ระดับภาค/จังหวัด">ระดับภาค/จังหวัด</option>
                        <option value="ระดับชาติ">ระดับชาติ</option>
                        <option value="ระดับนานาชาติ">ระดับนานาชาติ</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-pink-400 rounded-full"></span>
                      ช่วงวันที่
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                      <input
                        type="date"
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                 <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-yellow-400 rounded-full"></span>
                    วันที่ (แสดงหน้าเว็บ)
                  </span>
                  <span className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, date: '' })}
                      className="text-xs text-red-400 hover:text-red-300 underline"
                    >
                      ล้างค่า
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDateText(!isDateText)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                    >
                      {isDateText ? 'สลับเป็นเลือกวันที่' : 'สลับเป็นพิมพ์ข้อความ'}
                    </button>
                  </span>
                </label>
                <input
                  type={isDateText ? 'text' : 'date'}
                  className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder={isDateText ? 'เช่น ฤดูร้อน 2568 หรือ ต้นปี 2569' : ''}
                />
              </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-orange-400 rounded-full"></span>
                      ระยะเวลาที่ใช้ทำ
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        min="0"
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        value={formData.durationValue}
                        onChange={(e) => setFormData({ ...formData, durationValue: e.target.value })}
                        placeholder="เช่น 2"
                      />
                      <select
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        value={formData.durationUnit}
                        onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value })}
                      >
                        <option value="">เลือกหน่วย</option>
                        <option value="ชม.">ชั่วโมง</option>
                        <option value="วัน">วัน</option>
                        <option value="สัปดาห์">สัปดาห์</option>
                        <option value="เดือน">เดือน</option>
                      </select>
                    </div>
                  </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 items-center gap-2">
                      <span className="w-1 h-4 bg-cyan-400 rounded-full"></span>
                      รูปภาพหลัก (Upload)
                    </label>

                    {(mainFile || (formData.image && formData.image.trim() !== "")) ? (
                      <div className="relative w-40 h-40 mb-4 group">
                        <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                          <Image 
                            src={mainFile ? URL.createObjectURL(mainFile) : formData.image} 
                            alt="Main Preview" 
                            fill 
                            className="object-cover" 
                          />
                          <div className="absolute inset-0 bg-white dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-[10px] text-gray-900 dark:text-white font-medium uppercase tracking-wider">
                              {mainFile ? 'รูปภาพใหม่' : 'รูปภาพปัจจุบัน'}
                            </p>
                          </div>
                        </div>
                        
                        {/* ปุ่มลบรูปภาพหลัก */}
                        <button
                          type="button"
                          onClick={removeMainImage}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-gray-900 dark:text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg border-2 border-gray-950 transition-transform hover:scale-110"
                          title="ลบรูปภาพหลัก"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      /* แสดง Input เมื่อไม่มีรูปภาพ */
                      <div className="relative">
                        <input 
                          type="file"
                          accept="image/*"
                          className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl bg-linear-to-r file:from-cyan-500/10 file:to-blue-500/10 file:text-cyan-400 file:border file:border-cyan-500/30 hover:file:bg-cyan-500/20 file:transition-all cursor-pointer bg-gray-800/40 border border-gray-700/50 rounded-xl px-3 py-2"
                          onChange={e => setMainFile(e.target.files?.[0] || null)} 
                        />
                        <p className="text-[11px] text-gray-500 mt-2 italic">* จำเป็นต้องมีรูปภาพหลักสำหรับหน้าปกโปรเจกต์</p>
                      </div>
                    )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">ลิงก์ Demo (URL)</label>
                      <input 
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                        value={formData.demoUrl} 
                        onChange={e => setFormData({...formData, demoUrl: e.target.value})} 
                        placeholder="https://..."
                      />
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">ลิงก์ GitHub (URL)</label>
                      <input 
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                        value={formData.githubUrl} 
                        onChange={e => setFormData({...formData, githubUrl: e.target.value})} 
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">คำอธิบายสั้นๆ</label>
                <input 
                  className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="สรุปโปรเจกต์ในประโยคสั้นๆ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">รายละเอียดฉบับเต็ม</label>
                <textarea 
                  className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all h-24 resize-none placeholder-gray-500"
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
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.tags} 
                      onChange={e => setFormData({...formData, tags: e.target.value})} 
                      placeholder="React, Node.js, CSS" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">เทคโนโลยีที่ใช้ (แยกด้วยคอมม่า)</label>
                    <input 
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
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
                      className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-gray-900 
                      dark:text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                      value={formData.features} 
                      onChange={e => setFormData({...formData, features: e.target.value})} 
                      placeholder="Real-time updates, User authentication"
                    />
                  </div>
                  
                  {/* รูปภาพอื่นๆ ในโปรเจกต์ */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      จัดการรูปภาพในโปรเจกต์
                    </label>

                    {/* แสดงรูปภาพที่มีอยู่ใน Database */}
                    <div className="flex flex-wrap gap-3">
                      {(Array.isArray(formData.otherImages) 
                        ? formData.otherImages 
                        : stringToArray(formData.otherImages as string)).map((imgUrl, idx) => (
                        <div key={`existing-${idx}`} className="relative group w-24 h-24 border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                          <Image 
                            src={imgUrl} 
                            alt="project" 
                            fill
                            className="w-full h-full object-cover"
                          />
                          {/* ปุ่มลบรูปภาพเดิม */}
                          <button
                            type="button"
                            onClick={() => removeExistingImage(idx)}
                            className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-gray-900 dark:text-white rounded-full w-6 h-6 flex items-center justify-center transition-opacity"
                            title="ลบรูปนี้"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* ส่วนการเลือกรูปภาพใหม่ (อัปโหลดเพิ่ม) */}
                    <div className="relative">
                      <input 
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:bg-cyan-500/10 file:text-cyan-400 file:border-none cursor-pointer bg-gray-800/40 border border-gray-700/50 rounded-xl px-3 py-2"
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* แสดง Preview ไฟล์ใหม่ที่กำลังเลือก */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {otherFiles.map((file, idx) => (
                        <span key={`new-${idx}`} className="flex items-center gap-1.5 text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                          <span className="truncate max-w-25">{file.name}</span>
                          <button type="button" onClick={() => removeSelectedFile(idx)} className="hover:text-red-400">✕</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-gray-900 dark:text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] flex items-center justify-center gap-2"
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
                    className="px-8 bg-gray-800/80 hover:bg-gray-700/80 text-gray-900 dark:text-white font-semibold py-3.5 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600"
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
                  {projects.map((p, index) => (
                    <tr 
                      key={p.id} 
                      className="border-b border-gray-700/50 hover:bg-gray-700/20 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <div className="flex flex-col items-center gap-1">
                          {/* ปุ่มขึ้น */}
                          <button 
                            onClick={() => p.id && handleMove(p.id, 'up')}
                            disabled={index === 0}
                            className={`hover:text-cyan-400 ${index === 0 ? 'opacity-20' : ''}`}
                          >
                            ▲
                          </button>
                          <span className="text-xs font-mono">{index + 1}</span>
                          {/* ปุ่มลง */}
                          <button 
                            onClick={() => p.id && handleMove(p.id, 'down')}
                            disabled={index === projects.length - 1}
                            className={`hover:text-cyan-400 ${index === projects.length - 1 ? 'opacity-20' : ''}`}
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{p.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{p.title}</td>
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