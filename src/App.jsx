import './app.style.scss'
import { Routes, Route } from 'react-router-dom' 
import Layout from './Layout/Layout'
import Home from './components/Home/Home'
import Search from './components/Search/Search'
import WeatherChart from './components/WeatherChart/WeatherChart'
import Error from './components/Error/Error'

function App() {

  return (<>
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/:city' element={<WeatherChart/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/search/:city' element={<WeatherChart/>}/>
          <Route path='error' element={<Error/>}/> 
      </Route>
    </Routes>
  </>)
}

export default App