import './home.style.scss'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Home() {

  const countries = ["USA", "Canada", "India", "Germany", "Japan", "Brazil", "Armenia", "Australia", "France", "Italy", "Mexico", "Russia"]
  
  return (<>
    <div className='home-container'>
      {countries.map((elem, index)=>{
        return <Link to={'/' + elem} key={index} className='home-item-container'>
          <p>{elem}</p>
          <div className='home-img-container'>
            <LazyLoadImage
              src={'../public/' + elem + '.jpg'} 
              alt={elem}
              effect="blur"
              width='100%'
              height='100%'
            />
          </div>

        </Link>
      })}
    </div>
  </>)
}

export default Home