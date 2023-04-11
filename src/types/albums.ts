export interface AlbumFile {
  readonly id: string
  name: string
  url?: string
  readonly type: string
  readonly size: number
  albumId: string
  album?: object
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Album {
  readonly id: string
  name: string
  url?: string
  cover: Omit<AlbumFile, "type" | "size" | "albumId" | "album" | "createdAt" | "updatedAt">
  hidden: boolean
  nsfw: boolean
  favorite: boolean
  featured: boolean
  readonly fileCount: number
  images: AlbumFile[]
  readonly createdAt: string
  readonly updatedAt: string
}
