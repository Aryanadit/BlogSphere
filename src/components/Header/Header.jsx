import { Container , Logo , LogoutBtn } from '../index.js'
import {Link , useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header(){

    const authStatus = useSelector( (state) => state.auth.status )

    const navigate = useNavigate()

    const navItems = [
        {
            name:'Home',
            slug:'/',
            active:true,
        },
        {
            name:'Login',
            slug:'/login',
            active:!authStatus,
        },
        {
            name:'Signup',
            slug:'/signup',
            active:!authStatus,
        },
        {
            name:'All Posts',
            slug:'/all-posts',
            active: authStatus,
        },
        {
            name:'Add Post',
            slug:'/add-post',
            active: authStatus,
        },
    ]

    return(
        <header className='py-4 shadow-lg bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50'>
            <Container>
                <nav className='flex items-center'>
                    <div className='mr-4'>
                        <Link to='/' className='transition-transform hover:scale-105'>
                            <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className = 'flex ml-auto items-center gap-2'>
                        {navItems.map( (item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                onClick={ () => navigate(item.slug) }
                                className='inline-block px-6 py-2 duration-200 hover:bg-indigo-100 hover:text-indigo-700 rounded-full font-medium text-gray-700 transition-all hover:shadow-md' >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                        )}
                        { authStatus && (
                            <li>
                                <LogoutBtn></LogoutBtn>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}