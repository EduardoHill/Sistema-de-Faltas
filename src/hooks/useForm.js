import { useState, useCallback } from 'react'

/**
 * Custom hook for managing form state and validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validationSchema - Validation function
 * @returns {Object} - Form state and handlers
 */
export const useForm = (initialValues = {}, validationSchema = null) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }))

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true)

      // Validate if schema provided
      if (validationSchema) {
        const validationErrors = validationSchema(values)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
          setIsSubmitting(false)
          return
        }
      }

      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validationSchema]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldError = useCallback((field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }, [])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setFieldError,
    setValues,
  }
}
