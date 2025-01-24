import './search.style.scss'
import { FcSearch } from "react-icons/fc"
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"

const API_KEY = "11e036604edfb82404e8080b2feeaec7"

function Search() {

  const [weather, setWeather] = useState({})
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  async function fetchSearch() {
    if(value === '') return
    try {
      setStatus('loading')

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${API_KEY}`
      )
      
      setWeather({
        name: response.data.city.name,
        wind: response.data.list[0].wind.speed,
        humidity: response.data.list[0].main.humidity,
        time: new Date(response.data.list[0].dt_txt),
        description: response.data.list[0].weather[0].description,
        temp: response.data.list[0].main.temp,
        icon: `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}.png`,
      })

      setStatus('succeeded')

    }catch(err) {
      setStatus('failed')      
      console.log(err)
    }
  }


  useEffect(()=>{
    fetchSearch()
  },[value])

  return (<>
      <div className='container-icon-back'>
        <Link to='..'><IoIosArrowRoundBack className='icon-back'/></Link>
      </div>
      <div className="container-search">
         <div className='container-search-input'>
           <FcSearch className='search-icon'/>
           <input 
            type="text" 
            ref={inputRef}
            onChange={(e)=>{
              if(e.target.value === '') setStatus('idle')
            }}
            />
         </div>
         <button
         onClick={()=>{
          setValue(inputRef.current.value)
         }}
         >Search</button>
      </div>



      {status === 'loading' && <h2 className='loading'>Loading...</h2>}
      {status === 'failed' && <p className='error'>Nothing was found for your request</p>}
      {status === 'succeeded' && 
      <Link to={'/search/' + weather.name} className='search-weather-info'>

        <div className='search-weather-info-section-one'>
          <img src={weather.icon} alt="" />
          <h2>{weather.temp}°C</h2>

          <div>
            <p>Precipitation</p>
            <p>Humidity {weather.humidity}%</p>
            <p>Wind {weather.wind} km/h</p>
          </div>
        </div>

        <div>
          <p>{weather.name}</p>
          <p>today time {weather.time.getHours()}:00</p>
          <p>{weather.description}</p>
        </div>

      </Link>
      }
  </>)
}

export default Search