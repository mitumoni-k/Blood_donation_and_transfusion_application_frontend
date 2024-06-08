import React, { useEffect, useRef, useState } from 'react'
import bg1 from "../assets/mainPageBG1.jpeg"
import bg2 from "../assets/mainPageBG2.jpeg"
import bg3 from "../assets/mainPageBG3.jpeg"


const images_array = [bg1,bg2,bg3]


function SlideShow() {
  return (
    <div className='slideshow-container'>
      <div className='slideshow-subcontainer'>
        <div className='slideshow-section'>
          </div>
          <div className='content'>
            <h1 className='content-title'>Transfuse or Donate - Blood</h1>
            <h4 className='content-desc1'>Empowering Lives, One Drop at a Time</h4>
            <p className='content-desc2'>Welcome to <strong>"Donate and Transfuse - blood,"</strong> your gateway to saving lives through the power of blood donation.</p>
            <a href='/about_us.pdf' className='website-brochure-button'>Read About Us</a>
        </div>

      </div>
    </div>
  )
}
  export default SlideShow
