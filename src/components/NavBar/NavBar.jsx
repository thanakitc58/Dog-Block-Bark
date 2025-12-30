import Logo from "./Logo";
import LogInBtn from "./LogInBtn";
import SignUpBtn from "./SignUpBtn";
import HamburgerBar from "./HamburgerBar";

function NavBar() {
  return (
    <nav className="w-full bg-brown-100 border-b border-[#DAD6D1]">
      <div className="w-full mx-auto h-[48px] lg:h-[80px] flex items-center justify-between pt-3 pb-3 pl-6 pr-6 lg:pt-4 lg:pb-4 lg:pl-[120px] lg:pr-[120px]">
        <Logo />
        <HamburgerBar />
        <div className="hidden lg:flex items-center w-[276px] h-[48px] gap-2">
          <LogInBtn />
          <SignUpBtn />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;


