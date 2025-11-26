"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AddUserModal } from "@/components/modals/add-user-modal"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"

export function UserManagementSection() {
  const [showAddUser, setShowAddUser] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{id: number, name: string} | null>(null)
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Admin", status: "Active" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", status: "Inactive" },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
  ]

  return (
    <>
      <AnimatePresence>
        <AddUserModal isOpen={showAddUser} onClose={() => setShowAddUser(false)} />
      </AnimatePresence>

      <AnimatePresence>
        {selectedUser && (
          <DeleteConfirmationModal
            isOpen={showDeleteUser}
            onClose={() => setShowDeleteUser(false)}
            onConfirm={() => setShowDeleteUser(false)}
            title="Delete User"
            itemName={selectedUser.name}
            itemType="user"
          />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search users..." className="pl-10 w-full text-sm md:text-base" />
        </div>
        <Button onClick={() => setShowAddUser(true)} className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-white cursor-pointer">
          <Plus size={18} />
          Add User
        </Button>
      </div>

      <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#ceeafe' }} className="border-b border-border">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Name</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-foreground hidden md:table-cell">
                  Role
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "rgb(0, 0, 0, 0.02)" }}
                  className="hover:bg-primary/5 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-foreground">{user.name}</td>
                  <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-xs md:text-sm hidden md:table-cell">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin" ? "bg-primary/20 text-primary" : "bg-gray-100 text-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-xs md:text-sm">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-primary/10 rounded transition-colors text-foreground hover:text-primary cursor-pointer">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { setSelectedUser({id: user.id, name: user.name}); setShowDeleteUser(true); }} className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive cursor-pointer">
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
