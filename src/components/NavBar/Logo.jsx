import logoImage from '../../assets/images/logo.svg'

function Logo({ onLogoClick }) {
  const handleClick = () => {
    if (onLogoClick) {
      onLogoClick()
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="Home"
    >
      <img src={logoImage} alt="Logo" className="w-6 h-6 sm:w-auto sm:h-auto" />
    </button>
  )
}

export default Logo


