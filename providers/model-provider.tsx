'use client';
import { useEffect, useState } from "react";

import RenameModel from "@/app/(dashboard)/_components/rename-model";


const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <RenameModel />
        </>
    )
}

export default ModelProvider