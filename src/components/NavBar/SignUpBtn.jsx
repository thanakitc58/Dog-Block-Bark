import { Link } from 'react-router-dom'

function SignUpBtn() {
  return (
    <Link
      to="/signup"
      className="w-[127px] h-[48px] pt-3 pr-10 pb-3 pl-10 gap-1.5 bg-brown-600 text-white font-sans text-[16px] font-medium leading-[24px] tracking-[0%] rounded-full hover:bg-brown-500 transition-colors flex items-center justify-center whitespace-nowrap"
    >
      Sign up
    </Link>
  )
}

export default SignUpBtn


