"use client"
import {useAppSelector} from "@/app/redux/hook";
import {Button} from "@/components/ui/button";
import axios from "axios";
import PricingBox from "@/app/pricing/components/PricingBox";

const ManageSubscrptionComponent = () => {
    const {data: user} = useAppSelector(state => state.userReducer)
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
    if (user?.is_subscribed) {
        return (
            <Button onClick={() => portal()}>Manage Subscription</Button>
        )
    }

    return (
        <PricingBox/>
    )
}
export default ManageSubscrptionComponent
