import { useAppDispatch } from 'redux/hooks'
import { useState } from 'react'

import { Button, SectionTitle, Input } from 'components'

import { saveUserName } from 'redux/slices/authSlice'

const SignUpModal = () => {
  const [userName, setUserName] = useState('')
  const dispatch = useAppDispatch()
  const handleChange = (e: any) => {
    e.preventDefault()
    dispatch(saveUserName({ userName }))
    window.location.reload()
  }
  return (
    <div
      className="flex h-[205px] w-[500px] flex-col justify-center
   gap-5 rounded-2xl bg-white px-[24px] shadow-lg"
    >
      <SectionTitle>Welcome to CodeLeap network!</SectionTitle>
      <form className="flex flex-col" onSubmit={handleChange}>
        <p>Please enter your username</p>

        <Input
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Jhon Doe"
          name="username"
        />
        <Button disabled={userName.length <= 0} type="submit">
          ENTER
        </Button>
      </form>
    </div>
  )
}
export default SignUpModal
