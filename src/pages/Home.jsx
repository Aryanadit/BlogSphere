import {useState, useEffect} from 'react'
import {Container , Postcard} from '../components/index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

export default function Home(){
    const [posts , setPosts] = useState([])
    const [loading , setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)


    useEffect(() => {
        if (!userData) {
            setPosts([])
            setLoading(false)
            return
        }

        setLoading(true)
        appwriteService.getPosts()
            .then((response) => {
                if (response?.rows) {
                    setPosts(response.rows)
                } else {
                    setPosts([])
                }
            })
            .finally(() => setLoading(false))
    }, [userData])

    console.log("page-Home.jsx-useEffect posts : " , posts)
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading 
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {userData
                                ? "No posts yet. Create your first post!"
                                : "Login to read posts"}
                        </h1>
                        <p className="text-gray-600">
                            {userData
                                ? "Start sharing your thoughts with the world!"
                                : "Please login to view and create blog posts."}
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-12'>
            <Container>
                <div className='mb-8 text-center'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>Welcome to MegaBlog</h1>
                    <p className='text-gray-600'>Discover amazing stories and share your thoughts</p>
                </div>
                <div className='flex flex-wrap -mx-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
