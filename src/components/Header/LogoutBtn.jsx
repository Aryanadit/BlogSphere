import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'

export default function LogoutBtn(){
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
        .then( () => { dispatch(logout()) } )
        .catch( (error) => console.log("Logout Failed - LogoutBtn" , error))
    }
    return(
        <>
            <button
                onClick={logoutHandler}
                className="
                    inline-block
                    px-6 py-2
                    rounded-full
                    bg-red-500
                    text-white
                    font-medium
                    transition-all
                    duration-200
                    hover:bg-red-600
                    hover:shadow-md
                    hover:scale-105
                    active:scale-95
                "
            >
                Logout
            </button>
        </>
    )
}