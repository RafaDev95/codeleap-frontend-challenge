import axios, { AxiosResponse } from 'axios'
import { PostData, PostResponse, PostsDataResponse } from 'types'

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const createPost = async (postData: PostData): Promise<PostResponse> => {
  try {
    const createdPost: AxiosResponse<PostResponse> = await API.post(
      '',
      postData
    )

    const { data } = createdPost

    return data
  } catch (error: any) {
    return error
  }
}

export const getPosts = async (): Promise<PostsDataResponse> => {
  try {
    const posts: AxiosResponse<PostsDataResponse> = await API.get('')

    const { data } = posts

    return data
  } catch (error: any) {
    return error
  }
}

export const deletePost = async (id: number): Promise<string> => {
  try {
    await API.delete(`${id}`)

    return 'Successfully Deleted'
  } catch (error: any) {
    return error
  }
}

export const editPost = async (
  id: number,
  title: string,
  content: string
): Promise<Omit<PostData, 'username'>> => {
  try {
    const updatedPost: AxiosResponse<Omit<PostData, 'username'>> =
      await API.patch(`${id}`, { title, content })

    const { data } = updatedPost

    return data
  } catch (error: any) {
    return error.message
  }
}
