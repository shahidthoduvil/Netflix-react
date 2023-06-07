import React,{useEffect,useState} from 'react'
import './RowPost.css'
import { API_KEY, imageUrl} from '../../constants/constant'
import axios from '../../axios'
import YouTubeEvent from 'react-youtube'



function RowPost(props) {
  
    const [movies, setmovies] = useState([])
    const [urlid,seturlid]=useState('')
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    useEffect(()=>{
        axios.get(props.url).then(response=>{
            console.log(response.data+"hhhhhhhhhhhhhhh")
            setmovies(response.data.results)
        }).catch(err=>{
            alert('network Error')
        })

    },[])
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    const handMovie=(id)=>{
      console.log(id);
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
          console.log("response",response);
            seturlid(response.data.results[0])
            setIsVideoPlaying(true);
          
      })
      .catch(err => console.log(err , "axios errorrrr"))
    }
    
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className={'posters'}>
          {movies.map((obj ,index)=>
          <img  onClick={()=>handMovie(obj.id)}  className={props.isSmall ? 'smallPoster':'poster'}   alt='poster' src={`${imageUrl+obj.backdrop_path}`}/>
          )}

        </div>
        {urlid && isVideoPlaying && (
      <div>
        <button
          className="close-button"
          onClick={() => setIsVideoPlaying(false)} // Set isVideoPlaying state to false on button click
        >
          Close Video
        </button>
        <YouTubeEvent opts={opts} videoId={urlid.key} />
      </div>
        )}
      
    </div>
  )
}

export default RowPost