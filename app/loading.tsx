import BaseLayout from "@/components/layouts/base/Index";
import {
  SkeletonTable,
  SkeletonCard,
  SkeletonButton,
  Skeleton,
} from "@/components/ds/skeleton/Index";

export default function Loading() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-end gap-6 mb-2">
          <Skeleton height="3rem" width="12rem" />
          <SkeletonButton />
        </div>

        {/* Card + Filter Skeleton */}
        <div className="flex justify-between items-end gap-6 mb-8">
          <SkeletonCard className="min-w-[220px]" />
          <div className="flex-1">
            <Skeleton height="4rem" rounded="lg" />
          </div>
        </div>

        {/* Table Skeleton */}
        <SkeletonTable rows={12} />
      </div>
    </BaseLayout>
  );
}
