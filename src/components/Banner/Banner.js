import React, { useEffect,useState } from 'react'
import './Banner.css';
import {API_KEY,imageUrl} from '../../constants/constant';
import axios from '../../axios';

function Banner() {
     const [movie,setmovie] = useState()
    useEffect(()=>{
         axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
            console.log(response.data.results[0])
            setmovie(response.data.results[randomIntFromInterval(20)])
         })
         
    },[])

    function randomIntFromInterval(size) { 
      let min = 0;
      let max = size-1;
      return Math.floor(Math.random() * (max - min + 1) + min)
      }
  return (
    <div 
    style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`

    }}
    className='banner'>
        <div className='content'>
            <h1 className='tittle'>{movie? movie.title:""}</h1>
            <div className='banner-buttons'>
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>

            <h1 className='description'>{movie? movie.overview:""}</h1>

        </div>
        <div className='fade_bottom'></div>

    </div>
  )
}

export default Banner