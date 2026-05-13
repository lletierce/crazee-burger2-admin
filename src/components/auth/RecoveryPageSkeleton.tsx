import AuthLayout from "../layouts/AuthLayout";

export default function RecoveryPageSkeleton() {
  return (
    <AuthLayout titleVariant="skeleton" logoVariant="skeleton">
                <div className="flex flex-col gap-6 animate-pulse">
                    
                    <div className="h-24 w-full rounded bg-gray-200" />
                    <div className="px-4 py-2 h-12 w-full rounded bg-gray-200" />

                    <div className="py-3 h-12 w-full rounded-lg bg-gray-200" />
                </div>
            </AuthLayout>
  )
}
