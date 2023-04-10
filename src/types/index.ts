export interface PostData {
  username: string
  title: string
  content: string
}

export interface PostResponse {
  id: number
  username: string
  created_datetime: Date
  title: string
  content: string
}

export interface PostsDataResponse {
  count: number
  next: string
  previous?: string | null
  results: PostResponse[]
}
