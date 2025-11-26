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
    const savedSection = localStorage.getItem("activeSection")
    if (savedSection) {
      setActiveSection(savedSection)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("activeSection", activeSection)
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
