import {useState, useEffect} from 'react'
import {Container , Postcard} from '../components/index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import {Query} from 'appwrite'

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
        appwriteService.getPosts([
            Query.equal('status', 'active'),
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

    // Get the last/most recent post
    const lastPost = posts && posts.length > 0 ? posts[0] : null;
    
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

    // If no user logged in
    if (!userData) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Login to read posts
                        </h1>
                        <p className="text-gray-600">
                            Please login to view and create blog posts.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    // Get user's first name or display name
    const userName = userData.name ? userData.name.split(' ')[0] : userData.email?.split('@')[0] || 'there';

    return (
        <div className='w-full py-12'>
            <Container>
                {/* Personalized Greeting Section */}
                <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100'>
                    <div className='flex flex-col md:flex-row items-center gap-6'>
                        {/* Pookie Image */}
                        <div className='shrink-0'>
                            <img 
                                src="/pookie.jpg" 
                                alt="Welcome" 
                                className='w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-indigo-100 shadow-md'
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        
                        {/* Greeting Message */}
                        <div className='flex-1 text-center md:text-left'>
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                                Welcome back, {userName}!
                            </h1>
                            <p className='text-base md:text-lg text-gray-600 leading-relaxed'>
                                {lastPost ? (
                                    <>
                                        Thanks for using our blogging platform. We noticed your recent post <span className='font-semibold text-indigo-600'>"{lastPost.title}"</span>. Keep sharing your thoughts!
                                    </>
                                ) : (
                                    <>
                                        Welcome to your blogging space. Start creating your first post to share your ideas and stories with the world.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Latest Posts Section - Show only 2 */}
                {posts && posts.length > 0 ? (
                    <>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Latest Posts</h2>
                            <p className='text-gray-600'>Your most recent blog posts</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
                            {posts.slice(0, 2).map((post) => (
                                <div key={post.$id} className='transform transition-all duration-300 hover:-translate-y-1'>
                                    <Postcard {...post} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto text-center'>
                        <h2 className='text-2xl font-bold text-gray-800 mb-4'>No posts yet</h2>
                        <p className='text-gray-600 mb-6'>Start sharing your thoughts with the world!</p>
                        <p className='text-sm text-gray-500'>Click "Add Post" in the navigation to create your first blog post 🚀</p>
                    </div>
                )}
            </Container>
        </div>
    )
}
