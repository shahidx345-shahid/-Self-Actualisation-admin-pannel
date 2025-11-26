"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Play, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AddAudioModal } from "@/components/modals/add-audio-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"

export function AudioSection() {
  const [showAddAudio, setShowAddAudio] = useState(false)
  const [showDeleteAudio, setShowDeleteAudio] = useState(false)
  const [selectedAudio, setSelectedAudio] = useState<{id: number, title: string} | null>(null)
  const audioFiles = [
    { id: 1, title: "Meditation Guide", duration: "12:34", category: "Wellness", status: "Published", plays: 4250 },
    {
      id: 2,
      title: "Self-Reflection Session",
      duration: "8:45",
      category: "Coaching",
      status: "Published",
      plays: 2890,
    },
    { id: 3, title: "Goal Setting Workshop", duration: "15:20", category: "Development", status: "Draft", plays: 156 },
    { id: 4, title: "Motivation Talk", duration: "10:15", category: "Inspiration", status: "Published", plays: 5620 },
    { id: 5, title: "Values Exploration", duration: "9:30", category: "Development", status: "Published", plays: 1890 },
  ]

  return (
    <>
      <AnimatePresence>
        <AddAudioModal isOpen={showAddAudio} onClose={() => setShowAddAudio(false)} />
      </AnimatePresence>

      <AnimatePresence>
        {selectedAudio && (
          <DeleteConfirmationModal
            isOpen={showDeleteAudio}
            onClose={() => setShowDeleteAudio(false)}
            onConfirm={() => setShowDeleteAudio(false)}
            title="Delete Audio"
            itemName={selectedAudio.title}
            itemType="audio"
          />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search audio files..." className="pl-10" />
        </div>
        <Button onClick={() => setShowAddAudio(true)} className="w-full sm:w-auto gap-2 cursor-pointer">
          <Plus size={18} />
          Upload Audio
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Plays</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {audioFiles.map((audio) => (
                <motion.tr
                  key={audio.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "rgb(0, 0, 0, 0.02)" }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground">{audio.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{audio.duration}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{audio.category}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{audio.plays.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        audio.status === "Published" ? "bg-accent/20 text-accent" : "bg-secondary/50 text-foreground"
                      }`}
                    >
                      {audio.status}
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
                      <button onClick={() => { setSelectedAudio({id: audio.id, title: audio.title}); setShowDeleteAudio(true); }} className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive cursor-pointer">
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
