import {useState} from 'react'
import authService from '../appwrite/auth.js'
import { Link , useNavigate } from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Logo , Input , Button} from './index.js'


export default function Signup(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")
    const {register , handleSubmit} = useForm()

    const create = async (data) => {
    setError('')

    try {
        // Try creating account
        await authService.createAccount(data)
    } catch (error) {
        // If error is NOT 409, stop here
        if (error.code !== 409) {
            setError(error.message)
            return
        }
        console.log("error is 409 : User already Exists")
        // else: continue to login
    }

    try {
        // Login (works for both new & existing users)
        const { email, password } = data
        await authService.login({ email, password })

        // Fetch current user
        const userData = await authService.getCurrentUser()

        if (userData) {
            dispatch(login({ userData }))
        }

        navigate('/')
    } catch (error) {
        setError(error.message)
    }
}

return (
    <div className="flex items-center justify-center py-12">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-2xl 
                p-10 shadow-xl border border-gray-200`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-100px">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register('name' ,{
                            required : true
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}