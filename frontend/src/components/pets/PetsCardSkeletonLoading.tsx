export default function PetsCardSkeletonLoading() {
    return (
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md">
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>
  
        <div className="p-4">
          <div className="h-6 w-24 mb-1 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
  
          <div className="h-4 w-32 mb-4 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
  
          <div className="w-full h-10 bg-gray-200 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    )
  }