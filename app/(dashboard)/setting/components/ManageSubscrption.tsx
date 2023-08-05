"use client"
import {Button} from "@/components/ui/button";
import axios from "axios";

const ManageSubscrptionComponent = () => {
    const portal = async () => {
        try {
            const {data} = await axios.get('/api/stripe/portal')
            if (data?.data?.url) {
                window.open(
                    data.data.url,
                    '_blank'
                );
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
            <Button onClick={()=>portal()}>Manage Subscription</Button>
    )
}
export default ManageSubscrptionComponent
