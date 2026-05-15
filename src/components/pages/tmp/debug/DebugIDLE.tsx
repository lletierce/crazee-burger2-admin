import { useState } from "react";
import AuthLayout from "../../../layouts/AuthLayout";


export default function DebugIDLE() {

  return (
    <AuthLayout titleVariant="skeleton" logoVariant="skeleton">
      <div className="flex flex-col gap-4 animate-pulse">

        <div className="px-4 py-2 h-12 w-full rounded bg-gray-200" />
        <div className="h-24 w-full rounded bg-gray-200" />
        
      </div>
    </AuthLayout>
  )
}