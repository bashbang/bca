import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

import Banner from './components/Banner';

require('dotenv').config();

function App() {

  const [image, setImage] = useState("");
  const [top, setTop] = useState("");
  const [middle, setMiddle] = useState("");
  const [bottom, setBottom] = useState("");
  const [link, setLink] = useState({});
  const [tabletImage, setTabletImage] = useState({});
  const [mobileImage, setMobileImage] = useState({});
  const [smallMobileImage, setSmallMobileImage] = useState({});

  let strapi_endpoint = process.env.REACT_APP_STRAPI_API_ENDPOINT;
  let prod_banners = process.env.REACT_APP_PROD_BANNERS;

  if(strapi_endpoint) {
    if(prod_banners === "true") {
      strapi_endpoint = strapi_endpoint + "?_publicationState=live";
    } else {
      strapi_endpoint = strapi_endpoint + ("?_publicationState=preview");
    }
  }

  useEffect(() => {
    axios.get(strapi_endpoint)
      .then(data => {
        setTop(data.data.Top)
        setMiddle(data.data.Middle);
        setBottom(data.data.Bottom);
        setImage(data.data.Image);
        setLink(data.data.Link);
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
          <Banner rootUrl={process.env.REACT_APP_STRAPI_ROOT} image={image} tabletImage={tabletImage} mobileImage={mobileImage} smallMobileImage={smallMobileImage}>
            {parse(top)}
            {parse(middle)}
            {parse(bottom)}
            <h3 style={{color: bottom.colour}}>{bottom.text}</h3>
            { 
            link ? 
            <h3><a style={{color: "#0000EE"}} href={link.url} target={link.OpenInNewWindow ? "_blank" : ""}>{link.text}</a></h3> 
            :
              null
            }
          </Banner>
        </div>
      </div>
      : null
  );
}

export default App;
