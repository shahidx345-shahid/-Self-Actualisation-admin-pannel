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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card className="p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 hover:bg-primary/5 rounded transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">Activity {i}</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-medium">New</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
