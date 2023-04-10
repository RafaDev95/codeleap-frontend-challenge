import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { PostComponent, SectionTitle, Input, Button } from 'components'
import { createPost } from 'actions/requests'
import { useAppSelector } from 'redux/hooks'
import { PostData, PostsDataResponse } from 'types'

const requiredPostFields = [
  {
    name: 'Title',
    placeholder: 'Hello World'
  },
  {
    name: 'Content',
    placeholder: 'Content Here'
  }
]

const MainScreen = () => {
  const [user, setUser] = useState('')
  const userName = useAppSelector((state) => state.auth.userName)
  const postsData = useAppSelector((state) => state.post.postsData)
  const [postsForMapping, setPostsForMapping] =
    useState<PostsDataResponse>(postsData)

  useEffect(() => {
    setUser(userName)
  }, [])

  const [postFields, setPostFields] = useState({
    Title: '',
    Content: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostFields((prevPostFields) => ({
      ...prevPostFields,
      [name]: value
    }))
  }

  const handleCreatePost = async (e: any, postData: PostData) => {
    e.preventDefault()
    const newPost = await createPost(postData)

    setPostsForMapping((prevPosts) => ({
      ...prevPosts,
      results: [newPost, ...prevPosts.results]
    }))

    setPostFields({ Title: '', Content: '' })

    toast.success('Successfully created')
  }

  const handleLogOut = () => {
    localStorage.removeItem('codeLeap-username')
    window.location.reload()
  }

  return (
    <main className="h-max w-[800px] bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-[80px] bg-main-blue py-[27px] pl-[37px]">
        <SectionTitle color="white">CodeLeap Network</SectionTitle>
      </div>

      <form
        className="m-[24px] flex flex-col rounded-2xl border border-[#999999] p-[24px]"
        onSubmit={(e) =>
          handleCreatePost(e, {
            title: postFields.Title,
            content: postFields.Content,
            username: user
          })
        }
      >
        <div className="flex">
          <SectionTitle>What's on your mind?</SectionTitle>
          <Button onClick={handleLogOut}>LogOut</Button>
        </div>

        {requiredPostFields?.map((field) => (
          <div className="mt-[19px] flex flex-col" key={field.name}>
            <p className="mt-[8px]">{field.name}</p>
            <Input
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              value={postFields[field.name as keyof typeof postFields]}
            />
          </div>
        ))}

        <Button
          type="submit"
          disabled={!postFields.Title || postFields.Content.length <= 0}
        >
          CREATE
        </Button>
      </form>

      {postsForMapping?.results?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </main>
  )
}
export default MainScreen
