'use client';

export default function ProjectGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col">
                    <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-md mb-4" />
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2" />
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
                        <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
