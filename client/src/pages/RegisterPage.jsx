import { useState } from "react"
import { Link } from "react-router-dom"

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto '>
                    <input type="text" placeholder='John Doe'
                        value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder='your@email.com'
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password'
                        value={password} onChange={e => setPassowrd(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-700'>Already have an account?  <Link className='underline text-black' to={'/login'}>  Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage