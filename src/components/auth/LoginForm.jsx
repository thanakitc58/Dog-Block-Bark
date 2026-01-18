import { Link } from 'react-router-dom'
import { useState } from 'react'

/**
 * LoginForm Component
 * Login form with Email and Password fields
 * Mobile-first design (375px)
 */
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  })

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

  // Email validation regex pattern
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      general: ''
    }
    let isValid = true

    // Email validation with custom regex
    if (!formData.email.trim()) {
      newErrors.email = 'Email must be a valid email'
      isValid = false
    } else if (!formData.email.includes('@')) {
      newErrors.email = `โปรดใส่ "@" ในที่อยู่อีเมล "${formData.email}" ขาด "@"`
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email must be a valid email'
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

    // TODO: Handle login logic with API call
    // For now, simulate login failure for demonstration
    // In real app, this would be an API call
    console.log('Log in:', formData)
    
    // Example: Simulate login failure
    // setErrors({
    //   email: '',
    //   password: '',
    //   general: 'Invalid email or password'
    // })
  }

  return (
    <div className="w-full max-w-[375px] lg:max-w-[500px] bg-[#EFEEEB] rounded-2xl p-6 lg:p-8 flex flex-col gap-6">
      {/* Title */}
      <h1 className="font-poppins font-semibold text-[28px] lg:text-[32px] leading-[36px] lg:leading-[40px] tracking-[0%] text-brown-600 text-center">
        Log in
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

        {/* Log In Button */}
        <button
          type="submit"
          className="w-auto px-8 h-12 bg-brown-600 text-white font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] rounded-full hover:bg-brown-500 transition-colors mx-auto"
        >
          Log in
        </button>

        {/* Sign Up Link */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600">
            Don't have any account?
          </span>
          <Link
            to="/signup"
            className="font-poppins font-medium text-[16px] leading-[24px] text-brown-600 underline hover:text-brown-800 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

