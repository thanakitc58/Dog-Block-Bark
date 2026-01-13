import mainImage from '../../assets/images/main.jpg'

function AuthorBio() {
  return (
    <div className="w-full mt-5 lg:mt-12 flex justify-center lg:justify-start">
      <div className="w-full max-w-[343px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] min-h-[376px] lg:min-h-auto bg-[#EFEEEB] rounded-2xl p-6 sm:p-6 md:p-7 lg:p-8 flex flex-col gap-5 sm:gap-5 md:gap-5 lg:gap-6">
        {/* Profile Picture and Author Name Section */}
        <div className="flex flex-row items-start gap-4 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img 
              src={mainImage} 
              alt="Thompson P." 
              className="w-11 h-11 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full object-cover"
            />
          </div>

          {/* Author Label and Name */}
          <div className="flex flex-col gap-1 justify-center">
            <p className="font-sans text-sm sm:text-sm md:text-sm lg:text-sm text-brown-400">Author</p>
            <h3 className="font-sans text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-brown-600">Thompson P.</h3>
          </div>
        </div>

        {/* Author Description */}
        <div className="flex flex-col gap-4 sm:gap-4 md:gap-4 lg:gap-4">
          <p className="font-sans font-medium text-[16px] sm:text-[16px] md:text-[16px] lg:text-[16px] leading-[24px] tracking-[0%] text-[#75716B]">
            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
          </p>
          <p className="font-sans font-medium text-[16px] sm:text-[16px] md:text-[16px] lg:text-[16px] leading-[24px] tracking-[0%] text-[#75716B]">
            When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthorBio

