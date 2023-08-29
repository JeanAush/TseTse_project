
import React from 'react'
import { Link } from 'react-router-dom'
function Navigation() {
  return (
    <div>
       <nav>
        <div className='Navigation'>
          <div className='logo'>
          <img src="/images/dudu.png" alt="Tsetse Fly Logo" />
             </div>
        <ul className='Nav-list'>
        <li>
          <Link to ="/">Home</Link>
        </li>
        <li>
          <Link to ="/about">About</Link>
        </li>
        <li>
          <Link to ="/login">Login</Link>
        </li>
        <li>
            <Link to = "/map">Map</Link>
        </li>
      </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navigation