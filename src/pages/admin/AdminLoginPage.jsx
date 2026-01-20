import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useScrollToTop } from '../../hooks/useScrollToTop'

/**
 * AdminLoginPage Component
 * Admin login page with username and password
 */
function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  useScrollToTop()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Trim whitespace and check admin credentials
    const username = formData.username.trim().toLowerCase()
    const password = formData.password.trim()

    console.log('Login attempt:', { username, password })

    // Check admin credentials (case-insensitive for username)
    if (username === 'admin' && password === 'admin') {
      console.log('Admin credentials valid, logging in...')
      
      // Set admin flag in user data
      login({
        name: 'Admin',
        username: 'admin',
        email: 'admin@example.com',
        isAdmin: true
      })
      
      console.log('Login successful, navigating to dashboard...')
      
      // Navigate to admin dashboard
      navigate('/admin/dashboard')
    } else {
      console.log('Invalid credentials')
      setError('Invalid username or password. Please use: username = "admin", password = "admin"')
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-brown-600 mb-6 text-center">
          Admin Login
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-brown-600 mb-2">
              Username <span className="text-xs text-gray-500">(use: admin)</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
              placeholder="Enter username (admin)"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brown-600 mb-2">
              Password <span className="text-xs text-gray-500">(use: admin)</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
              placeholder="Enter password (admin)"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage

