import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../context/AuthContext'

/**
 * LoginForm Component
 * Login form with Email and Password fields
 * Mobile-first design (375px)
 */
function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  
  const {
    formData,
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: {
        required: true,
        message: 'Email must be a valid email'
      },
      password: {
        required: true,
        message: 'Password must be at least 6 characters'
      }
    },
    onSubmit: (formData) => {
      // TODO: Handle login logic with API call
      // For now, redirect to success page when form is valid
      // In real app, this would be an API call first
      console.log('Log in:', formData)
      
      // Login user with email
      const emailUsername = formData.email.split('@')[0] || 'user'
      login({
        name: emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1),
        username: emailUsername,
        email: formData.email
      })
      
      // Navigate to success page
      navigate('/success')
    }
  })

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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-poppins text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
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

