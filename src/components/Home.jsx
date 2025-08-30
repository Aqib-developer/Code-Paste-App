import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect} from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToPastes } from '../redux/pasteSlice'
import { updateToPastes } from '../redux/pasteSlice'
import { FaRegCopy } from "react-icons/fa";




const Home = () => {
  const [title,setTitle]=useState("");
  const [value,setValue]=useState("");
  const [searchParams,setSearchParams]=useSearchParams("");
  const pasteId=searchParams.get("pasteId")
  const dispatch= useDispatch();
  const allPAstes = useSelector((state)=>state.paste.pastes);

    useEffect(() => {
      if(pasteId){
        const paste =allPAstes.find((p)=>p._id===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])
    

    function createPaste(){
      const paste={
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(),
        createAt: new Date().toISOString()
      }
      if(pasteId){
         dispatch(updateToPastes(paste));
      }
      else{
        dispatch(addToPastes(paste));  
        setTitle("");
        setValue("");
        setSearchParams("");
      }
    }

    return (
      <div>
         <div className='flex flex-row justify-between m-5'>
         <input className='h-13 bg-black p-4 w-[1000px] text-white rounded-2xl '
         type="text"
         placeholder='enter title here' 
         value={title}
         onChange={(e)=>setTitle(e.target.value)}/>
        
        <button onClick={createPaste}
        className='h-14 bg-blue-500 text-white rounded-xl p-3'>
          {
            pasteId?"Update my Paste"
            :"Create New Paste"
          }
              
        </button>
    </div>
    <div className='flex flex-col border-2 border-solid border-black m-5 rounded-2xl min-h-[455px] min-w-[1150px'>
      <div className='flex flex-column justify-between'>
           <div className='flex flex-row gap-3 p-3'>
          <div className='h-[18px] w-[18px] rounded-full bg-[#BA2F14]'></div>
          <div className='h-[18px] w-[18px] rounded-full bg-[#EBC61E]'></div>
          <div className='h-[18px] w-[18px] rounded-full bg-[#0AF02A]'></div>
          </div>
            <div>
             <button className="p-2 hover:bg-gray-200 rounded-xl">
             <FaRegCopy className="w-8 h-8 text-black" />
            </button>
        </div> 
        
      </div>
      <div>
        <textarea className='bg-black text-white rounded-2xl min-h-[400px] min-w-[1160px] p-3 m-3 '
        value={value}
        placeholder='write or paste your text here...'
        onChange={(e)=>setValue(e.target.value)}>

        </textarea>
        

      </div>

    </div>
      </div>
   
  )
}

export default Home