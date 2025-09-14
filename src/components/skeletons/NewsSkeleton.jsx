export const NewsSkeleton = () => {
    return (
        <div className="mb-4 p-4 border border-gray-700 rounded-lg flex items-center gap-12 animate-pulse">
            <div className="w-40 h-24 bg-gray-300 dark:bg-gray-700 rounded" />
            <span className="flex-1 space-y-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="flex items-center justify-between mt-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20" />
                </div>
            </span>
        </div>
    ); 
}