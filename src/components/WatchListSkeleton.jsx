export function WatchListSkeleton({ view = "table", count = 5 }) {
    if (view === "grid") {
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl bg-secondary p-4 relative animate-pulse"
                    >
                        <button className="absolute top-2 right-2 text-secondary">
                            x
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            <div>
                                <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                        <div className="mt-3 h-10 bg-primary rounded-md" />
                    </div>
                ))}
            </div>
        );
    }

    // Table skeleton
    return (
        <table className="w-full border-separate border-spacing-y-2">
            <thead>
                <tr className="text-slate-400 text-sm">
                    <th className="text-left">Coin Name</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">24h Change</th>
                    <th className="text-right"></th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: count }).map((_, i) => (
                    <tr
                        key={i}
                        className="bg-secondary rounded-xl animate-pulse"
                    >
                        <td className="p-3 flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded mr-2" />
                            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
                        </td>
                        <td className="p-3 text-right">
                            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
                        </td>
                        <td className="p-3 text-right">
                            <div className="h-5 w-12 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
                        </td>
                        <td className="p-3 text-right">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}