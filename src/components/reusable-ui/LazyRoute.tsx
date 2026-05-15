// import React from 'react'

import { Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

type LazyRouteProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function LazyRoute({
    children,
    fallback = <LoadingPage />,
}: LazyRouteProps) {

    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
}