import { Link } from 'react-router-dom'
import { useState } from 'react'

/**
 * SignUpForm Component
 * Sign up form with Name, Username, Email, Password fields
 * Mobile-first design (375px)
 */
function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    general: ''
  })

  // Email validation regex pattern
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing or when password is valid
    if (errors[name]) {
      // For password, clear error if length >= 6
      if (name === 'password' && value.length >= 6) {
        setErrors({
          ...errors,
          [name]: ''
        })
      } else if (name !== 'password') {
        // For other fields, clear error when user starts typing
        setErrors({
          ...errors,
          [name]: ''
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      username: '',
      email: '',
      password: '',
      general: ''
    }
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    }

    // Email validation with custom regex
    if (!formData.email.trim()) {
      newErrors.email = 'Email must be a valid email'
      isValid = false
    } else if (!formData.email.includes('@')) {
      newErrors.email = `โปรดใส่ "@" ในที่อยู่อีเมล "${formData.email}" ขาด "@"`
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is already taken, Please try another email.'
      isValid = false
    }

    // Password validation - must be at least 6 characters
    if (!formData.password.trim()) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // TODO: Handle signup logic with API call
    console.log('Sign up:', formData)
    
    // Example: Simulate signup failure (e.g., email already taken)
    // setErrors({
    //   name: '',
    //   username: '',
    //   email: 'Email is already taken, Please try another email.',
    //   password: '',
    //   general: ''
    // })
  }

  return (
    <div className="w-full max-w-[375px] lg:max-w-[500px] bg-[#EFEEEB] rounded-2xl p-6 lg:p-8 flex flex-col gap-6">
      {/* Title */}
      <h1 className="font-poppins font-semibold text-[28px] lg:text-[32px] leading-[36px] lg:leading-[40px] tracking-[0%] text-brown-600 text-center">
        Sign up
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* General Error Message */}
        {errors.general && (
          <div className="w-full px-4 py-3 bg-red-50 border border-red-300 rounded-lg">
            <p className="font-poppins text-[14px] leading-[20px] text-red-600">
              {errors.general}
            </p>
          </div>
        )}

        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full h-12 px-4 rounded-lg border bg-white text-brown-600 font-poppins text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
            }`}
          />
          {errors.name && (
            <p className="font-poppins text-[14px] leading-[20px] text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Username Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full h-12 px-4 rounded-lg border bg-white text-brown-600 font-poppins text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
              errors.username
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
            }`}
          />
          {errors.username && (
            <p className="font-poppins text-[14px] leading-[20px] text-red-600">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-12 px-4 rounded-lg border bg-white text-brown-600 font-poppins text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
            }`}
          />
          {errors.email && (
            <p className="font-poppins text-[14px] leading-[20px] text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full h-12 px-4 rounded-lg border bg-white text-brown-600 font-poppins text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
            }`}
          />
          {errors.password && (
            <p className="font-poppins text-[14px] leading-[20px] text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-auto px-8 h-12 bg-brown-600 text-white font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] rounded-full hover:bg-brown-500 transition-colors mx-auto"
        >
          Sign up
        </button>

        {/* Login Link */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600 underline hover:text-brown-800 transition-colors"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm

