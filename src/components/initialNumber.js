import React, { useState, useEffect, useRef } from 'react';

export default function InitialNumber({...props}) {

    // const focusRef = useRef()

    // useEffect(() => {     
    //   if (focusRef.current) focusRef.current.focus()
    // },[focusRef])
  
    const [tempNumber, setTempNumber] = useState(props.initial);
    const [userNumberChoice, setUserNumberChoice] = useState(1);
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
        console.log('userChoice', userNumberChoice);
        initialSticks = tempNumber === initialSticks ? initialSticks : tempNumber;
        if (initialSticks < 2 || initialSticks > 1000) {
            initialSticks = 2;
        };
        setBeginning(initialSticks);
        setChoseNumber(true);
        console.log('onEndit intialSticks', initialSticks);
        setPlayer1Turn(true);
     }

    function hide() {
        setBeginning(initialSticks);
        setChoseNumber(true);
        console.log('in hide', initialSticks)
    }

    return (
        <div className="container">
            <form className="choiceContainer" onSubmit={handleSubmit}>
                 <span className='instructions'>Input an initial number of sticks or else press the button to start with {initialSticks} sticks.</span>
                 <input
                     
                    //  ref={focusRef}
                     onChange={handleChange}
                     value={tempNumber}
                     type="number"
                  />
                </form>
                
                <p>Or : </p>
               
                
                  <button className='btn' onClick={hide}>{initialSticks}</button>
              
        </div>
    )
}

