import { Card, CardContent, CardHeader } from '../../components/ui/card'

export default function PetSkeletonCardShimmer() {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader className="pb-4">
        <div className="aspect-square rounded-lg mb-3 overflow-hidden relative bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-6 w-24 mb-2 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
          <div className="h-6 w-20 rounded-full bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="h-8 flex-1 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-8 flex-1 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
