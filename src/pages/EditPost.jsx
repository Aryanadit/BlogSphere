import {useState , useEffect} from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import {Container , PostForm} from '../components/index'
import appwriteService from '../appwrite/config'

export default function EditPost(){
    const navigate = useNavigate()
    const [ post , setPosts] = useState(null)
    const { slug } = useParams()

    useEffect( () => {
        if( slug ){
            appwriteService.getPost(slug)
            .then( (post) => {
                if(post) setPosts(post)
            })
        }
        else navigate('/')
    } , [slug , navigate])
    return post ? (
        <div className='py-12'>
            <Container>
                <div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-6'>Edit Post</h1>
                    <PostForm post={post}/>
                </div>
            </Container>
        </div>
    ) : null 
}