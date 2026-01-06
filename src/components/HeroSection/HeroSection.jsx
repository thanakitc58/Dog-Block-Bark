import mainImage from '../../assets/images/main.jpg'

function HeroSection() {
  return (
    <section className="w-full min-h-full lg:min-h-[529px] mx-auto pt-[68px] lg:pt-[130px] pb-10 px-4 lg:px-[120px] bg-[#F9F8F6] flex flex-col lg:flex-row items-center lg:items-start justify-center lg:gap-[60px] gap-10">
      {/* Div 1 - Title Section */}
      <div className="w-full lg:w-[347px] h-auto lg:h-[276px] opacity-100 flex flex-col gap-6 lg:gap-6 lg:pt-0 xl:mt-[126px]">
        {/* Title */}
        <div className="w-full h-auto lg:h-auto flex items-center justify-center lg:justify-end">
          <h2 className="font-sans text-[40px] lg:text-[52px] font-semibold leading-[48px] lg:leading-[60px] tracking-[0%] text-center lg:text-right text-brown-600">
            <span className="hidden xl:inline xl:text-right">Stay<br />Informed,<br /> Stay Inspired</span>
            <span className="xl:hidden">Stay Informed,<br />Stay Inspired</span>
          </h2>
        </div>
        
        {/* Description Text */}
        <div className="w-full h-auto opacity-100 flex items-center justify-center lg:justify-end">
          <p className="font-sans font-medium text-[16px] leading-[24px] tracking-[0%] text-[#75716B] text-center lg:text-right">
            <span className="hidden xl:inline xl:text-right">Discover a World of Knowledge at Your Fingertips.<br />Your Daily Dose of Inspiration and Information.</span>
            <span className="xl:hidden">Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.</span>
          </p>
        </div>
      </div>

      {/* Div 2 - Pic Section */}
      <div 
        className="relative w-full lg:w-[386px] h-[470px] lg:h-[529px] opacity-100 rounded-2xl lg:rounded-[16px] overflow-hidden group cursor-pointer"
        style={{
          background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(190, 187, 177, 0.25), rgba(190, 187, 177, 0.25))'
        }}
      >
        <img 
          src={mainImage} 
          alt="Author with cat" 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl lg:rounded-[16px] pointer-events-none"></div>
      </div>

      {/* Div 3 - Description Section */}
      <div className="w-full lg:w-[347px] h-auto lg:h-[284px] opacity-100 flex flex-col gap-3 lg:gap-3 items-center lg:items-start lg:pt-0 xl:mt-[126px]">
        {/* Author Label and Name */}
        <div className="w-full h-auto lg:h-auto opacity-100 flex flex-col gap-1  lg:items-start">
          <p className="font-sans text-body-3 text-brown-400  lg:text-left">-Author</p>
          <h3 className="font-sans text-headline-3 text-brown-600 lg:text-left">Thompson P.</h3>
        </div>

        {/* Author Description */}
        <div className="w-full h-auto opacity-100 flex items-center lg:items-start">
          <p className="font-sans font-medium text-[16px] leading-[24px] tracking-[0%] text-[#75716B] text lg:text-left">
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


