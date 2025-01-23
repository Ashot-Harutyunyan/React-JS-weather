import './layout.style.scss'
import { useState } from 'react'
import { Outlet, NavLink, Link} from 'react-router-dom'
import { FaCamera } from "react-icons/fa"
import { IoHome } from "react-icons/io5"
import { CiSearch } from "react-icons/ci"

function Layout() {

  const [minLinks, setMinLinks] = useState(false)

  return (<>
    <header>

      <nav>

        <Link to='/' className='logo'>
          <div className='logo-div-icons'>
            <FaCamera className='Camera-icon'/>
          </div>
          <p>ALINO<b>CAM</b></p>
        </Link>

        <div className='min-links'>
          <div className={minLinks ? 'burger will-close' : 'burger'}
               onClick={() => {
                 setMinLinks(!minLinks)
               }}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

          <div className={minLinks ? 'max-links ' + 'max-height' : 'max-links ' + 'min-height'}>
            <div className={minLinks ? 'container-links big' : 'container-links small'}>
              <div className='container-link-icons'>
                <IoHome className='link-home-icon'/>
              </div>
              <NavLink to='/' onClick={() => setMinLinks(false)}
                       className={({isActive}) => {
                         if (isActive) return 'NavLink active-NavLink'
                         return 'NavLink'
                       }}>Home</NavLink>
            </div>

            <div className={minLinks ? 'container-links big' : 'container-links small'}>
              <div className='container-link-icons'>
                <CiSearch className='link-search-icon'/>
              </div>
              <NavLink to='/search' onClick={() => setMinLinks(false)}
                       className={({isActive}) => {
                         if (isActive) return 'NavLink active-NavLink'
                         return 'NavLink'
                       }}>Search</NavLink>
            </div>
          </div>
      </nav>

    </header>
    <main>
    <Outlet/>
    </main>    
  </>)
}

export default Layout
