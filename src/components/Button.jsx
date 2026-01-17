export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}){
    return(
        <button className={`px-4 rounded-lg py-2 font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 ${className} ${bgColor} ${textColor}`}
        {...props} >
            {children}
        </button>
    )
}