import { useState } from 'react';
import { preInput } from '../Components/PlacesForm';
import axios from 'axios';

export default function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('')

    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data } = await axios.post('/add-by-link', { link: photoLink });
        onChange(prev => [...prev, data.filename]);
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
            onChange(prev => [...prev, ...filenames]);
        })

    }

    function removePhoto(filename) {
        onChange(addedPhotos.filter(photo => photo !== filename));
    }

    return (
        <>
            <label >
                {preInput('Photos of your place', 'Showcase your space with photos that highlight what makes it special.')}

                <div className="flex gap-2">
                    <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link ...jpg" />
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                </div>

                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 ">
                    {addedPhotos.length > 0 ? addedPhotos.map(link => (
                        <div key={link} className="h-32 flex relative" >
                            <img className="rounded-2xl w-full object-cover "
                                src={'http://localhost:3000/uploads/' + link} alt="img" />
                            <button onClick={() => removePhoto(link)} className="absolute bottom-0 right-0 bg-gray-800 bg-opacity-50 text-white p-1 rounded-tl-2xl rounded-br-2xl cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
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
        </>
    )
}