import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

// styles and images
import './navbar.css'
import logo from '../assets/logo.png'
//import { useNavigate } from 'react-router-dom'

export default function Navbar () {
 const { user } = useAuthContext()
 const handleLogin = () => {
    

 }

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={logo} alt='logo' />
          <span>Fibonacci Nim</span>
        </li>
        <li>
          <a href='/auth/google'>
            <button className='btn' onClick={handleLogin}>Google Login</button>
          </a>
        </li>
        <li>
          <a href="/auth/logout">
            <button className='btn'>Google Logout</button>
          </a>
        </li>
        {user ? <p>Welcome {user.name} </p> : ''}
        <li>
          <Link data-cy="home" to='/'>Home</Link>
        </li>
        <li>
          <Link data-cy="ai" to='/againstAI'>Play A.I. Fibi</Link>
        </li>

        <li>
          <Link data-cy="local" to='/local'>2 Players 1 Screen</Link>
        </li>
        <li>
          <Link data-cy="online" to='/online'>Online</Link>
        </li>
      </ul>
    </div>
  )
}
