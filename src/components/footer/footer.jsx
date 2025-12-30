import { Linkedin, Github } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full bg-[#EFEEEB]">
      <div className="w-full max-w-[1440px] h-[144px] mx-auto mt-[50px] px-4 pt-10 pb-6 lg:px-[120px] lg:py-[60px] flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:items-center">
        {/* Top Section - Get in touch and Social Icons */}
        <div className="flex flex-row items-center justify-center lg:justify-start gap-4">
          <p className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] text-brown-500">
            Get in touch
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* LinkedIn Icon */}
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <Linkedin size={16} className="text-white" />
            </a>

            {/* GitHub Icon */}
            <a 
              href="#" 
              aria-label="GitHub"
              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <Github size={16} className="text-white" />
            </a>

            {/* Google Icon */}
            <a 
              href="#" 
              aria-label="Google"
              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="white"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section - Home page Link */}
        <div className="flex justify-center lg:justify-end w-auto lg:w-auto">
          <a 
            href="#" 
            className="font-sans font-medium text-[16px] leading-[24px] text-brown-600 underline hover:text-brown-500 transition-colors"
          >
            Home page
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

