import React from 'react';
import './banner2.css';
import useWindowDimensions from './WindowDimensions'

export default function Banner(props) {

    const {height, width} = useWindowDimensions(); 
    const determineBackgroundImage = (screenWidth, image) => {
        if(screenWidth > image.formats.large.width) {
            return `url(http://localhost:1337${image.url})`;
        } else  if(screenWidth > image.formats.medium.width) {
            return `url(http://localhost:1337${image.formats.large.url})`;
        } else if(screenWidth > image.formats.small.width) {
            return `url(http://localhost:1337${image.formats.medium.url})`;
        } else {
            return `url(http://localhost:1337${image.formats.small.url})`;
        }
    };

    const addImage = {
         backgroundImage: determineBackgroundImage(width, props.image)
    }

    return (

        <div className="main-region">
            <div id="public-home">
                <div className='section header' >
                    <div className='photo' >
                        <div className="bannerDiv bannerlightfamily" style={addImage}>
                            <div style={{ paddingTop: "1.5em" }}>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}