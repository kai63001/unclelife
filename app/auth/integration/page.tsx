"use client"
import {useEffect} from "react";

const NotionIntegrationPage = () => {

    useEffect(() => {
        if(!window) return
        window.open("about:blank", "_self");
        window.close();
    }, []);


    return (
        <div>
        </div>
    )
}

export default NotionIntegrationPage
