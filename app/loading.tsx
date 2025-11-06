import BaseLayout from "@/components/layouts/base/Index";
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
} from "@/components/ds/skeleton/Index";

export default function Loading() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-end gap-6 mb-2">
          <Skeleton height="2.5rem" width="12rem" />
          <Skeleton height="2.5rem" width="10rem" rounded="none" />
        </div>

        <div className="flex justify-between items-end gap-6 mb-8">
          <SkeletonCard />
          <Skeleton height="5rem" width="24rem" rounded="lg" />
        </div>

        <SkeletonTable rows={5} />
      </div>
    </BaseLayout>
  );
}
