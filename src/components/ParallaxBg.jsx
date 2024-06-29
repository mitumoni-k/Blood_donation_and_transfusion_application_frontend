import React from 'react'
import "../styles/Parallax.css"
import "../styles/MainPage.css"
import logoimg from "../assets/LoginSignupImg.png"
// import logoimg from "../assets/Landing_page_bg.jpeg"
import DonateRequestIcons from './DonateRequestIcons'
import SliderSection from "./SliderSection";
import Information from "./Information";
import Footer from "./Footer";

const ParallaxBg = () => {
  return (
    // <div className='wrapper_parallax_BG'>
    <>
      <header>
      <img className='background_1' src={logoimg} alt="blood hero logo" />
      {/* <img className='background_1' src={logoimg} alt="blood hero logo" /> */}
      <h1 className='background_2'>Blood<br></br> Hero </h1>
        <div className='background_writting'>
            <h1 className='content-title'>Transfuse or Donate - <span className='ploo'>Blood</span></h1>
            <h4 className='content-desc1'>Empowering Lives,<span>One Drop at a Time</span></h4>
        </div>
      </header>
      <section>
      <DonateRequestIcons />
     
        <h1 className='about-us'>What is Blood Hero?</h1>
        <p className='about-us-section'>
          <strong>Blood Hero</strong> is not just a website, but rather a gift for you and your loved ones. Our mission is to connect donors with those in need, saving lives one donation at a time. At Blood Hero, we understand that donating blood is more than just a charitable act—it's a life-saving gift. Each donation has the potential to save up to three lives, making a profound impact on individuals, families, and communities. Crafted and created with all the love, we are a strong family fighting for a noble cause, and in here we welcome all, as we believe that, <strong className='strong-text'>anyone can be a hero</strong>. <span><strong>Want to know more About us, click on the button </strong>below</span> to explore into our world of <em><strong>devonation and donation!</strong></em>
        </p>
        <a href='about_us.pdf' className='website-brochure-button'>Read About Us</a>
      </section>
      <SliderSection />
      <Information />
      <Footer />
    </>
  )
}

export default ParallaxBg