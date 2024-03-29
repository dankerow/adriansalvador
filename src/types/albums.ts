export interface AlbumFile {
  readonly _id: string
  name: string
  url?: string
  readonly type: string
  readonly size: number
  metadata: { width: number; height: number }
  albumId: string | null
  album?: Album
  readonly createdAt: number
  readonly updatedAt: number
}

export interface Album {
  readonly _id: string
  name: string
  url?: string
  draft: boolean
  hidden: boolean
  nsfw: boolean
  favorite: boolean
  featured: boolean
  coverId: string | null
  cover?: Omit<AlbumFile, 'type' | 'size' | 'albumId' | 'album' | 'createdAt' | 'updatedAt'>
  coverFallbackId: string | null
  coverFallback?: Omit<AlbumFile, 'type' | 'size' | 'albumId' | 'album' | 'createdAt' | 'updatedAt'>
  fileCount: number
  images: AlbumFile[]
  readonly postedAt: number | null
  readonly createdAt: number
  readonly updatedAt: number
}
