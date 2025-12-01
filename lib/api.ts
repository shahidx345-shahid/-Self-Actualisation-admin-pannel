import { auth } from "./auth"

const DEFAULT_API_BASE_URL = "https://self-actualization-analysis-be.vercel.app"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL

// Admin types
export type Admin = {
  id: string
  name: string
  email: string
}

type AdminLoginResponse = {
  success: boolean
  message: string
  data: {
    admin: Admin
    token: string
  }
}

type AdminMeResponse = {
  success: boolean
  data: {
    admin: Admin
  }
}

export type AdminAudio = {
  id: string
  title: string
  description?: string
  category?: string | null
  audioUrl: string
  thumbnailUrl?: string | null
  durationSeconds: number
  isActive: boolean
  sortOrder: number
  createdAt: string
}

type ApiListResponse<T> = {
  success: boolean
  page: number
  limit: number
  total: number
  data: T[]
}

type ApiErrorPayload = {
  success?: boolean
  error?: string
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  opts: { auth?: boolean } = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`

  const headers: HeadersInit = {
    ...(options.headers || {}),
  }

  // Only set JSON header if body is a string (for FormData we let the browser set boundary)
  if (!(options.body instanceof FormData)) {
    if (!("Content-Type" in headers)) {
      ;(headers as Record<string, string>)["Content-Type"] = "application/json"
    }
  }

  if (opts.auth) {
    const token = auth.getToken()
    if (token) {
      ;(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const data = (await res.json()) as ApiErrorPayload
      if (data?.error) {
        message = data.error
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message)
  }

  return (await res.json()) as T
}

const mapAudio = (raw: any): AdminAudio => ({
  id: String(raw._id ?? raw.id),
  title: String(raw.title ?? ""),
  description: raw.description ?? undefined,
  category: raw.category ?? null,
  audioUrl: String(raw.audioUrl ?? ""),
  thumbnailUrl: raw.thumbnailUrl ?? null,
  durationSeconds: Number(raw.durationSeconds ?? 0),
  isActive: Boolean(raw.isActive ?? true),
  sortOrder: Number(raw.sortOrder ?? 0),
  createdAt: String(raw.createdAt ?? new Date().toISOString()),
})

export async function fetchAdminAudios(params?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: "active" | "inactive" | "all"
}): Promise<ApiListResponse<AdminAudio>> {
  const query = new URLSearchParams()
  if (params?.page) query.set("page", String(params.page))
  if (params?.limit) query.set("limit", String(params.limit))
  if (params?.search) query.set("search", params.search)
  if (params?.category) query.set("category", params.category)
  if (params?.status) query.set("status", params.status)

  const qs = query.toString()
  const path = `/api/admin/audios${qs ? `?${qs}` : ""}`

  const res = await apiFetch<ApiListResponse<any>>(path, {}, { auth: true })
  return {
    ...res,
    data: res.data.map(mapAudio),
  }
}

type CreateAudioPayload = {
  title: string
  description?: string
  category?: string
  durationSeconds: number
  sortOrder?: number
  isActive?: boolean
  audio?: File
  thumbnail?: File
  audioUrl?: string
  thumbnailUrl?: string
}

type UpdateAudioPayload = Partial<CreateAudioPayload>

type ApiSuccessResponse<T> = {
  success: boolean
  message?: string
  data: T
}

export async function createAudio(payload: CreateAudioPayload): Promise<AdminAudio> {
  const formData = new FormData()
  
  formData.append("title", payload.title)
  if (payload.description) formData.append("description", payload.description)
  if (payload.category) formData.append("category", payload.category)
  formData.append("durationSeconds", String(payload.durationSeconds))
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder))
  if (payload.isActive !== undefined) formData.append("isActive", String(payload.isActive))
  
  if (payload.audio) formData.append("audio", payload.audio)
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail)
  if (payload.audioUrl) formData.append("audioUrl", payload.audioUrl)
  if (payload.thumbnailUrl) formData.append("thumbnailUrl", payload.thumbnailUrl)

  const res = await apiFetch<ApiSuccessResponse<any>>(
    "/api/admin/audios",
    {
      method: "POST",
      body: formData,
    },
    { auth: true }
  )

  return mapAudio(res.data)
}

export async function updateAudio(id: string, payload: UpdateAudioPayload): Promise<AdminAudio> {
  const formData = new FormData()
  
  if (payload.title) formData.append("title", payload.title)
  if (payload.description !== undefined) formData.append("description", payload.description || "")
  if (payload.category !== undefined) formData.append("category", payload.category || "")
  if (payload.durationSeconds !== undefined) formData.append("durationSeconds", String(payload.durationSeconds))
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder))
  if (payload.isActive !== undefined) formData.append("isActive", String(payload.isActive))
  
  if (payload.audio) formData.append("audio", payload.audio)
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail)
  if (payload.audioUrl !== undefined) formData.append("audioUrl", payload.audioUrl || "")
  if (payload.thumbnailUrl !== undefined) formData.append("thumbnailUrl", payload.thumbnailUrl || "")

  const res = await apiFetch<ApiSuccessResponse<any>>(
    `/api/admin/audios/${id}`,
    {
      method: "PATCH",
      body: formData,
    },
    { auth: true }
  )

  return mapAudio(res.data)
}

export async function deleteAudio(id: string): Promise<void> {
  await apiFetch<ApiSuccessResponse<void>>(
    `/api/admin/audios/${id}`,
    {
      method: "DELETE",
    },
    { auth: true }
  )
}

// Video Management APIs

export type AdminVideo = {
  id: string
  title: string
  description?: string
  category?: string | null
  videoUrl: string
  thumbnailUrl?: string | null
  durationSeconds: number
  isActive: boolean
  sortOrder: number
  createdAt: string
}

const mapVideo = (raw: any): AdminVideo => ({
  id: String(raw._id ?? raw.id),
  title: String(raw.title ?? ""),
  description: raw.description ?? undefined,
  category: raw.category ?? null,
  videoUrl: String(raw.videoUrl ?? ""),
  thumbnailUrl: raw.thumbnailUrl ?? null,
  durationSeconds: Number(raw.durationSeconds ?? 0),
  isActive: Boolean(raw.isActive ?? true),
  sortOrder: Number(raw.sortOrder ?? 0),
  createdAt: String(raw.createdAt ?? new Date().toISOString()),
})

export async function fetchAdminVideos(params?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: "active" | "inactive" | "all"
}): Promise<ApiListResponse<AdminVideo>> {
  const query = new URLSearchParams()
  if (params?.page) query.set("page", String(params.page))
  if (params?.limit) query.set("limit", String(params.limit))
  if (params?.search) query.set("search", params.search)
  if (params?.category) query.set("category", params.category)
  if (params?.status) query.set("status", params.status)

  const qs = query.toString()
  const path = `/api/admin/videos${qs ? `?${qs}` : ""}`

  const res = await apiFetch<ApiListResponse<any>>(path, {}, { auth: true })
  return {
    ...res,
    data: res.data.map(mapVideo),
  }
}

type CreateVideoPayload = {
  title: string
  description?: string
  category?: string
  durationSeconds: number
  sortOrder?: number
  isActive?: boolean
  video?: File
  thumbnail?: File
  videoUrl?: string
  thumbnailUrl?: string
}

type UpdateVideoPayload = Partial<CreateVideoPayload>

export async function createVideo(payload: CreateVideoPayload): Promise<AdminVideo> {
  const formData = new FormData()
  
  formData.append("title", payload.title)
  if (payload.description) formData.append("description", payload.description)
  if (payload.category) formData.append("category", payload.category)
  formData.append("durationSeconds", String(payload.durationSeconds))
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder))
  if (payload.isActive !== undefined) formData.append("isActive", String(payload.isActive))
  
  if (payload.video) formData.append("video", payload.video)
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail)
  if (payload.videoUrl) formData.append("videoUrl", payload.videoUrl)
  if (payload.thumbnailUrl) formData.append("thumbnailUrl", payload.thumbnailUrl)

  const res = await apiFetch<ApiSuccessResponse<any>>(
    "/api/admin/videos",
    {
      method: "POST",
      body: formData,
    },
    { auth: true }
  )

  return mapVideo(res.data)
}

export async function updateVideo(id: string, payload: UpdateVideoPayload): Promise<AdminVideo> {
  const formData = new FormData()
  
  if (payload.title) formData.append("title", payload.title)
  if (payload.description !== undefined) formData.append("description", payload.description || "")
  if (payload.category !== undefined) formData.append("category", payload.category || "")
  if (payload.durationSeconds !== undefined) formData.append("durationSeconds", String(payload.durationSeconds))
  if (payload.sortOrder !== undefined) formData.append("sortOrder", String(payload.sortOrder))
  
  if (payload.video) formData.append("video", payload.video)
  if (payload.thumbnail) formData.append("thumbnail", payload.thumbnail)
  if (payload.videoUrl !== undefined) formData.append("videoUrl", payload.videoUrl || "")
  if (payload.thumbnailUrl !== undefined) formData.append("thumbnailUrl", payload.thumbnailUrl || "")

  const res = await apiFetch<ApiSuccessResponse<any>>(
    `/api/admin/videos/${id}`,
    {
      method: "PATCH",
      body: formData,
    },
    { auth: true }
  )

  return mapVideo(res.data)
}

export async function deleteVideo(id: string): Promise<void> {
  await apiFetch<ApiSuccessResponse<void>>(
    `/api/admin/videos/${id}`,
    {
      method: "DELETE",
    },
    { auth: true }
  )
}

// Admin Authentication APIs

export type Admin = {
  id: string
  name: string
  email: string
}

type AdminLoginResponse = {
  success: boolean
  message: string
  data: {
    admin: Admin
    token: string
  }
}

type AdminMeResponse = {
  success: boolean
  data: {
    admin: Admin
  }
}

/**
 * Login admin user
 */
export async function loginAdmin(email: string, password: string): Promise<AdminLoginResponse> {
  const response = await apiFetch<AdminLoginResponse>(
    "/api/admin/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    { auth: false }
  )

  // Store token after successful login
  if (response.success && response.data.token) {
    auth.setToken(response.data.token)
  }

  return response
}

/**
 * Get current admin user
 */
export async function getCurrentAdmin(): Promise<Admin> {
  const response = await apiFetch<AdminMeResponse>(
    "/api/admin/auth/me",
    {},
    { auth: true }
  )
  return response.data.admin
}

/**
 * Register admin (optional, for initial setup)
 */
export async function registerAdmin(
  name: string,
  email: string,
  password: string
): Promise<AdminLoginResponse> {
  const response = await apiFetch<AdminLoginResponse>(
    "/api/admin/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    },
    { auth: false }
  )

  // Store token after successful registration
  if (response.success && response.data.token) {
    auth.setToken(response.data.token)
  }

  return response
}


