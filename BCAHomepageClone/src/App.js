import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BannerCarousel from './components/Carousel';

function App() {

  const [Banners, setBanners] = useState([]);

  const returnSorted = (data) => {
    console.log("DATA: ", data);
    if (data.length === 1) { 
      return data[0];     
    }
    const sortedData = data.sort((a, b) => {
      const aPublishDate = new Date(a.published_at);
      const bPublishDate = new Date(b.published_at);
      return bPublishDate - aPublishDate;
    })
    return sortedData[0];
  }

  const createBannersArray = (newest) => {
    let banners = [];
    for (const key in newest) {
        if (key.includes("Banner")) {
            banners.push(newest[key]);
        }
    }
    return banners;
  }

  useEffect(() => {

    axios.get('http://localhost:1337/carousels')
      .then(data => {
        const sorted = returnSorted(data.data);
        let BannersArr = createBannersArray(sorted)
        setBanners(BannersArr);
      })
      .catch(console.error)
  }, []);

  return (
    Banners.length ? 
    <BannerCarousel Banners={Banners}></BannerCarousel>
    : null
  )
}

export default App;
