import React from 'react';
import useWindowDimensions from './WindowDimensions'

export default function Banner(props) {

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
         backgroundImage: determineBackgroundImage(width, props.image, props.tabletImage, props.mobileImage, props.smallMobileImage)
    }

    return (

        <div className="main-region">
            <div id="public-home">
                <div className='section header' >
                    <div className='photo' >
                        <div className="bannerlightfamily" style={addImage}>
                                {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}