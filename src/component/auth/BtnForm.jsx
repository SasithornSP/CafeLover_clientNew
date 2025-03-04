import { Loader } from 'lucide-react'
import React from 'react'


function BtnForm({isLoading , text}) {
  return (
    <button
    className={`bg-primary-btn mx-auto cursor-pointer ${
      !isLoading && "hover:btn-accent"
    } w-[200px] py-2 text-xl rounded-xl`}
  >
    {isLoading ? (
      <span className="flex justify-center items-center gap-2">
        <Loader className="animate-spin" size={20} />
        Loading...
      </span>
    ) : (
    <>{text}</>
    )}
  </button>
  )
}

export default BtnForm