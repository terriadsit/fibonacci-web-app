import { Link } from 'react-router-dom'

// styles and images
import './navbar.css'
import logo from '../assets/logo.png'
//import { useNavigate } from 'react-router-dom'

export default function Navbar () {
 // const navigate = useNavigate()

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={logo} alt='logo' />
          <span>Fibonacci Nim</span>
        </li>
        <li>
          <Link data-cy="login" to='/login'>Login</Link>
        </li>
        <li>
          <Link data-cy="logout" to='/auth/logout'>Sign out</Link>
        </li>
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
