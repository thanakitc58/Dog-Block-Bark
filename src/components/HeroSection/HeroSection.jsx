import mainImage from '../../assets/images/main.jpg'

function HeroSection() {
  return (
    <section className="w-full min-h-[1098px] min-[1024px]:min-h-[529px] min-[1024px]:mt-[50px] mx-auto pt-5 pb-10 px-4 min-[1024px]:px-[120px] flex flex-col min-[1024px]:flex-row items-center min-[1024px]:items-start justify-center min-[1024px]:gap-[60px] gap-10 min-[768px]:mt-[-50px]">
      {/* Div 1 - Title Section */}
      <div className="w-full min-[1024px]:w-[347px] h-auto min-[1024px]:h-[276px] opacity-100 flex flex-col gap-6 min-[1024px]:gap-6 min-[1024px]:pt-0 min-[1440px]:mt-[126px]">
        {/* Title */}
        <div className="w-full h-auto min-[1024px]:h-auto flex items-center justify-center min-[1024px]:justify-end">
          <h2 className="font-sans text-[40px] min-[1024px]:text-[52px] font-semibold leading-[48px] min-[1024px]:leading-[60px] tracking-[0%] text-center min-[1024px]:text-right text-brown-600">
            <span className="hidden min-[1440px]:inline min-[1440px]:text-right">Stay<br />Informed,<br /> Stay Inspired</span>
            <span className="min-[1440px]:hidden">Stay Informed,<br />Stay Inspired</span>
          </h2>
        </div>
        
        {/* Description Text */}
        <div className="w-full h-auto opacity-100 flex items-center justify-center min-[1024px]:justify-end">
          <p className="font-sans font-medium text-[16px] leading-[24px] tracking-[0%] text-[#75716B] text-center min-[1024px]:text-right">
            <span className="hidden min-[1440px]:inline min-[1440px]:text-right">Discover a World of Knowledge at Your Fingertips.<br />Your Daily Dose of Inspiration and Information.</span>
            <span className="min-[1440px]:hidden">Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.</span>
          </p>
        </div>
      </div>

      {/* Div 2 - Pic Section */}
      <div 
        className="w-full min-[1024px]:w-[386px] h-[470px] min-[1024px]:h-[529px] opacity-100 rounded-2xl min-[1024px]:rounded-[16px] overflow-hidden"
        style={{
          background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(190, 187, 177, 0.25), rgba(190, 187, 177, 0.25))'
        }}
      >
        <img 
          src={mainImage} 
          alt="Author with cat" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Div 3 - Description Section */}
      <div className="w-full min-[1024px]:w-[347px] h-auto min-[1024px]:h-[284px] opacity-100 flex flex-col gap-3 min-[1024px]:gap-3 items-center min-[1024px]:items-start min-[1024px]:pt-0 min-[1440px]:mt-[126px]">
        {/* Author Label and Name */}
        <div className="w-full h-auto min-[1024px]:h-auto opacity-100 flex flex-col gap-1  min-[1024px]:items-start">
          <p className="font-sans text-body-3 text-brown-400  min-[1024px]:text-left">-Author</p>
          <h3 className="font-sans text-headline-3 text-brown-600 min-[1024px]:text-left">Thompson P.</h3>
        </div>

        {/* Author Description */}
        <div className="w-full h-auto opacity-100 flex items-center min-[1024px]:items-start">
          <p className="font-sans font-medium text-[16px] leading-[24px] tracking-[0%] text-[#75716B] text min-[1024px]:text-left">
            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
            <br /><br />
            When i'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection


