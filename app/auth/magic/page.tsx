"use client"
import {useEffect} from "react";
import {supabase} from "@/lib/supabase";

const MagicPage = () => {
    useEffect(() => {
        getDataUser()
    }, []);

    const getDataUser = async () => {
        const {data, error}: any = await supabase.auth.refreshSession()
        if (error) {
            console.log(error)
        }
        console.log(data)
        supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        })
    }

    return (
        <div>
            a
        </div>
    )
}

export default MagicPage
