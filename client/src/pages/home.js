import React from 'react'
import Directions from '../components/directions'
import DisplaySticks from '../components/displaySticks'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Home() {
  const { user } = useAuthContext()
  
  const display = 100
  return (
    <div className='container'>
      {user ? <h2>Welcome {user.name}! </h2> : <h2>Welcome!</h2>}
      <p>Login with Google using the button above to save stats or continue as a guest.</p>
      <Directions />
      <DisplaySticks howMany={display}/>
     
      
    </div>
    
  )
}
