

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from 'jwt-decode'
import "../styles/MainPage.css"
import "../styles/Parallax.css"

const DonateRequestIcons = ({authorized,userRole}) => {
  return (
    <div className='donate-request-gotomap'>
        <div className='go-to-map-button'>
            <a href='/map'>Search nearby...</a>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon-gotomap' />
         </div>
    </div>
  )
}

export default DonateRequestIcons