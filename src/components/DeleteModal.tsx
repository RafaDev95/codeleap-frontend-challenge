import React from 'react'
import { Button, SectionTitle } from 'components'

type Props = {
  onClick: (e: any) => void
  closeModal: (e: any) => void
}

function DeleteModal({ onClick, closeModal }: Props) {
  return (
    <div className="modal fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center">
      <div className="modal-overlay absolute h-full w-full bg-[#929292] opacity-50" />

      <div className="modal-container z-50 mx-auto  overflow-y-auto rounded-2xl bg-white shadow-lg md:max-w-lg">
        <div className="modal-content px-6 py-4 text-left">
          <SectionTitle>
            Are you sure you want to delete this item?
          </SectionTitle>

          <div className="ml-auto flex w-[220px]">
            <Button
              className="border border-text-secondary bg-transparent text-gray-900 hover:bg-slate-100"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={onClick}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
