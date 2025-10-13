import React from 'react'
import Image from 'next/image'

const Partners = () => {

    const partner = [
        {
            name: 'Amerisave',
            image: '/amerisave-logo.svg'
        },
        {
            name: 'Loan Depot',
            image: '/loandepot-logo.svg'
        },
        {
            name: 'Veterans First Mortgage',
            image: '/veterans-logo.svg'
        },
        {
            name: 'Mutual of Omaha',
            image: '/mutual-logo.svg'
        },
    ]

  return (
    <div className="w-full py-10 md:py-12 lg:py-14 xl:py-16 px-8 min-h-content flex flex-col relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-base text-center cursor-default">We Partner With Top Providers</h2>
        </div>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
            {partner.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center justify-center">
                    <Image src={partner.image} alt={partner.name} width={100} height={100} className='w-40 h-40 object-contain' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Partners