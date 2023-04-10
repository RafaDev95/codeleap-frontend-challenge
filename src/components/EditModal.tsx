import React from 'react'

import { Button, Input, SectionTitle } from 'components'

type Props = {
  onChange: (e: any) => void
  closeModal: (e: any) => void
  onSubmit: (e: any) => void
  disabled?: boolean
}

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

function EditModal({ onChange, closeModal, onSubmit, disabled }: Props) {
  return (
    <div className="modal fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center">
      <div className="modal-overlay absolute h-full w-full bg-[#929292] opacity-50" />

      <div className="modal-container  z-50 w-[100%] overflow-y-auto rounded-2xl bg-white shadow-lg  md:max-w-[660px]">
        <form className="modal-content px-6 py-4 text-left" onSubmit={onSubmit}>
          <SectionTitle>Edit item</SectionTitle>

          {requiredPostFields?.map((field) => (
            <div className="mt-[19px] flex flex-col" key={field.name}>
              <p className="mt-[8px]">{field.name}</p>
              <Input
                name={field.name}
                placeholder={field.placeholder}
                onChange={onChange}
              />
            </div>
          ))}

          <div className="ml-auto flex w-[220px]">
            <Button
              className="border border-text-secondary bg-transparent text-black hover:bg-slate-100"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-500"
              type="submit"
              disabled={disabled}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
