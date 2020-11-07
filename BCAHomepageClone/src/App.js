import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

import Banner from './components/Banner';

function App() {

  const [image, setImage] = useState("");
  const [top, setTop] = useState("");
  const [middle, setMiddle] = useState("");
  const [bottom, setBottom] = useState("");
  const [link, setLink] = useState({});
  const [tabletImage, setTabletImage] = useState({});
  const [mobileImage, setMobileImage] = useState({});
  const [smallMobileImage, setSmallMobileImage] = useState({});


  useEffect(() => {

    // axios.get('http://localhost:1337/banner-with-components/1')
    axios.get('http://localhost:1337/banner-riches/1')
      .then(data => {
        console.log(data);
        setTop(data.data.Top)
        setMiddle(data.data.Middle);
        setBottom(data.data.Bottom);
        setImage(data.data.Image);
        // setLink(data.data.link[0]);
        setTabletImage(data.data.TabletImage);
        setMobileImage(data.data.MobileImage);
        setSmallMobileImage(data.data.SmallMobileImage);
      })
      .catch(console.error)
   
  }, []);


  return (
    (image.formats && tabletImage && mobileImage && smallMobileImage) ?
      <div className="outer">
        <div className="App">
          <Banner image={image} tabletImage={tabletImage} mobileImage={mobileImage} smallMobileImage={smallMobileImage}>
            {parse(top)}
            {parse(middle)}
            {parse(bottom)}
          </Banner>
          {/* <Banner image={image}>
            <h3 style={{color: top.colour, fontSize: top.size ? top.size : "" }}>{top.text}</h3>
            <h2 style={{color: middle.colour}}>{middle.text}</h2>
            <h3 style={{color: bottom.colour}}>{bottom.text}</h3>
            { 
            link ? 
            <h3><a style={{color: "#0000EE"}} href={link.url} target={link.OpenInNewWindow ? "_blank" : ""}>{link.text}</a></h3> 
            :
              null
            }
          </Banner> */}
        </div>
      </div>
      : null
  );
}

export default App;
