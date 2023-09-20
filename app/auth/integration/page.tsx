"use client";
import {useEffect} from "react";

const NotionIntegrationPage = () => {

    useEffect(() => {
        console.log('hello')
        //close the window in 5 seconds
        setTimeout(() => {
            window.open("about:blank", "_self");
            window.close();
        }, 3000);

    }, []);


    return (
        <div>
            <h1 className={'text-4xl font-bold'}>Notion Integration</h1>
        </div>
    )
}

export default NotionIntegrationPage
