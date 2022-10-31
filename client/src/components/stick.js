import React from 'react';

// styles
import './stick.css';

export default function Stick() {

    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const stickStyle = '#' + randomColor;
    const stickTilt = 'rotate(' + Math.floor(Math.random()*360) + 'deg)';
    
    return (
        <div >
            
            <p className='stick' style={{backgroundColor: stickStyle, transform: stickTilt }}></p>
       
        </div>
    )
}

