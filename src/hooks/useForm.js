import { useFormValidation } from './useFormValidation'

/**
 * Custom hook for form management with validation
 * Combines form state and validation logic
 * 
 * @param {Object} options - Form options
 * @param {Object} options.initialValues - Initial form values
 * @param {Object} options.validationRules - Validation rules
 * @param {Function} options.onSubmit - Submit handler
 * @returns {Object} Form state and handlers
 */
export function useForm({ initialValues = {}, validationRules = {}, onSubmit }) {
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFieldError,
    setGeneralError,
    setFormData,
    setErrors
  } = useFormValidation(initialValues, validationRules)

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (onSubmit) {
      onSubmit(formData, { setFieldError, setGeneralError })
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    validateForm,
    resetForm,
    setFieldError,
    setGeneralError,
    setFormData,
    setErrors
  }
}

