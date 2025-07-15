import Image from 'next/image'

export default function Logo() {
    return (
        <div className="w-15 h-15 sm:w-15 sm:h-15 relative">
            <Image
                src="https://res.cloudinary.com/dsugc0qfa/image/upload/v1752616148/Logo---IM-Programador-2_u36swo.png"
                alt="Ignacio Martinez Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    )
}
