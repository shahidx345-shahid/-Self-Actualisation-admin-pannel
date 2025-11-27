"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, FileText, Music, Video } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    { label: "Total Users", value: "2,547", icon: Users, color: "bg-blue-100" },
    { label: "Audio Files", value: "156", icon: Music, color: "bg-purple-100" },
    { label: "Articles", value: "89", icon: FileText, color: "bg-green-100" },
    { label: "Video Files", value: "73", icon: Video, color: "bg-pink-100" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="p-8 md:p-10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon size={22} className="md:w-7 md:h-7 text-primary" />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
