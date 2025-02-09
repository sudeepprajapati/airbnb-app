import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';

function HeroPage() {
  const { ready } = useContext(UserContext);
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data, ...response.data,
      ...response.data, ...response.data,
        // ...response.data, ...response.data,
        // ...response.data, ...response.data
      ])
    })
  }, [])


  if (!ready) {
    return 'Loading...';
  }

  return (
    <div className='mt-7 grid gap-x-6 gap-y-8  grid-cols-2  md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 ? (places.map(place => (
        <div className="" >
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img
                src={`http://localhost:3000/uploads/${place.photos?.[0]}`}
                alt="No Image found"
                className=' rounded-2xl object-cover aspect-square'
              />
            )}
          </div>
          <h2 className='font-semibold '>{place.address}</h2>
          <h3 className='text-sm text-gray-600 '>{place.title}</h3>
          <div className='mt-1 font-semibold '>
            <span className="font-bold"> ₹{place.price} night</span>
          </div>
        </div>
      ))
      ) : (
        <div>no places found</div>
      )
      }
    </div >
  )
}

export default HeroPage