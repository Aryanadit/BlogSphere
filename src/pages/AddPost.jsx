import {Container , PostForm } from '../components/index'

export default function AddPost(){
    return (
        <div className='py-12'>
            <Container>
                <div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-6'>Create New Post</h1>
                <PostForm/>
                </div>
            </Container>
        </div>
    )
}