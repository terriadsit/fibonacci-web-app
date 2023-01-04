import { Link } from 'react-router-dom'

import Directions from '../components/directions'
import DisplaySticks from '../components/displaySticks'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Home() {
  const { user } = useAuthContext()
  const display = 100
  return (
    <div className='container'>
      
      {user ? '' :<p>Login with Google using the button above to save stats or continue as a guest.</p>}
      
      <Directions />
      <div className='link'>
        <Link data-cy="privacy" to='/privacy'>Privacy Policy</Link>
      </div>
      <DisplaySticks howMany={display}/>
     
      
    </div>
    
  )
}
