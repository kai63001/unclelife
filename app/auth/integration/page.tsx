"use client";
import {useEffect} from "react";
import {useSearchParams} from "next/navigation";

const NotionIntegrationPage = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!window) return;
        const message = searchParams.get("message");
        if (!message) return;
        localStorage.setItem("notion_integration_message", message);
        window.open("about:blank", "_self");
        window.close();
    }, [searchParams]);

    return <div>
    </div>;
};

export default NotionIntegrationPage;
