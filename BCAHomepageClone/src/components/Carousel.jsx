import React, { useState, useEffect } from 'react';
import Banner from './Banner';

export default function BannerCarousel(props) {

  const [Banners, setBanners] = useState(props.Banners)
  const [activeIndex, setActiveIndex] = useState(0);
  const [lengthOfBanners, setLengthOfBanners] = useState(props.Banners.length);

  const goToNextSlide = (e) => {
    let index = activeIndex;
    let length = lengthOfBanners;
    if (index === length - 1) {
      index = 0
    } else {
      index++;
    }
    setActiveIndex(index);
  }

  const goToPrevSlide = () => {
    let index = activeIndex;
    let length = lengthOfBanners;
    if(index === 0) {
      index = length - 1;
    } else {
      index--;
    }
    setActiveIndex(index);
  }

  useEffect(() => {
    const autoPlay = setTimeout(goToNextSlide, 3000)
    return () => {
      // Stop the interval when the component unmounts. 
      // Otherwise it will keep going and the banners won't be smooth and will eventually crash the browser!
      clearTimeout(autoPlay);
    }
}, [activeIndex])

    return (
        (Banners.length ?
        <div className="outer">
          <div  className="App" style={{position: "relative"}}>
            <Banner activeBanner={Banners[activeIndex]}/>
            <button 
              className="prev" 
              onClick={goToNextSlide} 
              style={{border: "none", height: "4rem", width: "4rem",
                  background: "#fff", borderRadius: "50%", position: "absolute", left: 0, top: "50%", zIndex:"100", outline: "white", fontWeight: "bold"}}
              ><i style={{color: "#07819a", fontWeight: "bold", size: "9x"}} className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="next" 
              onClick={goToPrevSlide} 
              style={{border: "none", height: "4rem", width: "4rem",
              background: "#fff",  borderRadius: "50%",
              position: "absolute", right: 0, top: "50%", zIndex:"100"}}
              ><i style={{color: "#07819a", fontWeight: "bold", size: "9x"}} className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        : null)
    )
}