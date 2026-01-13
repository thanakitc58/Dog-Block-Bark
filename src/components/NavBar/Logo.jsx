import { Link } from 'react-router-dom'
import logoImage from '../../assets/images/logo.svg'

function Logo() {
  return (
    <Link 
      to="/"
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="Home"
    >
      <img src={logoImage} alt="Logo" className="w-6 h-6 sm:w-auto sm:h-auto" />
    </Link>
  )
}

export default Logo


