import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import PhotosUploader from "../Components/PhotosUploader";
import axios from 'axios';

function inputHeader(text) {
    return (
        <h2 className="text-2xl font-bold">
            {text}
        </h2>
    )
}
function inputDescription(text) {
    return (
        <p className="text-gray-500">{text}</p>
    )
}
export function preInput(header, description) {
    return (
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    )
}


export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('12:00')
    const [checkOut, setCheckOut] = useState('12:00')
    const [maxGuests, setMaxGuests] = useState(1)
    const [addedPhotos, setAddedPhotos] = useState([])


    return (
        <>
            <div>
                {action !== 'new' && (
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Place
                    </Link>
                )}
                {action === 'new' && (
                    <div>
                        <form className="text-left flex flex-col gap-4">
                            <label >
                                {preInput('Name your place', 'Short titles work best. Have fun with it-you can always change it later.')}
                                {/* <h2 className="text-2xl font-bold">
                                    Name your place
                                </h2>
                                <p className="text-gray-500">
                                    Short titles work best. Have fun with it-you can always change it later.
                                </p> */}
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="My lovely apartement" name="" id="title" />
                            </label>
                            <label >
                                {preInput('Enter the address of your place', 'This is the address that guests will see before booking.')}
                                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />
                            </label>
                            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                            <label >
                                {preInput('Describe your place', 'Help guests get a sense of your place by describing it in detail.')}
                                <textarea
                                    rows={7}
                                    cols={55}
                                    placeholder="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </label>
                            <Perks selected={perks} onChange={setPerks} />
                            <label >
                                {preInput('Extra info', 'Add any other details that will help guests get a sense of your place.')}
                                <h2 className="text-2xl font-bold"> Extra info</h2>
                                <textarea
                                    rows={7}
                                    cols={55}
                                    placeholder='extra info'
                                    value={extraInfo}
                                    onChange={e => setExtraInfo(e.target.value)}
                                />
                            </label>
                            <label >
                                {preInput('Check in&out times.', 'Set the times when guests can check in and out, and remember some time window for cleaning the room between guests.')}
                                <div className="grid ml-10 gap-2 sm:grid-cols-3">
                                    <div className="">
                                        <h3 className="mt-2 -mb-1">Check In</h3>
                                        <input type="time" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2" />
                                    </div>
                                    <div>
                                        <h3 className="mt-2 -mb-1">Check Out</h3>
                                        <input type="time" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2" />
                                    </div>
                                    <div>
                                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                        <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2" />
                                    </div>
                                </div>
                                <button className="primary my-4">Save</button>
                            </label>
                        </form>
                    </div>
                )}
            </div>
        </>
    )

}