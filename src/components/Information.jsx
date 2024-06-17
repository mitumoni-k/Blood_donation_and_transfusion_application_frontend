import React , { useEffect , useState } from 'react'
import DYK1 from "../assets/DYK1.jpeg"
import DYK2 from "../assets/DYK2.jpeg"
import DYK3 from "../assets/DYK3.jpeg"
import DYK4 from "../assets/DYK4.jpeg"
import DYK5 from "../assets/DYK5.jpeg"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios'
import "../styles/MainPage.css"

const DYK_images = [DYK1,DYK2,DYK3,DYK4,DYK5]



const Information = () => {
  const [statsData,setStatsData] = useState([])

  useEffect(() => {
    fetchWebsiteInteractionData()
  },[])

  const fetchWebsiteInteractionData = async() => {
    try 
    {
      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/getstatistics");
      
        // console.log(response.data)
        setStatsData(response.data)
        console.log("StatsData = ", statsData)
  
    }
    catch(error)
    {
      console.log(error)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div>
    <div>
      <div className='funFacts'>
      <h3>Did You Know ?</h3>
      <Slider {...settings}>
      {DYK_images.map((image, index) => (
        <div key={index} className='DYK-slider'>
          <img src={image} alt={`DYK ${index + 1}`} />
        </div>
      ))}
    </Slider>

    </div>
    </div>
    <h2 className='information-heading'>Website-Interaction Statistics</h2>
    <div className='stats'>
    <div className='no_of_users'>
        <h3>Number Of Users</h3>
            <p>{statsData.usersCount}</p>
        </div>
        <div className='no_of_users'>
        <h3>Number Of Hospitals</h3>
            <p>{statsData.hospitalsCount}</p>
        </div>
        <div className='no_of_users'>
        <h3>Number Of Organisations</h3>
            <p>{statsData.organisationsCount}</p>
        </div>        

    </div>
    <div className='stats'>
        <div className='no_of_users'>
        <h3>Number Of Recipients</h3>
            <p>{statsData.requestsCount}</p>
        </div>
        {/* <div className='no_of_donors'>
        <h3>Number Of Donors</h3>
            <p>{statsData.donorsCount}</p>
        </div> */}
        <div className='l_of_blood'>
        <h3>Litres of Blood recieved</h3>
            <p>{statsData.totalRequestBloodUnits} units</p>
        </div>
    </div>
    </div>
  )
}

export default Information