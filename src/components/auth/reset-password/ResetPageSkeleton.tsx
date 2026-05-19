import AuthLayout from "../../layouts/AuthLayout";

export default function ResetPageSkeleton() {
    return (
        <AuthLayout titleVariant="skeleton" logoVariant="skeleton">
            <div className="flex flex-col gap-6 animate-pulse">

                <div className="h-28 w-full rounded bg-gray-200" />

                <div className="py-3 h-12 w-full rounded-lg bg-gray-200" />
            </div>
        </AuthLayout>
    )
}