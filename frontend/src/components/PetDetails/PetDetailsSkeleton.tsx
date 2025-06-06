export default function PetDetailSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="h-[34rem] bg-white rounded-2xl overflow-hidden border">
            <div className="h-96 relative overflow-hidden top-5 flex justify-center items-center">
              <div className="h-full w-3/4 bg-gray-200 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
  
            <div className="p-4 mt-8 flex gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              ))}
            </div>
          </div>
  
          <div className="bg-white rounded-2xl p-6 border">
            <div className="h-9 w-48 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
  
            <div className="flex flex-wrap gap-2 mb-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-6 w-20 bg-gray-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              ))}
            </div>
  
            <div className="h-7 w-24 bg-gray-200 rounded mb-3 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
  
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
  
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                  <div className="h-6 w-6 bg-gray-300 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                  <div className="h-5 w-12 bg-gray-200 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 border">
            <div className="h-7 w-24 bg-gray-200 rounded mb-6 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
  
            <div className="mb-6">
              <div className="h-6 w-40 bg-gray-200 rounded mb-2 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
            </div>
  
            <div className="h-12 w-full bg-gray-200 rounded-md mb-4 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
  
            <div className="flex justify-center">
              <div className="h-4 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  