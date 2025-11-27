"use client"

import { useState, Suspense, lazy, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"

/* Added lazy loading for Dashboard component */
const Dashboard = lazy(() => import("@/components/dashboard").then((mod) => ({ default: mod.Dashboard })))

function DashboardFallback() {
  return (
    <div className="p-6 flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
  )
}





export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Simple client-side auth check (optional - remove if not needed)
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))
    // Uncomment below if you want to enforce authentication
    // if (!token) {
    //   window.location.href = '/login'
    //   return
    // }

    // Check URL params for section
    const params = new URLSearchParams(window.location.search)
    const sectionParam = params.get('section')
    
    if (sectionParam) {
      setActiveSection(sectionParam)
    } else {
      const savedSection = localStorage.getItem("activeSection")
      if (savedSection) {
        setActiveSection(savedSection)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("activeSection", activeSection)
      // Update URL without page reload
      const newUrl = activeSection === "dashboard" 
        ? "/" 
        : `/?section=${activeSection}`
      window.history.pushState({}, '', newUrl)
    }
  }, [activeSection, mounted])

  if (!mounted) {
    return (
      <div className="flex h-screen bg-background w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeSection={activeSection} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">
          <Suspense fallback={<DashboardFallback />}>
            <Dashboard activeSection={activeSection} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
