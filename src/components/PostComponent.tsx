import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useAppSelector } from 'redux/hooks'
import toast, { Toaster } from 'react-hot-toast'

import { PostResponse } from 'types'
import { SectionTitle, DeleteModal, EditModal } from 'components'
import { deletePost, editPost } from 'actions/requests'

type Props = {
  post: PostResponse
}

const PostComponent = ({ post }: Props) => {
  const user = useAppSelector((state) => state.auth.userName)
  const date = new Date(post.created_datetime)
  const friendlyDateMessage = formatDistanceToNow(date, { addSuffix: true })

  const [showDeletePostModal, setShowDeletePostModal] = useState({
    show: false,
    id: 0
  })

  const [showEditModal, setShowEditModal] = useState({
    show: true,
    id: 0
  })

  const [postFields, setPostFields] = useState({
    Title: '',
    Content: ''
  })

  const handleOpenModal = async (deleteOrEdit: string, postId: number) => {
    if (deleteOrEdit === 'edit') {
      setShowEditModal({ show: true, id: postId })
    } else {
      setShowDeletePostModal({ show: true, id: postId })
    }
  }

  const handleDeletePost = async (postId: number) => {
    const res = await deletePost(postId)
    if (typeof res !== 'string') {
      toast.error('Cannot complete request: blocked by CORS policy')
    } else if (typeof res === 'string') {
      toast.success('Successfully Deleted')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPostFields((prevPostFields) => ({
      ...prevPostFields,
      [name]: value
    }))
  }

  const handleCloseEditModal = () => {
    setShowDeletePostModal({ show: false, id: 0 })
    setPostFields({ Title: '', Content: '' })
  }

  const handleEditPost = async (e: any, postId: number) => {
    e.preventDefault()
    const updatedPost = await editPost(
      postId,
      postFields.Title,
      postFields.Content
    )

    if (typeof updatedPost === 'string') {
      toast.error('Cannot complete request: blocked by CORS policy')
    } else {
      toast.success('Successfully Updated')
    }

    setPostFields({ Title: '', Content: '' })
  }

  return (
    <div className="relative m-[24px] flex flex-col rounded-2xl border border-[#999999] ">
      <div className="flex h-[80px] justify-between  rounded-t-xl bg-main-blue  p-[24px] py-[27px]">
        <SectionTitle color="white">{post.title}</SectionTitle>

        {post.username === user && (
          <div className="flex items-center gap-7">
            <button onClick={() => handleOpenModal('delete', post.id)}>
              <img src="/icons/trash.svg" alt="" />
            </button>
            <button onClick={() => handleOpenModal('edit', post.id)}>
              <img src="/icons/edit.svg" alt="" />
            </button>
          </div>
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {showDeletePostModal.id === post.id && showDeletePostModal.show && (
        <DeleteModal
          onClick={() => handleDeletePost(post.id)}
          closeModal={handleCloseEditModal}
        />
      )}

      {showEditModal.id === post.id && showEditModal.show && (
        <EditModal
          onChange={handleChange}
          onSubmit={(e) => handleEditPost(e, post.id)}
          closeModal={() => setShowEditModal({ show: false, id: 0 })}
          disabled={!postFields.Title.length || postFields.Content.length <= 0}
        />
      )}

      <div className="p-[24px]">
        <div className="flex items-center justify-between">
          <p className="text-md font-bold text-text-secondary">
            @{post.username}
          </p>
          <p className="text-md  text-text-secondary">{friendlyDateMessage}</p>
        </div>

        <div className="mt-4">
          <p className="text-md">{post.content}</p>
        </div>
      </div>
    </div>
  )
}
export default PostComponent
