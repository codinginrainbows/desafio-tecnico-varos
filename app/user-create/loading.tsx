import BaseLayout from "@/components/layouts/base/Index";
import {
  Skeleton,
  SkeletonButton,
  SkeletonForm,
} from "@/components/ds/skeleton/Index";

export default function Loading() {
  return (
    <BaseLayout
      width="900px"
      headerContent={
        <div className="flex gap-4">
          <SkeletonButton />
        </div>
      }
    >
      <div className="bg-gray-950 rounded-lg p-8">
        <SkeletonForm fields={6} />

        <div className="mt-6 space-y-4">
          <div className="flex gap-4">
            <Skeleton height="2.5rem" width="10rem" />
            <Skeleton height="2.5rem" width="10rem" />
          </div>
          <SkeletonForm fields={4} />
        </div>
      </div>
    </BaseLayout>
  );
}
