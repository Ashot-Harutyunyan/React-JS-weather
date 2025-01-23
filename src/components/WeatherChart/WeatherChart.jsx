import './WeatherChart.style.scss'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Navigate } from "react-router-dom"
import Chart from "../Chart/Chart"

const API_KEY = "11e036604edfb82404e8080b2feeaec7"

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
  

  return (
    <div className='weather-chart-components'>
      <h2>Weather forecast {city}</h2>
      {data.length > 0
          ? <Chart data={data} />
          : <p className='weather-chart-loading'>Loading...</p>
      }
    </div>
  )
}

export default WeatherChart
