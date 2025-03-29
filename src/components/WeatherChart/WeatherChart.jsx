import './WeatherChart.style.scss'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Navigate, Link } from "react-router-dom"
import Chart from "../Chart/Chart"
import { IoIosArrowRoundBack } from "react-icons/io"

const API_KEY = import.meta.env.VITE_API_KEY;

const WeatherChart = () => {

  const { city } = useParams()
  const [error, setError] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        )

        const weatherData = response.data.list.map((item) => ({
          time: new Date(item.dt_txt),
          temp: item.main.temp,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        }))

        setData(weatherData.slice(0, 8)) 
      } catch (error) {
        console.error(error)
        setError(true)
      }
    }

    fetchWeatherData()
  },[])


  if(error) return <Navigate to="/error" replace/>
  

  return (<>
    <div className='container-icon-back'>
      <Link to='..'><IoIosArrowRoundBack className='icon-back'/></Link>
    </div>

    <div className='weather-chart-components'>
      <h2>Weather forecast {city}</h2>
      {data.length > 0
          ? <Chart data={data} />
          : <p className='weather-chart-loading'>Loading...</p>
      }
    </div>
  </>)
}

export default WeatherChart
