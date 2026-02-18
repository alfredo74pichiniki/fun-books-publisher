export function BookCardSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gray-200 animate-pulse h-full">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
    );
}
