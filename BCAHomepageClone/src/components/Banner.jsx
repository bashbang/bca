import React from 'react';
import useWindowDimensions from './WindowDimensions'

export default function Banner(props) {

    const {height, width} = useWindowDimensions(); 
    const determineBackgroundImage = (screenWidth, image, tabletImage, mobileImage, smallMobileImage, rootUrl) => {
        if(screenWidth > 767) {
            return `url(${rootUrl}${image.url})`;
        } else  if(screenWidth > 414) {
            return `url(${rootUrl}${tabletImage.url})`;
        } else if(screenWidth > 321) {
            return `url(${rootUrl}${mobileImage.url})`;
        } else {
            return `url(${rootUrl}${smallMobileImage.url})`;
        }
    };

    const addImage = {
         backgroundImage: determineBackgroundImage(width, props.image, props.tabletImage, props.mobileImage, props.smallMobileImage, props.rootUrl)
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