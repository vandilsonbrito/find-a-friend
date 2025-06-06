export const PaginationProgress = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) => {
  const progress = (currentPage / totalPages) * 100

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
      <div
        className="bg-brand-500 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="flex justify-between text-sm text-foreground/60 mt-2">
        <span>
          Página {currentPage} de {totalPages}
        </span>
      </div>
    </div>
  )
}
