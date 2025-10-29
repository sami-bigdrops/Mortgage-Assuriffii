'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, DollarSign, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ZipCodeInput, RadioButtonGroup, RangeSlider, TextInput, StateDropdown, PhoneInput, type RadioOption } from '@/components/ui'
import ProgressBar from '@/components/ui/ProgressBar'
import { validateZipCode, validateEmail, validateName, validateAddress, validateCity, validatePhoneNumber } from '@/utils/validation'

const Refinance = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    productType: 'PP_REFI',
    zipCode: '',
    propertyType: '',
    propertyPurpose: '',
    creditGrade: '',
    estimatedHomeValue: 250000,
    mortgageBalance: 0,
    firstMortgageInterest: 5.25,
    secondMortgage: '',
    secondMortgageBalance: 0,
    secondMortgageInterest: 6,
    additionalCash: 0,
    loanType: '',
    bankruptcyOrForeclosure: '',
    currentlyEmployed: '',
    lateMortgagePayments: '',
    veteranStatus: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    addressState: '',
    phoneNumber: '',
  })

  const handleInputChange = (field: string, value: string | number, autoAdvance = false) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    
    // Auto-advance to next step if enabled
    if (autoAdvance) {
      // Use setTimeout to ensure state is updated first
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 150)
    }
  }

  // Validate field on blur
  const validateField = (field: string, value: string | number) => {
    let validation: { valid: boolean; error?: string } = { valid: true }

    switch (field) {
      case 'zipCode':
        validation = validateZipCode(String(value))
        break
      case 'email':
        validation = validateEmail(String(value))
        break
      case 'firstName':
        validation = validateName(String(value), 'First name')
        break
      case 'lastName':
        validation = validateName(String(value), 'Last name')
        break
      case 'address':
        validation = validateAddress(String(value))
        break
      case 'city':
        validation = validateCity(String(value))
        break
      case 'phoneNumber':
        validation = validatePhoneNumber(String(value))
        break
    }

    if (!validation.valid && validation.error) {
      setErrors(prev => ({ ...prev, [field]: validation.error! }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    return validation.valid
  }

  const handleNext = async () => {
    if (isStepValid()) {
      if (currentStep === 20) {
        // Submit form
        setIsSubmitting(true)
        try {
          // Get addressZip from URL or localStorage (this is for the address)
          let addressZip = ''
          const urlZip = searchParams.get('zip_code')
          if (urlZip && urlZip.length === 5) {
            addressZip = urlZip
            // Also store in localStorage for fallback
            if (typeof window !== 'undefined') {
              localStorage.setItem('zip_code', urlZip)
            }
          } else if (typeof window !== 'undefined') {
            const storedZip = localStorage.getItem('zip_code')
            if (storedZip && storedZip.length === 5) {
              addressZip = storedZip
            }
          }

          const formDataToSubmit = {
            ...formData,
            addressZip: addressZip, // Use zip code from URL/localStorage for address
          }

          const response = await fetch('/api/submit-refinance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSubmit),
          })

          const result = await response.json()

          if (result.success) {
            // Redirect to thank you page (from API response or default)
            const redirectUrl = result.redirectUrl || '/thankyou'
            router.push(redirectUrl)
          } else {
            alert('Form submission failed. Please try again.')
            setIsSubmitting(false)
          }
        } catch (error) {
          console.error('Error submitting form:', error)
          alert('An error occurred. Please try again.')
          setIsSubmitting(false)
        }
      } else {
        setCurrentStep(prev => prev + 1)
        console.log('Form data:', formData)
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => {
      // If on step 11 and user selected "No" for secondMortgage, go back to step 8
      if (prev === 11 && formData.secondMortgage === 'no') {
        return 8
      }
      // Otherwise, go back one step normally
      return prev - 1
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return validateZipCode(formData.zipCode).valid && !errors.zipCode
      case 2:
        return formData.propertyType !== ''
      case 3:
        return formData.propertyPurpose !== ''
      case 4:
        return formData.creditGrade !== ''
      case 5:
        return formData.estimatedHomeValue > 0
      case 6:
        return formData.mortgageBalance > 0 && formData.mortgageBalance <= formData.estimatedHomeValue
      case 7:
        return formData.firstMortgageInterest >= 3 && formData.firstMortgageInterest <= 24
      case 8:
        return formData.secondMortgage !== ''
      case 9:
        return formData.secondMortgageBalance >= 0 && formData.secondMortgageBalance <= 3000000
      case 10:
        return formData.secondMortgageInterest >= 0 && formData.secondMortgageInterest <= 24
      case 11:
        return formData.additionalCash >= 0 && formData.additionalCash <= 2000000
      case 12:
        return formData.loanType !== ''
      case 13:
        return formData.bankruptcyOrForeclosure !== ''
      case 14:
        return formData.currentlyEmployed !== ''
      case 15:
        return formData.lateMortgagePayments !== ''
      case 16:
        return formData.veteranStatus !== ''
      case 17:
        return validateEmail(formData.email).valid && !errors.email
      case 18:
        return (
          validateName(formData.firstName, 'First name').valid &&
          validateName(formData.lastName, 'Last name').valid &&
          !errors.firstName &&
          !errors.lastName
        )
      case 19:
        return (
          validateAddress(formData.address).valid &&
          validateCity(formData.city).valid &&
          formData.addressState !== '' &&
          !errors.address &&
          !errors.city
        )
      case 20:
        return validatePhoneNumber(formData.phoneNumber).valid && !errors.phoneNumber
      default:
        return false
    }
  }


  // Handler for redirecting to buy-home form with zip code from localStorage
  const handleRedirectToBuyHome = () => {
    // Get zip code from localStorage first (stored when user clicks Continue in Hero)
    let zipCode = ''
    
    if (typeof window !== 'undefined') {
      const storedZip = localStorage.getItem('zip_code')
      if (storedZip && storedZip.length === 5) {
        zipCode = storedZip
      }
    }
    
    // Fallback to URL params if localStorage doesn't have it
    if (!zipCode) {
      const urlZip = searchParams.get('zip_code')
      if (urlZip && urlZip.length === 5) {
        zipCode = urlZip
      }
    }
    
    // Final fallback to formData.zipCode
    if (!zipCode && formData.zipCode && formData.zipCode.length === 5) {
      zipCode = formData.zipCode
    }
    
    // Build redirect URL with zip code if available
    const redirectUrl = zipCode 
      ? `/form/buy-home?zip_code=${zipCode}`
      : '/form/buy-home'
    
    router.push(redirectUrl)
  }

  // Calculate default mortgage balance (70% of estimated home value)
  const getDefaultMortgageBalance = () => {
    return Math.round(formData.estimatedHomeValue * 0.7)
  }

  // Calculate default additional cash (80% of home value minus existing mortgage balances)
  const getDefaultAdditionalCash = () => {
    const maxLoanAmount = Math.round(formData.estimatedHomeValue * 0.8)
    const totalMortgageBalances = formData.mortgageBalance + formData.secondMortgageBalance
    const defaultCash = Math.max(0, maxLoanAmount - totalMortgageBalances)
    return defaultCash
  }

  // Get min and max for mortgage balance
  const getMortgageBalanceMin = () => {
    return 50000
  }

  const getMortgageBalanceMax = () => {
    // Max is 100% of estimated home value, but display cap at $1.5M
    return Math.min(formData.estimatedHomeValue, 1500000)
  }

  // Format mortgage balance value for display
  const formatMortgageBalance = (val: number) => {
    if (val <= 50000) return '$50k or less'
    if (val >= 1500000) return '$1.5M or more'
    return `$${val.toLocaleString()}`
  }

  // Format first mortgage interest rate for display
  const formatInterestRate = (val: number) => {
    if (val <= 3) return '3% or less'
    // Always show the actual value with 2 decimal places (.25, .5, .75)
    return `${val.toFixed(2)}%`
  }

  // Format second mortgage balance value for display
  const formatSecondMortgageBalance = (val: number) => {
    if (val === 0) return '$0'
    if (val <= 50000) return '$50k or less'
    if (val >= 3000000) return '$3M or more'
    return `$${val.toLocaleString()}`
  }

  // Format second mortgage interest rate for display
  const formatSecondInterestRate = (val: number) => {
    // Always show the actual value with 2 decimal places (.25, .5, .75)
    return `${val.toFixed(2)}%`
  }

  // Format additional cash value for display
  const formatAdditionalCash = (val: number) => {
    if (val === 0) return '$0'
    return `$${val.toLocaleString()}`
  }

  // Initialize zip code from URL and store in localStorage when component mounts
  useEffect(() => {
    const urlZip = searchParams.get('zip_code')
    if (urlZip && urlZip.length === 5) {
      // Store in localStorage for button redirect
      if (typeof window !== 'undefined') {
        localStorage.setItem('zip_code', urlZip)
      }
    }
  }, [searchParams])

  // Initialize mortgage balance to 70% of estimated home value when step 6 is reached
  useEffect(() => {
    if (currentStep === 6 && formData.mortgageBalance === 0) {
      const defaultBalance = Math.round(formData.estimatedHomeValue * 0.7)
      setFormData(prev => ({
        ...prev,
        mortgageBalance: defaultBalance
      }))
    }
  }, [currentStep, formData.estimatedHomeValue, formData.mortgageBalance])

  // Initialize additional cash to 80% of home value minus mortgage balances when step 11 is reached
  // Formula: additionalCash = (80% × estimatedHomeValue) - (mortgageBalance + secondMortgageBalance)
  useEffect(() => {
    if (currentStep === 11) {
      // Always recalculate based on current values: 80% of EST_VAL minus (BAL_ONE + BAL_TWO)
      const maxLoanAmount = Math.round(formData.estimatedHomeValue * 0.8)
      const totalMortgageBalances = formData.mortgageBalance + formData.secondMortgageBalance
      const defaultCash = Math.max(0, maxLoanAmount - totalMortgageBalances)
      
      // Only set if the current value is 0 or hasn't been set yet
      setFormData(prev => {
        if (prev.additionalCash === 0 || prev.additionalCash === undefined) {
          return {
            ...prev,
            additionalCash: defaultCash
          }
        }
        return prev
      })
    }
  }, [currentStep, formData.estimatedHomeValue, formData.mortgageBalance, formData.secondMortgageBalance])

  const propertyTypes: RadioOption[] = [
    { id: 'SINGLE_FAMILY', label: 'Single Family' },
    { id: 'MULTI_FAMILY', label: 'Multi Family' },
    { id: 'CONDO', label: 'Condo' },
    { id: 'TOWNHOME', label: 'Townhome' },
    { id: 'MOBILEHOME', label: 'Mobilehome' },
  ]

  const propertyPurposeOptions: RadioOption[] = [
    { id: 'PRIMARY', label: 'Primary Residence' },
    { id: 'SECONDARY_VACTN', label: 'Vacation Home' },
    { id: 'INVESTMENT', label: 'Investment Home' },
  ]

  const creditGrades: RadioOption[] = [
    { id: 'EXCELLENT', label: 'Excellent (680+)' },
    { id: 'GOOD', label: 'Good (640-679)' },
    { id: 'AVERAGE', label: 'Average (600-639)' },
    { id: 'FAIR', label: 'Fair (560-599)' },
  ]

  const secondMortgageOptions: RadioOption[] = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  const loanTypeOptions: RadioOption[] = [
    { id: 'FIXED', label: 'Fixed' },
    { id: 'ADJUSTABLE', label: 'Adjustable' },
    { id: 'FIXED_OR_ADJUSTABLE', label: "Don't know" },
  ]

  const bankruptcyOptions: RadioOption[] = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  const employmentOptions: RadioOption[] = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  const lateMortgagePaymentsOptions: RadioOption[] = [
    { id: 'NONE', label: 'None' },
    { id: 'ONE', label: 'One' },
    { id: 'TWO_OR_MORE', label: 'Two or More' },
  ]

  const veteranStatusOptions: RadioOption[] = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 pt-12 md:pt-24 pb-8 md:pb-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <ProgressBar 
          currentStep={currentStep}
          totalSteps={20}
          icon={<DollarSign size={20} className="text-[#3498DB]" />}
          formType="refinance"
        />

        {/* Form Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-10">
          {/* Step 1: Zip Code */}
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your current zip code?
              </h2>

              <ZipCodeInput
                id="zipCode"
                label="Enter Zip Code"
                value={formData.zipCode}
                onChange={(value) => handleInputChange('zipCode', value)}
                onBlur={() => validateField('zipCode', formData.zipCode)}
                error={errors.zipCode}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 2: Property Type */}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What type of property are you refinancing?
              </h2>

              <RadioButtonGroup
                label="Select Property Type"
                options={propertyTypes}
                value={formData.propertyType}
                onChange={(value) => handleInputChange('propertyType', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 3: Property Purpose */}
          {currentStep === 3 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is the purpose of this property?
              </h2>

              <RadioButtonGroup
                label="Select Property Purpose"
                options={propertyPurposeOptions}
                value={formData.propertyPurpose}
                onChange={(value) => handleInputChange('propertyPurpose', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 4: Credit Grade */}
          {currentStep === 4 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your estimated credit score?
              </h2>

              <RadioButtonGroup
                label="Select Credit Grade"
                options={creditGrades}
                value={formData.creditGrade}
                onChange={(value) => handleInputChange('creditGrade', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 5: Estimated Home Value */}
          {currentStep === 5 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your estimated home value?
              </h2>

              <RangeSlider
                id="estimatedHomeValue"
                label="Select Home Value"
                value={formData.estimatedHomeValue}
                onChange={(value) => handleInputChange('estimatedHomeValue', value)}
                min={50000}
                max={2000000}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 6: Mortgage Balance */}
          {currentStep === 6 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your current mortgage balance?
              </h2>

              <RangeSlider
                id="mortgageBalance"
                label="Select Mortgage Balance"
                value={formData.mortgageBalance || getDefaultMortgageBalance()}
                onChange={(value) => {
                  // Ensure value doesn't exceed 100% of home value (cannot force LTVs below 100%)
                  const maxBalance = formData.estimatedHomeValue
                  const adjustedValue = Math.min(value, maxBalance)
                  
                  // Apply range averaging logic for submission
                  // Store the actual selected value, will convert to average on submission
                  setFormData(prev => ({
                    ...prev,
                    mortgageBalance: adjustedValue
                  }))
                }}
                min={getMortgageBalanceMin()}
                max={getMortgageBalanceMax()}
                step={5000}
                formatValue={formatMortgageBalance}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 7: First Mortgage Interest Rate */}
          {currentStep === 7 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your current first mortgage interest rate?
              </h2>

              <RangeSlider
                id="firstMortgageInterest"
                label="Select Interest Rate"
                value={formData.firstMortgageInterest}
                onChange={(value) => handleInputChange('firstMortgageInterest', value)}
                min={3}
                max={24}
                step={0.25}
                formatValue={formatInterestRate}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 8: Second Mortgage */}
          {currentStep === 8 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                Do you have a 2nd Mortgage?
              </h2>

              <RadioButtonGroup
                label="Select an Option"
                options={secondMortgageOptions}
                value={formData.secondMortgage}
                onChange={(value) => {
                  handleInputChange('secondMortgage', value, false)
                  // If "No" is selected, skip to step 11 (additionalCash)
                  // If "Yes" is selected, go to step 9 (secondMortgageBalance)
                  setTimeout(() => {
                    setCurrentStep(value === 'no' ? 11 : 9)
                  }, 150)
                }}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 9: Second Mortgage Balance */}
          {currentStep === 9 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your current second mortgage balance?
              </h2>

              <RangeSlider
                id="secondMortgageBalance"
                label="Select Second Mortgage Balance"
                value={formData.secondMortgageBalance}
                onChange={(value) => handleInputChange('secondMortgageBalance', value)}
                min={0}
                max={3000000}
                step={5000}
                formatValue={formatSecondMortgageBalance}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 10: Second Mortgage Interest Rate */}
          {currentStep === 10 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What is your current second mortgage interest rate?
              </h2>

              <RangeSlider
                id="secondMortgageInterest"
                label="Select Interest Rate"
                value={formData.secondMortgageInterest}
                onChange={(value) => handleInputChange('secondMortgageInterest', value)}
                min={0}
                max={24}
                step={0.25}
                formatValue={formatSecondInterestRate}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 11: Additional Cash */}
          {currentStep === 11 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                How much additional cash do you wish to borrow?
              </h2>

              <RangeSlider
                id="additionalCash"
                label="Select Additional Cash Amount"
                value={formData.additionalCash > 0 ? formData.additionalCash : getDefaultAdditionalCash()}
                onChange={(value) => handleInputChange('additionalCash', value)}
                min={0}
                max={2000000}
                step={5000}
                formatValue={formatAdditionalCash}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 12: Loan Type */}
          {currentStep === 12 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What type of interest rate do you prefer?
              </h2>

              <RadioButtonGroup
                label="Select Loan Type"
                options={loanTypeOptions}
                value={formData.loanType}
                onChange={(value) => handleInputChange('loanType', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 13: Bankruptcy or Foreclosure */}
          {currentStep === 13 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                Have you been in bankruptcy or foreclosure in the past three years?
              </h2>

              <RadioButtonGroup
                label="Select an Option"
                options={bankruptcyOptions}
                value={formData.bankruptcyOrForeclosure}
                onChange={(value) => handleInputChange('bankruptcyOrForeclosure', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 14: Currently Employed */}
          {currentStep === 14 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                Are you currently employed?
              </h2>

              <RadioButtonGroup
                label="Select an Option"
                options={employmentOptions}
                value={formData.currentlyEmployed}
                onChange={(value) => handleInputChange('currentlyEmployed', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 15: Late Mortgage Payments */}
          {currentStep === 15 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                Any late mortgage payments in the past year?
              </h2>

              <RadioButtonGroup
                label="Select an Option"
                options={lateMortgagePaymentsOptions}
                value={formData.lateMortgagePayments}
                onChange={(value) => handleInputChange('lateMortgagePayments', value, true)}
                required
                columns={1}
                className="mb-8"
              />
            </>
          )}

          {/* Step 16: Veteran Status */}
          {currentStep === 16 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                You or spouse a servicemember or veteran?
              </h2>

              <RadioButtonGroup
                label="Select an Option"
                options={veteranStatusOptions}
                value={formData.veteranStatus}
                onChange={(value) => handleInputChange('veteranStatus', value, true)}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 17: Email */}
          {currentStep === 17 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What&apos;s your email address?
              </h2>

              <TextInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                onBlur={() => validateField('email', formData.email)}
                error={errors.email}
                placeholder="example@email.com"
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 18: First Name and Last Name */}
          {currentStep === 18 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What&apos;s your name?
              </h2>

              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    id="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange('firstName', value)}
                    onBlur={() => validateField('firstName', formData.firstName)}
                    error={errors.firstName}
                    placeholder="John"
                    required
                  />
                  <TextInput
                    id="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange('lastName', value)}
                    onBlur={() => validateField('lastName', formData.lastName)}
                    error={errors.lastName}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 19: Address, City, State */}
          {currentStep === 19 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What&apos;s your address?
              </h2>

              <div className="mb-8 space-y-6">
                {/* Address */}
                <TextInput
                  id="address"
                  label="Street Address"
                  value={formData.address}
                  onChange={(value) => handleInputChange('address', value)}
                  onBlur={() => validateField('address', formData.address)}
                  error={errors.address}
                  placeholder="123 Main Street"
                  required
                />

                {/* City and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    id="city"
                    label="City"
                    value={formData.city}
                    onChange={(value) => handleInputChange('city', value)}
                    onBlur={() => validateField('city', formData.city)}
                    error={errors.city}
                    placeholder="New York"
                    required
                  />
                  <StateDropdown
                    id="addressState"
                    label="State"
                    placeholder="Choose a state..."
                    value={formData.addressState}
                    onChange={(stateId) => handleInputChange('addressState', stateId)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 20: Phone Number and Submit */}
          {currentStep === 20 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-sans">
                What&apos;s your phone number?
              </h2>

              <PhoneInput
                id="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(value) => handleInputChange('phoneNumber', value)}
                onBlur={() => validateField('phoneNumber', formData.phoneNumber)}
                error={errors.phoneNumber}
                required
                className="mb-8"
              />

              {/* Disclaimer */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Data Submission Notice</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  By submitting this form, you consent to the collection and processing of your personal information for mortgage application purposes. Your data will be used to connect you with qualified lenders and provide you with relevant mortgage options. We respect your privacy and will handle your information in accordance with our privacy policy.
                </p>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-4 rounded-xl font-bold text-base md:text-lg
                  border-2 border-gray-300 text-gray-700 hover:border-[#3498DB] hover:text-[#3498DB]
                  transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}
            {/* Only show Continue/Submit button for steps without radio buttons */}
            {(() => {
              // Steps with radio buttons that auto-advance: 2, 3, 4, 8, 12, 13, 14, 15, 16
              const radioButtonSteps = [2, 3, 4, 8, 12, 13, 14, 15, 16]
              const hasRadioButton = radioButtonSteps.includes(currentStep)
              
              // Show button for final step (submit) or steps without radio buttons
              if (currentStep === 20 || !hasRadioButton) {
                const isSubmitStep = currentStep === 20
                const isDisabled = !isStepValid() || (isSubmitStep && isSubmitting)
                return (
                  <button
                    onClick={handleNext}
                    disabled={isDisabled}
                    className={`
                      ${currentStep > 1 ? '' : 'flex-1'} py-4 rounded-xl font-bold text-base md:text-lg
                      transition-all duration-300 flex items-center justify-center gap-2
                      ${
                        !isDisabled
                          ? 'bg-[#3498DB] text-white hover:bg-[#246a99] shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                      ${currentStep > 1 ? 'flex-1' : 'w-full'}
                    `}
                  >
                    {isSubmitStep && isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      currentStep === 20 ? 'Submit Details' : 'Continue'
                    )}
                  </button>
                )
              }
              return null
            })()}
          </div>
        </div>

        {/* Redirect Button - Only show on step 1, outside the card */}
        {currentStep === 1 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleRedirectToBuyHome}
              className="w-full max-w-xl px-6 py-4 rounded-xl font-semibold text-sm md:text-base
                border-2 border-[#246a99] text-[#246a99] 
                hover:bg-[#246a99] hover:text-white
                transition-all duration-300 hover:shadow-lg hover:scale-105
                bg-white"
            >
              Need a Home Purchase Loan?
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RefinanceWrapper() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-[#246a99] text-xl font-semibold">Loading...</div>
      </div>
    }>
      <Refinance />
    </React.Suspense>
  )
}
