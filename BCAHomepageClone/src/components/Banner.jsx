import React from 'react';
import useWindowDimensions from './WindowDimensions'
import parse from 'html-react-parser';


export default function Banner(props) {
    console.log("in banner: ", props)

    const { Image,
         TabletImage, 
         MobileImage, 
         SmallMobileImage, 
         Top, 
         Middle, 
         Bottom, 
         Link } = props.activeBanner

    const {height, width} = useWindowDimensions(); 
    const determineBackgroundImage = (screenWidth, image, tabletImage, mobileImage, smallMobileImage) => {
        if(screenWidth > 767) {
            return `url(http://localhost:1337${image.url})`;
        } else  if(screenWidth > 414) {
            return `url(http://localhost:1337${tabletImage.url})`;
        } else if(screenWidth > 321) {
            return `url(http://localhost:1337${mobileImage.url})`;
        } else {
            return `url(http://localhost:1337${smallMobileImage.url})`;
        }
    };

    const addImage = {
         backgroundImage: determineBackgroundImage(width, Image, TabletImage, MobileImage, SmallMobileImage)
    }

    return (

        props.activeBanner ?
        <div className="main-region" >
            
            <div id="public-home" >
                
                <div className='section header' >
                    <div className='photo' >
                   
                        <div className="bannerlightfamily" style={addImage}>
                            {parse(Top)}
                            {parse(Middle)}
                            {parse(Bottom)}
                            <h3 style={{color: Bottom.colour}}>{Bottom.text}</h3>
                            { 
                            Link ? 
                            <h3><a style={{color: "#0000EE"}} href={Link.url} target={Link.OpenInNewWindow ? "_blank" : ""}>{Link.text}</a></h3> 
                            :
                            null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : null

    )
}