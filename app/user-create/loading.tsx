import BaseLayout from "@/components/layouts/base/Index";
import {
  SkeletonForm,
  SkeletonInput,
  SkeletonButton,
  Skeleton,
} from "@/components/ds/skeleton/Index";

export default function Loading() {
  return (
    <BaseLayout width="900px" headerContent={<SkeletonButton />}>
      <div className="bg-gray-950 rounded-lg p-8">
        {/* Title Skeleton */}
        <Skeleton height="2.5rem" width="14rem" className="mb-8" />

        {/* Form Skeleton */}
        <div className="space-y-6">
          {/* Tipo de usuário */}
          <SkeletonInput />

          {/* Nome e Telefone */}
          <div className="grid grid-cols-2 gap-6">
            <SkeletonInput />
            <SkeletonInput />
          </div>

          {/* Email */}
          <SkeletonInput />

          {/* Tabs Skeleton */}
          <div className="space-y-4">
            <div className="flex gap-4 border-b border-gray-800 pb-2">
              <Skeleton height="2.5rem" width="10rem" rounded="lg" />
              <Skeleton height="2.5rem" width="10rem" rounded="lg" />
            </div>

            {/* Tab content - usa SkeletonForm */}
            <SkeletonForm fields={6} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
