import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

function RegisterPage() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()  

    async function registerUser(e) {
        e.preventDefault()
        try {
            // Sending registration request to the backend
            await axios.post('/register', {
                name,
                username,
                email,
                password,
            })
            navigate('/') // Redirects to home page (or any other page like "/dashboard")
        } catch (error) {
            console.error("Registration error:", error)
            alert('Registration failed, please try again')
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto ' onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder='John Doe'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input
                        type="text"
                        placeholder='@john'
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <input
                        type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-700'>Already have an account?  <Link className='underline text-black' to={'/login'}>  Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage