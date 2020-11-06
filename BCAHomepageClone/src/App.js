import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Banner from './components/Banner';

function App() {

  const [image, setImage] = useState({});
  const [top, setTop] = useState({});
  const [middle, setMiddle] = useState({});
  const [bottom, setBottom] = useState({});
  const [link, setLink] = useState({});
  const [tabletImage, setTabletImage] = useState({});
  const [mobileImage, setMobileImage] = useState({});
  const [smallMobileImage, setSmallMobileImage] = useState({});


  useEffect(() => {

    axios.get('http://localhost:1337/banner-with-components/2')
      .then(data => {
        setTop(data.data.top[0]);
        setMiddle(data.data.middle[0]);
        setBottom(data.data.bottom[0]);
        setImage(data.data.image[0]);
        setLink(data.data.link[0]);
        setTabletImage(data.data.tabletimage);
        setMobileImage(data.data.mobileimage);
        setSmallMobileImage(data.data.mobileimagesmall);
      })
      .catch(console.error)
   
  }, []);
  
  return (
    (image.formats && tabletImage && mobileImage && smallMobileImage) ?
      <div className="App">
        <Banner image={image} tabletImage={tabletImage} mobileImage={mobileImage} smallMobileImage={smallMobileImage}>
          <h3 style={{color: top.colour, fontSize: top.size ? top.size : "" }}>{top.text}</h3>
          <h2 style={{color: middle.colour}}>{middle.text}</h2>
          <h3 style={{color: bottom.colour}}>{bottom.text}</h3>
          { 
          link ? 
          <h3><a style={{color: "#0000EE"}} href={link.url} target={link.OpenInNewWindow ? "_blank" : ""}>{link.text}</a></h3> 
          :
            <h3></h3>
          }
        </Banner>
      </div>
    : null
  );
}

export default App;
