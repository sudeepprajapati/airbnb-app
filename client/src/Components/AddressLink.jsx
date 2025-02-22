import { Link } from "react-router-dom"

function AddressLink({ children, className = null }) {
    if (!className) {
        className = 'mt-4 block'
    }
    className += 'font-semibold underline '

    return (
        <div className='text-lg'>
            Farm stay in <Link
                to={`https://maps.google.com/?q=${children}`}
                target="_blank"
                className={className}
            >
                 {children}
            </Link>
        </div>
    )
}

export default AddressLink