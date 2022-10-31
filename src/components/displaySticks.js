import React from 'react';

import Stick from './stick';

// styles
import './displaySticks.css'


export default function DisplaySticks({howMany}) {
    const emptyArray = Array(howMany).fill(0);

    if (howMany < 0 || howMany > 1000) {
        console.log('error, must be between 0 and 1000 sticks')
        return (
            <div>
                <p>
                    Error, must be between 0 and 1000 sticks
                </p>
            </div>
        )
    }
  
    return (
        
            <div className="stick-container">
              {emptyArray.map((x, i) => <Stick key={i} /> )}
           </div>
        
    )
}

