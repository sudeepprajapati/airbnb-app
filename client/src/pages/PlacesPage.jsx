import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import axios from 'axios';

export default function PlacesPage() {
    function pd(e) {
        e.preventDefault();
    }

    const { action } = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('12:00')
    const [checkOut, setCheckOut] = useState('12:00')
    const [maxGuests, setMaxGuests] = useState(1)

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
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }
    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data } = await axios.post('/add-by-link', { link: photoLink });
        setAddedPhotos(prev => [...prev, data.filename]);
        setPhotoLink('');
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => [...prev, ...filenames]);
        })

    }

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
                            <label >
                                {preInput('Photos of your place', 'Showcase your space with photos that highlight what makes it special.')}

                                <div className="flex gap-2">
                                    <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link ...jpg" />
                                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                                </div>

                                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 ">
                                    {addedPhotos.length > 0 ? addedPhotos.map(link => (
                                        <div className="h-32 flex" >
                                            <img className="rounded-2xl w-full object-cover "
                                                src={'http://localhost:3000/uploads/' + link} alt="img" />
                                        </div>
                                    )) : (<p className="h-32 flex items-center justify-center border bg-transparent rounded-2xl p-2 text-lg text-gray-500 cursor-pointer">No photos added yet</p>)}
                                    <label className="h-32 flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-700 cursor-pointer">
                                        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                        </svg>
                                        <p>Upload</p>
                                    </label>
                                </div>
                            </label>
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

