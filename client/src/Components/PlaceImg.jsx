import React from 'react'

export default function PlaceImg({ place, index = 0, className }) {
    if (!place.photos?.length) return '';

    if (!className) {
        className = 'object-cover'
    }
    return (
        <div>
            <img src={`http://localhost:3000/uploads/${photos[index]}`} className={className} />
        </div>
    )
}
