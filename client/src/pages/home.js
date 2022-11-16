import React from 'react'
import Directions from '../components/directions'
import DisplaySticks from '../components/displaySticks'
//import { useCookies } from 'react-cookie';

export default function Home() {
  //const [cookies, setCookie] = useCookies(['user']);

  // function onChange(newName) {
  //   setCookie('user', newName, { path: '/' });
  // }
  
  const display = 100
  return (
    <div className='container'>
      <h2>Welcome! </h2>
      <p>Here is your secret: 
        <a href="/secret">Show me!</a>
       
      </p>
      <p>Login with Google using the button above to save stats or continue as a guest.</p>
      <Directions />
      <DisplaySticks howMany={display}/>
     
      
    </div>
    
  )
}
