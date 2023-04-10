import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { PostsDataResponse } from 'types'

interface PostsState {
  postsData: PostsDataResponse
}

const initialState: PostsState = {
  postsData: {
    count: 0,
    next: '',
    previous: null,
    results: []
  }
}

export const postSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPostsData: (
      state,
      { payload: { postsData } }: PayloadAction<PostsState>
    ) => {
      state.postsData = postsData
    }
  }
})

export const { setPostsData } = postSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.userName

export default postSlice.reducer
