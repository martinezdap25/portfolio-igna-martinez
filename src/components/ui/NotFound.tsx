import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4 space-y-8 text-gray-700">

            <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
            <p className="text-xl max-w-md mx-auto">
                No encontramos el proyecto que buscás. ¡Quizás flotó hasta arriba con los iconos!
            </p>

            <Link
                href="/"
                className="inline-block mt-4 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
