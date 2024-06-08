import React from 'react'
import "../styles/Parallax.css"
import "../styles/MainPage.css"
import logoimg from "../assets/LoginSignupImg.png"
import DonateRequestIcons from './DonateRequestIcons'
import SliderSection from "./SliderSection";
import Information from "./Information";
import Footer from "./Footer";

const ParallaxBg = () => {
  return (
    <div className='wrapper'>
      <header>
      <img className='background_1' src={logoimg} alt="blood hero logo"></img>
      <h1 className='background_2'>Blood<br></br> Hero </h1>
        <div className='background_writting'>
            <h1 className='content-title'>Transfuse or Donate - <span className='ploo'>Blood</span></h1>
            <h4 className='content-desc1'>Empowering Lives, One Drop at a Time</h4>
        </div>
      </header>
      <section>
      <DonateRequestIcons />
     
        <h1 className='about-us'>What is Blood Hero?</h1>
        <p className='about-us-section'>
          Blood Hero is not just a website, but rather a gift for you and your loved ones. Our mission is to connect donors with those in need, saving lives one donation at a time. At Blood Hero, we understand that donating blood is more than just a charitable act—it's a life-saving gift. Each donation has the potential to save up to three lives, making a profound impact on individuals, families, and communities. Crafted and created with all the love, we are a strong family fighting for a noble cause, and in here we welcome all, as we believe that, <strong className='strong-text'>anyone can be a hero</strong>. Want to know more about us, click on the botton below to explore into our world of devonation and donation!
        </p>
        <a href='about_us.pdf' className='website-brochure-button'>Read About Us</a>
      </section>
      <SliderSection />
      <Information />
      <Footer />
    </div>
  )
}

export default ParallaxBg