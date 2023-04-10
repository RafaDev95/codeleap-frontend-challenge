import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

let getLocalUserName = ''

if (typeof window !== 'undefined') {
  getLocalUserName = localStorage.getItem('codeLeap-username') || ''
}

interface AuthState {
  userName: string
}

const initialState: AuthState = {
  userName: getLocalUserName
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserName: (
      state,
      { payload: { userName } }: PayloadAction<AuthState>
    ) => {
      state.userName = userName

      localStorage.setItem('codeLeap-username', userName)
    }
  }
})

export const { saveUserName } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.userName

export default authSlice.reducer
