import { useState } from 'react'

/**
 * Email validation regex pattern
 * NOTE: Do NOT use global flag here because it makes `.test` stateful
 * and causes valid emails to randomly fail on subsequent validations.
 */
export const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/im

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} Form state and validation functions
 */
export function useFormValidation(initialValues = {}, validationRules = {}) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})

  /**
   * Validate email field
   * @param {string} email - Email to validate
   * @returns {string} Error message or empty string
   */
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email must be a valid email'
    }
    if (!email.includes('@')) {
      return `โปรดใส่ "@" ในที่อยู่อีเมล "${email}" ขาด "@"`
    }
    if (!emailRegex.test(email)) {
      return 'Email must be a valid email'
    }
    return ''
  }

  /**
   * Validate password field
   * @param {string} password - Password to validate
   * @returns {string} Error message or empty string
   */
  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password must be at least 6 characters'
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return ''
  }

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    // Live validation for email field
    if (name === 'email') {
      const emailError = validateEmail(value)
      setErrors((prev) => ({
        ...prev,
        email: emailError
      }))
      return
    }
    
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

  /**
   * Validate form based on validation rules
   * @returns {boolean} Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Apply custom validation rules first
    Object.keys(validationRules).forEach((fieldName) => {
      const rule = validationRules[fieldName]
      const value = formData[fieldName]
      let error = ''

      // Check if field is required
      if (rule.required && !value?.trim()) {
        error = rule.message || `${fieldName} is required`
        isValid = false
      }

      // Apply custom validator function (has priority over built-in validators)
      if (rule.validator && !error) {
        error = rule.validator(value, formData)
        if (error) {
          isValid = false
        }
      }

      if (error) {
        newErrors[fieldName] = error
      }
    })

    // Built-in validators for common fields (only if not already validated by custom rules)
    if (formData.email !== undefined && !validationRules.email?.validator) {
      const emailError = validateEmail(formData.email)
      if (emailError) {
        newErrors.email = emailError
        isValid = false
      }
    }

    if (formData.password !== undefined && !validationRules.password?.validator) {
      const passwordError = validatePassword(formData.password)
      if (passwordError) {
        newErrors.password = passwordError
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  /**
   * Reset form to initial values
   */
  const resetForm = () => {
    setFormData(initialValues)
    setErrors({})
  }

  /**
   * Set error for a specific field
   * @param {string} fieldName - Field name
   * @param {string} errorMessage - Error message
   */
  const setFieldError = (fieldName, errorMessage) => {
    setErrors({
      ...errors,
      [fieldName]: errorMessage
    })
  }

  /**
   * Set general error message
   * @param {string} errorMessage - General error message
   */
  const setGeneralError = (errorMessage) => {
    setErrors({
      ...errors,
      general: errorMessage
    })
  }

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFieldError,
    setGeneralError,
    setFormData,
    setErrors
  }
}

