import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingWidget() {
    const { id } = useParams()
    const [place, setPlace] = useState(null)
  
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    }, [id])

    if (!place) return '';

    return (
        <div className='flex flex-col gap-2 md:w-max h-fit p-4 mt-8 shadow-xl rounded-2xl shadow-slate-300'>
            <h3 className='font-semibold text-[22px]'>₹{place.price}
                <span className="text-lg font-medium">night</span>
            </h3>
            <div className='border rounded-xl text-sm'>
                <div className="flex">
                    <div className='my-2 p-2 rounded-xl mt-2'>
                        <p>CHECK-IN</p>
                        <input type="date" name="" id="" />
                    </div>
                    <div className='my-2 p-2 border-l  '>
                        <p>CHECKOUT</p>
                        <input type="date" name="" id="" />
                    </div>
                </div>
                <div className='mt-2 p-2 pb-1 border-t'>
                    <p>GUESTS</p>
                    <input type="number"
                        defaultValue={1}
                        className="mt-1 block w-40 rounded-md shadow-sm p-2" />
                </div>
            </div>
            <button className="primary !rounded-xl !bg-[#d81a40] mt-2">Reserve</button>
            {/* <hr className='my-1' /> */}
        </div>
    )
}
