import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
// import Edit from './components/EditBanner';

import Banner from './components/Banner';

function App() {

  const [image, setImage] = useState("");
  const [top, setTop] = useState("");
  const [middle, setMiddle] = useState("");
  const [bottom, setBottom] = useState("");
  const [link, setLink] = useState({})


  useEffect(() => {

    // axios.get('http://localhost:1337/banner-with-components/1')
    axios.get('http://localhost:1337/banner-riches/1')
      .then(data => {
        console.log(data.data)
        setTop(data.data.Top)
        setMiddle(data.data.Middle);
        setBottom(data.data.Bottom);
        setImage(data.data.Image.url);
        // setTop(data.data.top[0]);
        // setMiddle(data.data.middle[0]);
        // setBottom(data.data.bottom[0]);
        // setImage(data.data.image[0].url);
        // setLink(data.data.link[0]);
      })
      .catch(console.error)
   
  }, []);


  return (
    <div className="outer">
    <div className="App">
      <Banner image={image}>
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


        {/* {console.log(top)}
      <Edit changeText={setTop} setTop={setTop} topLine={top}></Edit>
       */}
       {/* <MyColorPicker/> */}
    </div>
    </div>
  );
}

export default App;
