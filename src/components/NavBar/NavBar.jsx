import { useState, useEffect } from "react";
import Logo from "./Logo";
import LogInBtn from "./LogInBtn";
import SignUpBtn from "./SignUpBtn";
import HamburgerBar from "./HamburgerBar";

function NavBar({ onLogoClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`w-full bg-brown-100/95 backdrop-blur-sm border-b border-[#DAD6D1] fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 ${isScrolled ? 'shadow-md bg-brown-100' : ''}`}>
        <div className="w-full mx-auto h-[48px] lg:h-[80px] flex items-center justify-between pt-3 pb-3 pl-6 pr-6 lg:pt-4 lg:pb-4 lg:pl-[120px] lg:pr-[120px]">
          <Logo onLogoClick={onLogoClick} />
          <HamburgerBar isOpen={isMenuOpen} onClick={toggleMenu} />
          <div className="hidden lg:flex items-center w-[276px] h-[48px] gap-2">
            <LogInBtn />
            <SignUpBtn />
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu - Only show below lg */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[48px] left-1/2 -translate-x-1/2 min-[425px]:left-0 min-[425px]:translate-x-0 w-[375px] min-[425px]:w-full h-[200px] bg-[#F9F8F6] flex flex-col items-center gap-6 pt-10 pb-10 px-6 z-[10001]" style={{ boxShadow: '2px 2px 16px 0px rgba(0, 0, 0, 0.1)' }}>
          <button className="w-[327px] min-[425px]:w-full min-[425px]:max-w-[327px] h-[48px] pt-3 pr-10 pb-3 pl-10 gap-1.5 bg-white border border-brown-600 text-brown-600 font-sans text-[16px] font-medium leading-[24px] tracking-[0%] rounded-full hover:bg-brown-100 transition-colors flex items-center justify-center whitespace-nowrap">
            Log in
          </button>
          <button className="w-[327px] min-[425px]:w-full min-[425px]:max-w-[327px] h-[48px] pt-3 pr-10 pb-3 pl-10 gap-1.5 bg-brown-600 text-white font-sans text-[16px] font-medium leading-[24px] tracking-[0%] rounded-full hover:bg-brown-500 transition-colors flex items-center justify-center whitespace-nowrap">
            Sign up
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;


