import { createContext, useContext, useState, useEffect } from 'react'
import { API_BASE_URL } from '../constants/api'
/**
 * AuthContext
 * Global state management for authentication
 */
const AuthContext = createContext(null)

/**
 * AuthProvider Component
 * Provides authentication state and functions to children
 */
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Load authentication state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      // Verify token is still valid by fetching user data
      const verifyToken = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/get-user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
            setIsAuthenticated(true)
          } else {
            // Token expired or invalid, clear storage
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            localStorage.removeItem('isAuthenticated')
          }
        } catch (error) {
          console.error('Error verifying token:', error)
          localStorage.removeItem('access_token')
          localStorage.removeItem('user')
          localStorage.removeItem('isAuthenticated')
        }
      }

      verifyToken()
    }
  }, [])

  /**
   * Login user with email and password
   * Connects to Supabase API and stores token
   */
  const login = async (credentials) => {
    const { email, password } = credentials
    
    try {
      // Debug: Log request data
      const requestBody = { email, password }
      console.log('📤 Login Request:', requestBody)
      console.log('📤 API URL:', `${API_BASE_URL}/auth/login`)
      
      // Step 1: Login and get access token
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('📥 Login Response Status:', loginResponse.status, loginResponse.statusText)
      
      let loginData
      try {
        loginData = await loginResponse.json()
        console.log('📥 Login Response Data:', loginData)
      } catch (parseError) {
        console.error('❌ Failed to parse login response:', parseError)
        return {
          success: false,
          error: 'Invalid response from server',
        }
      }

      if (!loginResponse.ok) {
        console.error('❌ Login Error:', loginData)
        return {
          success: false,
          error: loginData?.error || `Login failed (${loginResponse.status})`,
        }
      }

      // Step 2: Get user data using the access token
      const accessToken = loginData.access_token
      
      // Debug: Check if token exists
      console.log('🔑 Login Response:', loginData)
      console.log('🔑 Access Token received:', accessToken ? '✅ Token exists' : '❌ Token missing')
      console.log('🔑 Token value:', accessToken)
      const userResponse = await fetch(`${API_BASE_URL}/auth/get-user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })

      const userData = await userResponse.json()

      if (!userResponse.ok) {
        return {
          success: false,
          error: userData.error || 'Failed to fetch user data',
        }
      }

      // Step 3: Store token and user data
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')

      // Debug: Verify token was stored
      const storedToken = localStorage.getItem('access_token')
      console.log('💾 Token stored in localStorage:', storedToken ? '✅ Success' : '❌ Failed')
      console.log('💾 Stored token value:', storedToken)

      // Step 4: Update state
      setUser(userData)
      setIsAuthenticated(true)

      return {
        success: true,
        message: loginData.message,
        user: userData,
        accessToken,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred during login',
      }
    }
  }

  /**
   * Update user data (e.g. after profile picture upload) without re-login
   */
  const updateUser = (userData) => {
    if (!userData) return
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  /**
   * Logout user
   */
  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }

  /**
   * Register new user
   */
  const register = async (userData) => {
    const { email, password, username, name } = userData
    
    try {
      // Debug: Log request data
      const requestBody = { email, password, username, name }
      console.log('📤 Register Request:', requestBody)
      console.log('📤 API URL:', `${API_BASE_URL}/auth/register`)
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('📥 Register Response Status:', response.status, response.statusText)
      
      let data
      try {
        data = await response.json()
        console.log('📥 Register Response Data:', data)
      } catch (parseError) {
        console.error('❌ Failed to parse register response:', parseError)
        return {
          success: false,
          error: 'Invalid response from server',
        }
      }

      if (!response.ok) {
        console.error('❌ Register Error:', data)
        return {
          success: false,
          error: data?.error || `Registration failed (${response.status})`,
        }
      }

      return {
        success: true,
        message: data.message,
        user: data.user,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred during registration',
      }
    }
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth Hook
 * Access authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

