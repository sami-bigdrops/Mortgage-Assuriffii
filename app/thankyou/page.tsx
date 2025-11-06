'use client'

import React from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-4 md:py-8 px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Main Thank You Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-[#246a99] to-[#3498DB] px-6 md:px-10 py-8 md:py-10 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <CheckCircle2 size={56} className="text-green-600" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-sans">
              Thank You!
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-0 font-medium">
              Your mortgage application has been submitted successfully.
            </p>
          </div>

          {/* Contact Message Section */}
          <div className="p-6 md:p-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 md:p-7 border-l-4 border-[#3498DB]">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl md:text-2xl font-bold text-[#246a99] mb-3 font-sans">
                  We will reach you shortly
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Our team of mortgage experts will contact you within 24 hours to discuss your options 
                  and answer any questions you may have. We&apos;re here to help make your homeownership dreams come true.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Verticals Section */}
        <div className="mb-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#246a99] mb-2 font-sans">
              Explore Other Assurifii Services
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more ways we can help you protect and finance what matters most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Assurifii Auto Card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              {/* Logo Header */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-500 px-5 md:px-6 py-5 md:py-6">
                <div className="flex justify-center items-center">
                  <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg">
                    <Image 
                      src="/auto-assurifii.svg" 
                      alt="Assurifii Auto" 
                      width={180} 
                      height={80}
                      className="h-10 md:h-12 w-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Auto Content */}
              <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#246a99] mb-3 font-sans text-center">
                  Assurifii Auto
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed text-center">
                  Get the best auto financing options tailored to your needs. 
                  Compare rates from top lenders and drive away with your dream car today!
                </p>

                {/* Fact/Stat */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                  <p className="text-xs md:text-sm font-bold text-blue-900 mb-1 text-center">
                    💡 Did You Know?
                  </p>
                  <p className="text-sm md:text-base text-blue-800 text-center font-semibold">
                    Our customers save an average of $150/month on auto insurance
                  </p>
                </div>

                <Link
                  href="https://auto.assurifii.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-[#3498DB] to-[#246a99] text-white rounded-lg font-bold text-sm md:text-base
                    hover:from-[#246a99] hover:to-[#1a4d6b] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group-hover:shadow-2xl"
                >
                  Explore Auto Insurance
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Assurifii Home Card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              {/* Logo Header */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-500 px-5 md:px-6 py-5 md:py-6">
                <div className="flex justify-center items-center">
                  <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg">
                    <Image 
                      src="/auto-assurifii.svg" 
                      alt="Assurifii Home" 
                      width={180} 
                      height={80}
                      className="h-10 md:h-12 w-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Home Content */}
              <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#246a99] mb-3 font-sans text-center">
                  Assurifii Home
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed text-center">
                  Protect your biggest investment with comprehensive home insurance. 
                  Get instant quotes and save on your home protection coverage.
                </p>

                {/* Fact/Stat */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                  <p className="text-xs md:text-sm font-bold text-blue-900 mb-1 text-center">
                    💡 Did You Know?
                  </p>
                  <p className="text-sm md:text-base text-blue-800 text-center font-semibold">
                    Over 50,000 homes protected with our comprehensive coverage
                  </p>
                </div>

                <Link
                  href="https://home.assurifii.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-[#3498DB] to-[#246a99] text-white rounded-lg font-bold text-sm md:text-base
                    hover:from-[#246a99] hover:to-[#1a4d6b] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group-hover:shadow-2xl"
                >
                  Explore Home Insurance
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border-t-4 border-[#3498DB]">
          <h3 className="text-lg md:text-xl font-bold text-[#246a99] mb-2 font-sans">
            Need Help?
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-3">
            Have questions or need assistance? Our support team is here to help.
          </p>
          <a 
            href="mailto:support@assurifii.com" 
            className="inline-block text-base md:text-lg text-[#3498DB] hover:text-[#246a99] font-semibold hover:underline transition-colors duration-200"
          >
            support@assurifii.com
          </a>
        </div>
      </div>
    </div>
  )
}
