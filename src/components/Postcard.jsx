import appwriteService from '../appwrite/config.js'
import {Link} from 'react-router-dom'

export default function Postcard({
    $id ,
    title ,
    featuredImage
}){
    return(
        <Link to={`/post/${$id}`} className='block h-full'>
            <div className='w-full h-full rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100'>
                <div className='w-full overflow-hidden'>
                    <img src={ appwriteService.getFilePreview(featuredImage) } 
                    alt={title}
                    className='w-full h-48 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300'/>
                </div>
                <div className='p-5'>
                    <h2 className='text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2'>
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}