import React from 'react'
import Image from 'next/image'
import HeroImage from '@/public/hero-img.png'

const Hero = () => {
  return (
    <>
      {/* Mobile Layout */}
      <section className="md:hidden w-full">
        {/* Hero Image Section */}
        <div className="relative w-full h-[200px]">
          <Image 
            src={HeroImage}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="w-full bg-white px-6 py-10">
          <h1 className="text-[#246a99] text-3xl font-bold leading-tight mb-6 font-serif">
            A Smart Way To Find the Best Savings For You
          </h1>
          
          <p className="text-gray-700 text-base leading-relaxed mb-8">
            Our tools compare hundreds of loan options to find the right fit for you.
          </p>
          
          <div className="flex flex-col gap-4">
            <button className="w-full bg-[#3498DB] text-white font-semibold py-4 rounded-xl">
              Take Cash Out
            </button>
            <button className="w-full bg-white text-[#3498DB] font-semibold py-4 rounded-xl border-2 border-[#3498DB]">
              Buy A Home
            </button>
          </div>
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="hidden md:block relative w-full min-h-[500px]">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={HeroImage}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="relative w-full h-full xl:max-w-[1440px] md:max-w-[600px] mx-auto px-8 py-20">
          <div className="max-w-[730px] bg-white rounded-3xl shadow-xl p-12">
            <h1 className="text-[#246a99] xl:text-5xl md:text-3xl font-bold leading-tight mb-4 cursor-default font-serif">
              A Smart Way To Find the Best Savings For You
            </h1>
            
            <p className="text-gray-700 text-lg mb-8 cursor-default">
              Our tools compare hundreds of loan options to find the right fit for you.
            </p>
            
            <div className="w-full flex justify-between flex-row gap-4">
              <button className="w-full bg-[#3498DB] text-white font-semibold px-8 py-3.5 rounded-lg cursor-pointer transition-colors hover:bg-[#246a99]">
                Take Cash Out
              </button>
              <button className="w-full bg-white text-[#3498DB] font-semibold px-8 py-3.5 rounded-lg border-2 border-[#3498DB] cursor-pointer transition-colors hover:bg-gray-50 hover:border-[#246A99] hover:text-[#246A99]">
                Buy A Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero