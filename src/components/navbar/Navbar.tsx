"use client"

import React, { useState, useEffect, useRef } from "react"
import { Home, Cpu, Briefcase } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "../ThemeToggle";

export const Navbar = () => {
  const [visible, setVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tickingRef = useRef(false) // rAF throttle flag

  // --- Modal open/close watcher (unchanged, cheap) ---
  useEffect(() => {
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

  // --- Show/hide on scroll: rAF-throttled, no layout reads inside ---
  useEffect(() => {
    const handleScroll = () => {
      // Only ever schedule ONE rAF per frame, no matter how many
      // scroll events fire in between (this is what stops the jank).
      if (tickingRef.current) return
      tickingRef.current = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        setVisible((prev) => {
          const next = currentScrollY <= 50
          return prev === next ? prev : next
        })

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setVisible(true)
        }, 500)

        lastScrollY.current = currentScrollY
        tickingRef.current = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // --- Active section: IntersectionObserver instead of manual   ---
  // --- getBoundingClientRect() polling (that was forcing reflow  ---
  // --- on every scroll frame and janking the whole page).        ---
  useEffect(() => {
    const sectionIds = ["home", "skills", "projects"]
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the "trigger line" (250px from top)
        // among the ones currently intersecting.
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          const topMost = visibleEntries.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActiveSection((prev) =>
            prev === topMost.target.id ? prev : topMost.target.id
          )
        }
      },
      {
        // Trigger line ~250px from the top of the viewport,
        // matching the original rect.top <= 250 && rect.bottom >= 250 logic.
        rootMargin: "-250px 0px -50% 0px",
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
      setActiveSection(targetId)

      setVisible(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)] transition-[transform,opacity] duration-500 ease-out select-none will-change-transform
        ${visible && !isModalOpen
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-16 opacity-0 scale-95 pointer-events-none"
        }`}
    >
      {/* Outer Glow container */}
      <div className="relative group px-1 py-0.5 rounded-full bg-linear-to-r from-violet-500/20 via-transparent to-emerald-500/15 hover:from-violet-500/35 hover:to-emerald-500/30 transition-colors duration-500 shadow-2xl">

        {/* Subtle background blurred pill (glassmorphism) */}
        <div className="flex items-center gap-1.5 sm:gap-4 bg-white/70 dark:bg-neutral-950/45 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:border-violet-500/20 dark:hover:border-white/15 hover:bg-white/90 dark:hover:bg-neutral-950/50 px-4 sm:px-6 py-2.5 rounded-full transition-colors duration-500 shadow-lg shadow-black/10 dark:shadow-black/20">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300
                ${isActive
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-600"
                }`}
              >
                {/* Background Active pill glow */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600/20 to-emerald-500/20 border border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.15)] transition-colors duration-300"></span>
                )}

                {/* Icon */}
                <span className={`transition-transform duration-300 ${isActive ? "text-violet-500 dark:text-violet-400 scale-110" : "text-zinc-500 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200"}`}>                  {item.icon}
                </span>

                {/* Text Label */}
                <span>{item.label}</span>

                {/* Little dot under active */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
                )}
              </Link>
            )
          })}
          <ThemeToggle />

        </div>
      </div>
    </nav>
  )
}

export default Navbar