import logoImage from '../../assets/images/logo.svg'

function Logo() {
  return (
    <div className="flex items-center">
      <img src={logoImage} alt="Logo" className="w-6 h-6 sm:w-auto sm:h-auto" />
    </div>
  )
}

export default Logo


