import React, { useEffect, useState } from 'react'

export const Boxs = () => {
  const [boxCount, setBoxCount] = useState(11) // default = desktop, กันปัญหา hydration

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)') // ปรับ breakpoint ได้ตามต้องการ

    const updateBoxCount = () => {
      setBoxCount(mediaQuery.matches ? 5 : 11) // มือถือ = 5 กล่อง, จอใหญ่ = 11 กล่อง
    }

    updateBoxCount() // เช็คตอนโหลดครั้งแรก
    mediaQuery.addEventListener('change', updateBoxCount) // เช็คใหม่ถ้าหมุนจอ/resize

    return () => mediaQuery.removeEventListener('change', updateBoxCount)
  }, [])

  return (
    <ul className="background absolute inset-0 z-[-1]">
      {Array.from({ length: boxCount }).map((_, i) => (
        <li key={i}></li>
      ))}
    </ul>
  )
}