import React, { useState } from 'react';

export default function InitialNumber({...props}) {
  
    const [tempNumber, setTempNumber] = useState(props.initial);
    let initialSticks = props.initial;
    const setBeginning = props.setBeginning;
    const setChoseNumber = props.setChoseNumber;
    const setPlayer1Turn = props.setPlayer1Turn;
    
    console.log('initial', props.initial)
    
    let number = 0;
    function handleChange(e) {
        number = e.target.value.replace(/[^0-9]/g, '');
        setTempNumber(number);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('userChoice');
        initialSticks = tempNumber;
        if (initialSticks < 2 || initialSticks > 1000) {
            initialSticks = 2;
        };
        setBeginning(initialSticks);
        setChoseNumber(true);
        console.log('onEndit intialSticks', initialSticks);
        setPlayer1Turn(true);
        setTempNumber(initialSticks)
     }

    return (
        <div className="container">
            <form className="choiceContainer" onSubmit={handleSubmit}>
                 <span className='instructions'>Input an initial number of sticks or else press the button to start with {tempNumber} sticks.</span>
                 <input
                     
                     data-cy="sticks"
                     onChange={handleChange}
                     value={tempNumber}
                     type="number"
                  />
                  <button data-cy="sticks-button" className='btn'>{tempNumber} sticks</button>
                </form>
                             
        </div>
    )
}

