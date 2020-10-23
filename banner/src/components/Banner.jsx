import React, { useState } from 'react';
import './banner2.css';

export default function Banner(props) {

    const addImage = {
        backgroundImage: `url(http://localhost:1337${props.image})`
    }
    

    return (
       
        <div className="main-region">
            <div id="public-home">
                <div className='section header' >
                    <div className='photo' >

                        <div className="bannerDiv" style={ addImage }>
                            <div style={{paddingTop: "1.5em"}}>
                                {props.children}
                            </div>
                        </div>
                    
                    </div>
                </div>
                
            </div>
        </div>


        
    )
}