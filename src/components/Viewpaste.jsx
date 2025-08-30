import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Viewpaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  console.log("Final paste", paste);

  // Handle case where paste is not found
  if (!paste) {
    return <div className="text-red-500">Paste not found</div>;
  }

  return (
    <div>
      <div className='flex flex-row gap-10 mt-5'>
        <input
          className='bg-black p-2 text-white rounded-2xl'
          type="text"
          value={paste.title }   // ✅ safe fallback
          disabled
        />
      </div>

      <div>
        <textarea
          className='text-white rounded-2xl bg-black p-2 mt-4 min-w-[500px]'
          value={paste.content }  // ✅ works for both
          disabled
          rows={18}
        />
      </div>
    </div>
  )
}

export default Viewpaste
