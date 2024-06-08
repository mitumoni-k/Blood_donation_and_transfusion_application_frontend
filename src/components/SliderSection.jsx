"use client"
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/SliderSection.css";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"

const SliderSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=de9c498ea0384b5b9bdd03581bb2afa6");
      const data = await response.json();
      const filteredData = data.articles.filter(article => article.urlToImage !== null);
      setNewsData(filteredData);
      console.log(filteredData);
    } 
    catch (error) 
    {
      console.log("Error fetching news data: ", error);
    }
  }

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);
     //In the settings object, we have this beforeChange method and when we click on the arrow to either go to next slide or prev slide, we are gonna update the image index to whatever the next index slide is.
     
  const settings = {
    infinite: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
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
    <div className="slide-component-main-container">
      <h1 className="heading">News & Events</h1>
      <div className="slide-container">
        <Slider {...settings}>
          {newsData.map((article, index) => (
          <div key={index} className={index === imageIndex ? "slide activeSlide" : "slide"} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img src={article.urlToImage} alt="Article" className="article-image" />
          </a>
          <div className="title-container">
            <h3 className={index === hoveredIndex ? "title expanded" : "title"}>
              {article.title}
            </h3>
            {index === hoveredIndex && (
              <div className="description">
                <p>{article.description}</p>
                <a className="read-more-link" href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            )}
          </div>
        </div>
        
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderSection;