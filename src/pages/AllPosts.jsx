import appwriteService from '../appwrite/config'
import {Container , Postcard} from '../components/index'
import {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Query} from 'appwrite'

export default function AllPosts(){
    const [posts , setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (!userData) {
            setPosts([])
            setLoading(false)
            return
        }

        setLoading(true)
        appwriteService.getPosts([
            Query.equal('userId', userData.$id)
        ])
            .then((response) => {
                if (response?.rows) {
                    setPosts(response.rows)
                } else {
                    setPosts([])
                }
            })
            .finally(() => setLoading(false))
    }, [userData])

    if (loading) {
        return (
            <div className='w-full py-12'>
                <Container>
                    <div className='text-center py-16'>
                        <h1 className='text-2xl font-bold text-gray-700'>Loading posts...</h1>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-12'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>All Your Posts</h1>
                    <p className='text-gray-600'>Browse through all your published blog posts</p>
                </div>
                <div className='flex flex-wrap -mx-4'>
                    { posts === undefined || posts.length === 0 ? 
                    <div className='w-full text-center py-16'>
                        <h1 className='text-3xl font-bold text-gray-700 mb-2'>No posts yet</h1>
                        <p className='text-gray-500'>Create your first ever blog post to get started!</p>
                    </div>
                    : posts.map( (post) => (
                        <div key={post.$id} className='p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}