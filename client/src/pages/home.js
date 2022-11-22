import React from 'react'
import Directions from '../components/directions'
import DisplaySticks from '../components/displaySticks'

export default function Home() {
    
  const display = 100
  return (
    <div className='container'>
      <p>Login with Google using the button above to save stats or continue as a guest.</p>
      <Directions />
      <DisplaySticks howMany={display}/>
     
      
    </div>
    
  )
}
