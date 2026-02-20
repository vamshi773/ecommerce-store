export default function ProductSkeleton() {
    return (
      <div className="border rounded-xl p-4 shadow animate-pulse">
        <div className="h-40 w-full bg-gray-200 rounded-lg" />
        <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
        <div className="h-10 bg-gray-200 rounded mt-4 w-full" />
      </div>
    );
  }