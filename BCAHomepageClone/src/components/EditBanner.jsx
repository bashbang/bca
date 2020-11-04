import React, { useState } from 'react';
import './edit.css';

export default function Edit(props) {

    // const [topLine, setTopLine] = useState(props.topLine);
    //change topLine to be like "line" -> needs to be generic!

    return (
        
        <div className="edit main-region">
        <div className="row">
            <input
            type="textarea" 
            //validations -> max length?
            value={props.topLine.text}
            onChange={e => props.setTop({...props.topLine, text: e.target.value})}
            >
            </input>
            <div>
                <label htmlFor="color">Colour</label>
                <input 
                    type="textarea" 
                    name="color" 
                    value={props.topLine.colour}
                    //validations
                    onChange={e => props.setTop({...props.topLine, colour: e.target.value})}
                />
            </div>
            <div>
            <label htmlFor="fontSize">Font Size:</label>
            {/* <select name="topText" className="dropdown">
                <option value="Normal">Normal</option>
                <option value="Italic">Italic</option>
                <option value="Bold">Bold</option>
            </select> */}
            <input 
                    type="textarea" 
                    name="fontSize" 
                    value={props.topLine.size}
                    //validations
                    onChange={e => props.setTop({...props.topLine, size: e.target.value})}
                />
            </div>
            
        </div>
        </div>
    
    )
}