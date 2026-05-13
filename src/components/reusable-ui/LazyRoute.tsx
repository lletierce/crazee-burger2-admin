// import React from 'react'

import { Suspense } from "react";

type LazyRouteProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function LazyRoute({
    children,
    fallback = <div>Chargement...</div>,
}: LazyRouteProps) {

    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
}