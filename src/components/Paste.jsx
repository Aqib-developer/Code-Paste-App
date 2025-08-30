import React from 'react'
import { useState } from 'react'
import {useSelector ,useDispatch} from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

import { FaSearch, FaEdit, FaTrash, FaEye, FaRegCopy, FaShareAlt } from "react-icons/fa";


const Paste = () => {
    const dispatch = useDispatch();
    const [searchTerm,setSearchTerm]=useState("")
    const pastes = useSelector((state)=>
    state.paste.pastes);
    const filterData=pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
    
      
      <input className='min-h-[22px] bg-gray-500 rounded-2xl p-2 text-black min-w-[500px] mx-80 mt-14'
       type="search"
       placeholder='Search the pastes' 
       value={searchTerm}
       onChange={(e)=>setSearchTerm(e.target.value) }/>
       <div  className='flex flex-col m-5 rounded-2xl min-h-[455px] min-w-[1150px] p-5'>
        {
          filterData.length>0 && filterData.map((paste)=>{
            return(
              <div key={paste?._id} className='rounded-2xl border text-white bg-black p-3 flex flex-col gap-5 mb-5'>
                {paste.title}
                <br />
                {paste.content}
                <div className='flex flex-row gap-5'>
                <button>
                  <a href={`/?pasteId=${paste?._id}`}>
                    <FaEdit/>
                  </a>
                </button>
                <button >
                  <a href={`/paste/${paste?._id}`}> <FaEye className="w-5 h-5 text-green-600" /></a>
                </button>
                <button onClick={()=>{
                  navigator.clipboard.writeText(paste?.content);
                  toast.success("Content copied to clipboard")
                }}>
                  <FaRegCopy className="w-5 h-5 text-white"></FaRegCopy>
                </button>
                <button onClick={()=>handleDelete(paste?._id)}>
                  <FaTrash className="w-5 h-5 text-red-600"></FaTrash>
                </button>
                <button>
                  <FaShareAlt className="w-5 h-5 text-blue-600"></FaShareAlt>
                </button>

                </div>
                
              </div>
            )
          })
        }
       </div>
    </div>
    

  )
}

export default Paste