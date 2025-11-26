"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Play, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AddVideoModal } from "@/components/modals/add-video-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"

export function VideoSection() {
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [showDeleteVideo, setShowDeleteVideo] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<{id: number, title: string} | null>(null)
  const videos = [
    {
      id: 1,
      title: "Introduction to Self-Actualisation",
      duration: "24:15",
      category: "Course",
      status: "Published",
      views: 8945,
    },
    {
      id: 2,
      title: "Goal Setting Framework",
      duration: "18:30",
      category: "Training",
      status: "Published",
      views: 5678,
    },
    { id: 3, title: "Personal Values Workshop", duration: "32:10", category: "Workshop", status: "Draft", views: 234 },
    { id: 4, title: "Success Stories", duration: "15:45", category: "Testimonial", status: "Published", views: 12450 },
    { id: 5, title: "Advanced Techniques", duration: "28:20", category: "Course", status: "Published", views: 3456 },
  ]

  return (
    <>
      <AnimatePresence>
        <AddVideoModal isOpen={showAddVideo} onClose={() => setShowAddVideo(false)} />
      </AnimatePresence>

      <AnimatePresence>
        {selectedVideo && (
          <DeleteConfirmationModal
            isOpen={showDeleteVideo}
            onClose={() => setShowDeleteVideo(false)}
            onConfirm={() => setShowDeleteVideo(false)}
            title="Delete Video"
            itemName={selectedVideo.title}
            itemType="video"
          />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search videos..." className="pl-10" />
        </div>
        <Button onClick={() => setShowAddVideo(true)} className="w-full sm:w-auto gap-2 cursor-pointer">
          <Plus size={18} />
          Upload Video
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Views</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {videos.map((video) => (
                <motion.tr
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "rgb(0, 0, 0, 0.02)" }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground">{video.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{video.duration}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{video.category}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{video.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        video.status === "Published" ? "bg-accent/20 text-accent" : "bg-secondary/50 text-foreground"
                      }`}
                    >
                      {video.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-primary/10 rounded transition-colors text-primary cursor-pointer">
                        <Play size={16} />
                      </button>
                      <button className="p-2 hover:bg-secondary/50 rounded transition-colors text-foreground cursor-pointer">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { setSelectedVideo({id: video.id, title: video.title}); setShowDeleteVideo(true); }} className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </motion.div>
    </>
  )
}
