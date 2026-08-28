

export const SkeletonCardAchievement = () => (
  <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md shadow-neutral-400/70 dark:shadow-black/40 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-56 w-full bg-gray-200 dark:bg-neutral-800" />
    <div className="p-6 flex flex-col gap-3">
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-neutral-800 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded-md" />
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-neutral-800 rounded-md" />
      <div className="flex gap-1.5 mt-2">
        <div className="h-6 w-16 bg-gray-200 dark:bg-neutral-800 rounded-md" />
        <div className="h-6 w-16 bg-gray-200 dark:bg-neutral-800 rounded-md" />
      </div>
    </div>
  </div>
)