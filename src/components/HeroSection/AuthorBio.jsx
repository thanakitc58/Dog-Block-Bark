import mainImage from '../../assets/images/main.jpg'

function AuthorBio() {
  return (
    <div className="w-full mt-5 lg:mt-0 flex justify-center lg:justify-start lg:items-start">
      <div className="w-full max-w-[343px] sm:max-w-[400px] md:max-w-[500px] lg:w-[305px] lg:h-[400px] min-h-[280px] sm:min-h-[320px] md:min-h-[350px] bg-[#EFEEEB] rounded-2xl lg:rounded-[16px] p-4 sm:p-5 md:p-6 lg:p-6 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-5">
        {/* Profile Picture and Author Name Section - Horizontal Layout: gap 12px for 1440px */}
        <div className="flex flex-row items-start gap-3 sm:gap-4 md:gap-5 lg:gap-3 xl:gap-5">
          {/* Profile Picture */}
          <div className="shrink-0">
            <img 
              src={mainImage} 
              alt="Thompson P." 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full object-cover"
            />
          </div>

          {/* Author Label and Name */}
          <div className="flex flex-col gap-1 justify-center">
            <p className="font-sans text-sm sm:text-sm md:text-sm lg:text-sm text-brown-400">Author</p>
            <h3 className="font-sans text-xl sm:text-xl md:text-2xl lg:text-lg xl:text-2xl font-semibold text-brown-600">Thompson P.</h3>
          </div>
        </div>

        {/* Author Description - Full width below profile/name */}
        <div className="w-full flex flex-col gap-3 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-3">
          <p className="font-sans font-medium text-[16px] sm:text-[16px] md:text-[16px] lg:text-[14px] xl:text-[16px] leading-[20px] lg:leading-[22px] xl:leading-[24px] tracking-[0%] text-[#75716B]">
            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
          </p>
          <p className="font-sans font-medium text-[16px] sm:text-[16px] md:text-[16px] lg:text-[14px] xl:text-[16px] leading-[20px] lg:leading-[22px] xl:leading-[24px] tracking-[0%] text-[#75716B]">
            When I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthorBio

