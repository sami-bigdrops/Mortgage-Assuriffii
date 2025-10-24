'use client'

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CustomDropdown from '@/components/ui/CustomDropdown'
import RangeSlider from '@/components/ui/RangeSlider'

const BuyHome = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    productType: 'PP_NEWHOME',
    state: '',
    zipCode: '',
    propertyType: '',
    creditGrade: '',
    foundHome: '',
    timelineToBuy: '',
    estimatedHomeValue: 250000,
    downPayment: 20, // Store percentage (default 20%)
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
    addressZip: '',
    phoneNumber: '',
  })

  const usStates = [
    { id: 'AL', label: 'Alabama' },
    { id: 'AK', label: 'Alaska' },
    { id: 'AZ', label: 'Arizona' },
    { id: 'AR', label: 'Arkansas' },
    { id: 'CA', label: 'California' },
    { id: 'CO', label: 'Colorado' },
    { id: 'CT', label: 'Connecticut' },
    { id: 'DE', label: 'Delaware' },
    { id: 'FL', label: 'Florida' },
    { id: 'GA', label: 'Georgia' },
    { id: 'HI', label: 'Hawaii' },
    { id: 'ID', label: 'Idaho' },
    { id: 'IL', label: 'Illinois' },
    { id: 'IN', label: 'Indiana' },
    { id: 'IA', label: 'Iowa' },
    { id: 'KS', label: 'Kansas' },
    { id: 'KY', label: 'Kentucky' },
    { id: 'LA', label: 'Louisiana' },
    { id: 'ME', label: 'Maine' },
    { id: 'MD', label: 'Maryland' },
    { id: 'MA', label: 'Massachusetts' },
    { id: 'MI', label: 'Michigan' },
    { id: 'MN', label: 'Minnesota' },
    { id: 'MS', label: 'Mississippi' },
    { id: 'MO', label: 'Missouri' },
    { id: 'MT', label: 'Montana' },
    { id: 'NE', label: 'Nebraska' },
    { id: 'NV', label: 'Nevada' },
    { id: 'NH', label: 'New Hampshire' },
    { id: 'NJ', label: 'New Jersey' },
    { id: 'NM', label: 'New Mexico' },
    { id: 'NY', label: 'New York' },
    { id: 'NC', label: 'North Carolina' },
    { id: 'ND', label: 'North Dakota' },
    { id: 'OH', label: 'Ohio' },
    { id: 'OK', label: 'Oklahoma' },
    { id: 'OR', label: 'Oregon' },
    { id: 'PA', label: 'Pennsylvania' },
    { id: 'RI', label: 'Rhode Island' },
    { id: 'SC', label: 'South Carolina' },
    { id: 'SD', label: 'South Dakota' },
    { id: 'TN', label: 'Tennessee' },
    { id: 'TX', label: 'Texas' },
    { id: 'UT', label: 'Utah' },
    { id: 'VT', label: 'Vermont' },
    { id: 'VA', label: 'Virginia' },
    { id: 'WA', label: 'Washington' },
    { id: 'WV', label: 'West Virginia' },
    { id: 'WI', label: 'Wisconsin' },
    { id: 'WY', label: 'Wyoming' }
  ]

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleZipCodeChange = (value: string) => {
    // Only allow digits and max 5 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 5)
    handleInputChange('zipCode', numericValue)
  }

  const handleAddressZipChange = (value: string) => {
    // Only allow digits and max 5 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 5)
    handleInputChange('addressZip', numericValue)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '')
    
    // Don't format if empty
    if (!phoneNumber) return ''
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return `(${phoneNumber}`
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    handleInputChange('phoneNumber', formatted)
  }

  const getPhoneNumberDigits = (formattedPhone: string) => {
    return formattedPhone.replace(/\D/g, '')
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleNext = async () => {
    if (isStepValid()) {
      if (currentStep === 17) {
        // Submit form
        try {
          const response = await fetch('/api/submit-buy-home', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })

          const result = await response.json()

          if (result.success) {
            // Redirect directly to refinance form
            router.push('/form/refinance')
          } else {
            alert('Form submission failed. Please try again.')
          }
        } catch (error) {
          console.error('Error submitting form:', error)
          alert('An error occurred. Please try again.')
        }
      } else {
        setCurrentStep(prev => prev + 1)
        console.log('Form data:', formData)
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.state !== ''
      case 2:
        return formData.zipCode.length === 5
      case 3:
        return formData.propertyType !== ''
      case 4:
        return formData.creditGrade !== ''
      case 5:
        return formData.foundHome !== ''
      case 6:
        return formData.timelineToBuy !== ''
      case 7:
        return formData.estimatedHomeValue > 0
      case 8:
        return formData.downPayment > 0
      case 9:
        return formData.loanType !== ''
      case 10:
        return formData.bankruptcyOrForeclosure !== ''
      case 11:
        return formData.currentlyEmployed !== ''
      case 12:
        return formData.lateMortgagePayments !== ''
      case 13:
        return formData.veteranStatus !== ''
      case 14:
        return isValidEmail(formData.email)
      case 15:
        return formData.firstName.trim() !== '' && formData.lastName.trim() !== ''
      case 16:
        return formData.address.trim() !== '' && formData.city.trim() !== '' && formData.addressState !== '' && formData.addressZip.length === 5
      case 17:
        return getPhoneNumberDigits(formData.phoneNumber).length === 10
      default:
        return false
    }
  }

  // Calculate down payment dollar amount for display
  const getDownPaymentAmount = () => {
    return Math.round((formData.downPayment / 100) * formData.estimatedHomeValue)
  }

  const propertyTypes = [
    { id: 'single-family', label: 'Single Family' },
    { id: 'multi-family', label: 'Multi Family' },
    { id: 'condo', label: 'Condo' },
    { id: 'townhome', label: 'Townhome' },
    { id: 'mobilehome', label: 'Mobilehome' },
  ]

  const creditGrades = [
    { id: 'excellent', label: 'Excellent (680+)' },
    { id: 'good', label: 'Good (640-679)' },
    { id: 'average', label: 'Average (600-639)' },
    { id: 'fair', label: 'Fair (560-599)' },
  ]

  const homeFoundOptions = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  const timelineToBuyOptions = [
    { id: 'IMMEDIATELY', label: 'Immediately' },
    { id: '30_DAYS', label: '1 to 2 Months' },
    { id: '60_DAYS', label: '2 to 3 Months' },
    { id: '90_DAYS', label: '3 Months or Longer' },
    { id: 'NO_TIME_CONSTRAINT', label: 'Not Sure' },
  ]

  const loanTypeOptions = [
    { id: 'FIXED', label: 'Fixed' },
    { id: 'ADJUSTABLE', label: 'Adjustable' },
    { id: 'FIXED_OR_ADJUSTABLE', label: "Don't know" },
  ]

  const bankruptcyOptions = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  const employmentOptions = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  const lateMortgagePaymentsOptions = [
    { id: 'NONE', label: 'None' },
    { id: 'ONE', label: 'One' },
    { id: 'TWO_OR_MORE', label: 'Two' },
    { id: 'TWO_OR_MORE', label: 'More' },
  ]

  const veteranStatusOptions = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 pt-12 md:pt-24 pb-8 md:pb-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm md:text-base font-semibold text-[#246a99]">
              Step {currentStep} of 17
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#3498DB] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 17) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-10">
          {/* Step 1: State */}
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What state is the property located in?
              </h2>

                  <CustomDropdown
                    id="state"
                    label="Select State"
                    placeholder="Choose a state..."
                    value={formData.state ? usStates.find(state => state.id === formData.state)?.label || '' : ''}
                    options={usStates.map(state => state.label)}
                    onChange={(value) => {
                      const selectedState = usStates.find(state => state.label === value)
                      handleInputChange('state', selectedState ? selectedState.id : value)
                    }}
                    required
                    searchable
                    className="mb-8"
                  />
            </>
          )}

          {/* Step 2: Zip Code */}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What is the property&apos;s zip code?
              </h2>

              <div className="mb-8">
                <label htmlFor="zipCode" className="block text-base font-semibold text-gray-700 mb-3">
                  Enter Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleZipCodeChange(e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                  className="w-full px-4 py-4 text-base border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent transition-all duration-200 font-medium"   
                />
              </div>
            </>
          )}

          {/* Step 3: Property Type */}
          {currentStep === 3 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What type of property are you buying?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select Property Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleInputChange('propertyType', type.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.propertyType === type.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 4: Credit Grade */}
          {currentStep === 4 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What is your estimated credit score?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select Credit Grade <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {creditGrades.map((grade) => (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => handleInputChange('creditGrade', grade.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.creditGrade === grade.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {grade.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 5: Have you found a home */}
          {currentStep === 5 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                Have you found a home?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select an Option <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {homeFoundOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInputChange('foundHome', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.foundHome === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 6: Timeline to Buy */}
          {currentStep === 6 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                When are you likely to buy a home?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select Timeline <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {timelineToBuyOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInputChange('timelineToBuy', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.timelineToBuy === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 7: Estimated Home Value */}
          {currentStep === 7 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What is the estimated home value?
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

          {/* Step 8: Down Payment */}
          {currentStep === 8 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                How much are you planning to put down?
              </h2>

              <div className="mb-4 text-center">
                <p className="text-base text-gray-600">
                  Amount: <span className="font-bold text-[#246a99] text-xl">
                    ${getDownPaymentAmount().toLocaleString()}
                  </span>
                </p>
              </div>

              <RangeSlider
                id="downPayment"
                label="Select Down Payment Percentage"
                value={formData.downPayment}
                onChange={(value) => handleInputChange('downPayment', value)}
                min={5}
                max={90}
                step={5}
                formatValue={(val) => `${val}%`}
                required
                className="mb-8"
              />
            </>
          )}

          {/* Step 9: Loan Type */}
          {currentStep === 9 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What type of interest rate do you prefer?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select Loan Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {loanTypeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInputChange('loanType', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.loanType === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 10: Bankruptcy or Foreclosure */}
          {currentStep === 10 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                Have you been in bankruptcy or foreclosure in the past three years?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select an Option <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {bankruptcyOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInputChange('bankruptcyOrForeclosure', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.bankruptcyOrForeclosure === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 11: Currently Employed */}
          {currentStep === 11 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                Are you currently employed?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select an Option <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {employmentOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInputChange('currentlyEmployed', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.currentlyEmployed === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 12: Late Mortgage Payments */}
          {currentStep === 12 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                Any late mortgage payments in the past year?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select an Option <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {lateMortgagePaymentsOptions.map((option, index) => (
                    <button
                      key={`${option.id}-${index}`}
                      type="button"
                      onClick={() => handleInputChange('lateMortgagePayments', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-center
                        ${
                          formData.lateMortgagePayments === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 13: Veteran Status */}
          {currentStep === 13 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                You or spouse a servicemember or veteran?
              </h2>

              <div className="mb-8">
                <label className="block text-base font-semibold text-gray-700 mb-4">
                  Select an Option <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {veteranStatusOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleInputChange('veteranStatus', option.id)}
                      className={`
                        w-full px-6 py-4 rounded-xl font-semibold text-base
                        border-2 transition-all duration-200 text-left
                        ${
                          formData.veteranStatus === option.id
                            ? 'bg-blue-50 border-[#3498DB] text-[#246a99] ring-2 ring-blue-100'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#3498DB] hover:bg-blue-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 14: Email */}
          {currentStep === 14 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What&apos;s your email address?
              </h2>

              <div className="mb-8">
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                    transition-all duration-200 font-medium"
                />
              </div>
            </>
          )}

          {/* Step 15: First Name and Last Name */}
          {currentStep === 15 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What&apos;s your name?
              </h2>

              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-base font-semibold text-gray-700 mb-3">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                        transition-all duration-200 font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-base font-semibold text-gray-700 mb-3">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                        transition-all duration-200 font-medium"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 16: Address, City, State, Zip */}
          {currentStep === 16 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What&apos;s your address?
              </h2>

              <div className="mb-8 space-y-6">
                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-base font-semibold text-gray-700 mb-3">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                      transition-all duration-200 font-medium"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-base font-semibold text-gray-700 mb-3">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                      className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                        transition-all duration-200 font-medium"
                    />
                  </div>
                  <div>
                    <CustomDropdown
                      id="addressState"
                      label="State"
                      placeholder="Choose a state..."
                      value={formData.addressState ? usStates.find(state => state.id === formData.addressState)?.label || '' : ''}
                      options={usStates.map(state => state.label)}
                      onChange={(value) => {
                        const selectedState = usStates.find(state => state.label === value)
                        handleInputChange('addressState', selectedState ? selectedState.id : value)
                      }}
                      required
                      searchable
                    />
                  </div>
                </div>

                {/* Zip Code */}
                <div>
                  <label htmlFor="addressZip" className="block text-base font-semibold text-gray-700 mb-3">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="addressZip"
                    value={formData.addressZip}
                    onChange={(e) => handleAddressZipChange(e.target.value)}
                    placeholder="12345"
                    maxLength={5}
                    className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                      transition-all duration-200 font-medium"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 17: Phone Number and Submit */}
          {currentStep === 17 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-8 md:mb-10 font-serif">
                What&apos;s your phone number?
              </h2>

              <div className="mb-8">
                <label htmlFor="phoneNumber" className="block text-base font-semibold text-gray-700 mb-3">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  placeholder="(123) 456-7890"
                  maxLength={14}
                  className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent
                    transition-all duration-200 font-medium"
                />
              </div>

              {/* Disclaimer */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Data Submission Notice</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  By submitting this form, you consent to the collection and processing of your personal information 
                  for mortgage application purposes. Your data will be used to connect you with qualified lenders 
                  and provide you with relevant mortgage options. We respect your privacy and will handle your 
                  information in accordance with our privacy policy.
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
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`
                    flex-1 py-4 rounded-xl font-bold text-base md:text-lg
                    transition-all duration-300
                    ${
                      isStepValid()
                        ? 'bg-[#3498DB] text-white hover:bg-[#246a99] shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {currentStep === 17 ? 'Submit Details' : 'Continue'}
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyHome