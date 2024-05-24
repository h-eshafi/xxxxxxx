
export function Container({children, className}) {
    return (
        <div className={`px-5 md:px-16 mx-auto w-full max-w-7xl ${className}`}>
            {children}
        </div>
    )
}