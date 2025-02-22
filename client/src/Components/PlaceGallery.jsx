import React from 'react'

function PlaceGallery({ place }) {
    return (
        <div className="grid gap-x-2 grid-cols-[2fr_1fr_1fr] ">
            <div className="">
                {place.photos?.[0] && (
                    <div className="">
                        <img src={`http://localhost:3000/uploads/${place.photos?.[0]}`}
                            alt={place.title}
                            className="object-cover aspect-square lg:aspect-auto w-full max-h-80 rounded-l-xl" />
                    </div>
                )}
            </div>
            <div className='grid gap-x-2 overflow-hidden'>
                {place.photos?.[1] && (
                    <img src={`http://localhost:3000/uploads/${place.photos?.[1]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full" />
                )}
                {place.photos?.[2] && (
                    <img src={`http://localhost:3000/uploads/${place.photos?.[2]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full relative top-2" />
                )}
            </div>
            <div className='grid gap-x-2 overflow-hidden'>
                {place.photos?.[3] && (
                    <img src={`http://localhost:3000/uploads/${place.photos?.[3]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full rounded-tr-xl" />
                )}
                {place.photos?.[4] && (
                    <img src={`http://localhost:3000/uploads/${place.photos?.[4]}`} alt={place.title} className="object-cover aspect-square lg:aspect-auto max-h-40 w-full rounded-br-2xl relative top-2" />
                )}
            </div>
        </div>

    )
}

export default PlaceGallery