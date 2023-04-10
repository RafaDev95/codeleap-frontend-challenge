import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

import { PostsDataResponse } from 'types'
import SignUpModal from 'components/SignUpModal'
import MainScreen from 'layout/MainScreen'

import { getPosts } from 'actions/requests'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { setPostsData } from 'redux/slices/postsSlice'

type Props = {
  postsData: PostsDataResponse
}

export default function Home({ postsData }: Props) {
  const [user, setUser] = useState('')
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const userName = useAppSelector((state) => state.auth.userName)

  useEffect(() => {
    setUser(userName)
    setLoading(false)
    dispatch(setPostsData({ postsData }))
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="flex h-screen justify-center pt-32">
      {user ? <MainScreen /> : <SignUpModal />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const postsData = await getPosts()

  return {
    props: {
      postsData
    }
  }
}
