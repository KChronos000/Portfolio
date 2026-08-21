"use client"

import React, { useState, useEffect, useRef } from "react"
import { Home, Cpu, Briefcase } from "lucide-react"

export const Navbar = () => {
  const [visible, setVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initial check
    setIsModalOpen(document.body.classList.contains("modal-open"))

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsModalOpen(document.body.classList.contains("modal-open"))
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Instantly hide navbar on scroll if we are not at the very top
      if (currentScrollY > 50) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      // 2. Clear previous timeout to debounce the reappearance
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // 3. Set timeout to make navbar reappear smoothly after manual scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        setVisible(true)
      }, 500) // Reappear 500ms after scroll inactivity

      lastScrollY.current = currentScrollY

      // 4. Update active section highlight based on scroll position
      const sections = ["home", "skills", "projects"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Check if section is currently dominating the viewport
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      // Smooth scroll to the target section
      targetElement.scrollIntoView({ behavior: "smooth" })
      setActiveSection(targetId)
      
      // Temporarily keep navbar visible or handle visibility state
      setVisible(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      // Re-trigger hide scroll behavior after click smooth-scroll finishes
      scrollTimeoutRef.current = setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
  }
  

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={16} /> },
    { id: "skills", label: "Skills", icon: <Cpu size={16} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={16} /> },
  ]
  

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out select-none
        ${visible && !isModalOpen
          ? "translate-y-0 opacity-100 scale-100" 
          : "-translate-y-16 opacity-0 scale-95 pointer-events-none"
        }`}
    >
      {/* Outer Glow container */}
      <div className="relative group px-1 py-0.5 rounded-full bg-linear-to-r from-violet-500/20 via-transparent to-emerald-500/15 hover:from-violet-500/35 hover:to-emerald-500/30 transition-all duration-500 shadow-2xl">
        
        {/* Subtle background blurred pill (glassmorphism) */}
        <div className="flex items-center gap-1.5 sm:gap-4 bg-neutral-950/45 backdrop-blur-xl border border-white/10 hover:border-white/15 hover:bg-neutral-950/50 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 shadow-lg shadow-black/20">
          
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300
                  ${isActive 
                    ? "text-zinc-100" 
                    : "text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                {/* Background Active pill glow */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600/20 to-emerald-500/20 border border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.15)] transition-all duration-300"></span>
                )}
                
                {/* Icon */}
                <span className={`transition-transform duration-300 ${isActive ? "text-violet-400 scale-110" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                  {item.icon}
                </span>

                {/* Text Label */}
                <span>{item.label}</span>

                {/* Little dot under active */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
                )}
              </a>
            )
          })}

        </div>
      </div>
    </nav>
  )
}

export default Navbar
