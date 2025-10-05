import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../Components/Header';
function MangaPage() {
  const {id}=useParams() // this tracks the manga ID from Link tag used .
  const [chapters,setChapters]=useState([]); // stores all the chapters
  const [chapterID,setChapterID]=useState(null);// stores the selected chapterID
  const [chapterContent , setChapterContent]=useState(null);
  const [nameDetails,setNameDetails]=useState([])
  useEffect(()=>
  {
    axios.get(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&order[chapter]=desc&limit=500`)
    .then(res=>
    {
      console.log(res.data )
      setChapters(res.data.data);

      if(res.data.data.length > 0)
      {
         setChapterID(res.data.data[0].id);//selecting latest chapter and storing its ID by default as get request is made to fetch chapters in desc order.                   
      }  
    }
    )
    .catch(err=>console.error('unable to fetch manga chapters',err))

    // fetching chapter title
    axios.get(`https://api.mangadex.org/manga/${id}`)
    .then(res=>
    {
      console.log("manga details",res.data);
      setNameDetails(res.data.data)
    }
    )
    .catch(err=>console.error("unable to fetch manga detils",err))
  
  },[id]);


  // fetching chapter content using chapter id (selected chapter id from the dropdown list)
  useEffect(()=>
  {
    if (!chapterID) return
    axios.get(`https://api.mangadex.org/at-home/server/${chapterID}`)
    .then(res=>
    {
      console.log("active chapter data",res.data)
      setChapterContent(res.data);
      
    }
    )
    .catch(err=>console.log('unable to fetch manga chapter data ', err))
  },[chapterID])
  const selectedChapterId= chapters.find(ch=>ch.id===chapterID)
  return (
    <div >
      <h1 className='flex items-center  justify-center font-extrabold text-5xl text-slate-300 '>{nameDetails?.attributes?.title?.en || 'Loading...'}</h1>
      <h2 className=' flex items-center justify-center p-5 font-extrabold text-2xl text-slate-300'>chapter {selectedChapterId?.attributes?.chapter || 'not available'} - {selectedChapterId?.attributes?.title || " "}</h2>     
      <div className='flex items-center justify-center p-4'>
        <select  value={chapterID}  onChange={(event)=>setChapterID(event.target.value)} className='inset-shadow-sm inset-shadow-gray-950 rounded-lg border-white  text-white h-[30px] '>
        <option className='bg-zinc-800  rounded-lg'>
             Select Chapter   
        </option>
        {chapters.map((chapter,index)=>
        (
          
          <option key={chapter.id} value={chapter.id}  className=' bg-zinc-800  ' >
            Chapter {chapter.attributes.chapter || 'N/A'} - {chapter.attributes.title}
          </option>
        ))}
      </select>
      </div>
      <div className='flex items-center justify-center '>
           <button>next</button>
     </div>
      <div className=' bg-zinc-800 p-20 flex flex-col items-center'>
      {chapterContent&&chapterContent.chapter.data.map((item, index)=>
      (
        <img src={`${chapterContent.baseUrl}/data/${chapterContent.chapter.hash}/${item}`} className='m-1'/>
      ))}
      </div>
    </div>
  )
}

export default MangaPage