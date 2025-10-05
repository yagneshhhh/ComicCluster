import React from 'react'
import { useEffect } from 'react'
import GlobalApi from '../API/GlobalApi'
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Home() {
  useEffect(()=>
  {
    getManga();
  },[])
  const [manga,setManga]=useState([])
  const getManga=()=>
  {
    GlobalApi.getManga
    .then(async(res)=>
    {
      const mangaData=res.data.data ;
      const mangaDataWithCovers=(
        mangaData.map((manga)=>
        {
          const cover=manga.relationships.find(rel=>rel.type==="cover_art")?.attributes?.fileName;
          const coverUrl=`https://uploads.mangadex.org/covers/${manga.id}/${cover}.256.jpg`
          return{
            id:manga.id,
            title:manga.attributes.title.en || "undefined",
            coverUrl,
          };
        })
      )
      setManga(mangaDataWithCovers);
    })
    .catch(err=>console.error("unable to fetch manga data",err))
  }
  const truncateTitle = (title) => {
  const words = title.split(" ");
  return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : title;
};

  return (
    <>
    <div>
      <h2 className='font-bold text-2xl p-4 text-slate-200 '>Explore Top Mangas 🔥</h2>
    </div>
      <div className='grid justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-row  bg-zinc-800 ml-20'>
        {manga.map((manga)=>
      (
        <div className=' p-2 '>
          <Link to={`/manga/${manga.id}`} >
          <img src={manga.coverUrl} className='h-[190px] w-[170px]  rounded-sm  0   hover:border-1  border-violet-700  '/>
          <h2 className='text-white font-semibold  uppercase mt-1.5'>{truncateTitle(manga.title)}</h2>
          </Link>
        </div>
      ))}
      </div>
    </>
  )
}

export default Home