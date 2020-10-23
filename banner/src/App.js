import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BannerTest from './components/banner_test';
import Edit from './components/EditBanner';

import Banner from './components/Banner';

function App() {

  const [image, setImage] = useState("");
  const [top, setTop] = useState({});
  const [middle, setMiddle] = useState({});
  const [bottom, setBottom] = useState({});
  const [link, setLink] = useState({})


  useEffect(() => {

    axios.get('http://localhost:1337/banner-with-components/1')
      .then(data => {
        setTop(data.data.top[0]);
        setMiddle(data.data.middle[0]);
        setBottom(data.data.bottom[0]);
        setImage(data.data.image[0].url);
        setLink(data.data.link[0]);
      })
      .catch(console.error)
   
  }, []);

  return (
    <div className="App">
      <Banner image={image}>
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
        {/* {console.log(top)}
      <Edit changeText={setTop} setTop={setTop} topLine={top}></Edit> */}

    </div>
  );
}

export default App;
