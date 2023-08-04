"use client"
import {Switch} from "@/components/ui/switch"
import {useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";
import Link from "next/link"
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
// @ts-ignore
import {loadStripe} from "@stripe/stripe-js";
import {ca} from "date-fns/locale";
import {Icons} from "@/components/Icons";

const PricingBox = () => {
    const [yearly, setYearly] = useState(true)
    const [loading, setLoading] = useState(false)
    const PriceDetailList = {
        basic: [
            '1 Notion Workspace',
            'As many forms as you like',
            'Unlimited Responses',
            'Embed your form anywhere',
        ],
        pro: [
            'Everything in Basic',
            '5 Notion Workspace',
            'Full customization',
            'Remove branding',
            'Multiple Integrations',
            'Custom CSS/JS',
            'New features first',
            '5 mb file upload'
        ],
        enterprise: [
            'Everything in Pro',
            'Unlimited Notion Workspace',
            '20 mb file upload',
            'Priority support',
        ]
    }
    const [priceMonthlyAndYearly, setPriceMonthlyAndYearly]: any = useState({
        basic: {
            id: "",
            month: 0,
            year: 0
        },
        pro: {
            month: {
                id: "",
                price: 0
            },
            year: {
                id: "",
                price: 0
            }
        },
        enterprise: {
            id: "",
            month: {
                id: "",
                price: 0
            },
            year: {
                id: "",
                price: 0
            }
        }
    })

    useEffect(() => {
        setLoading(true)
        getPriceList().then(r => mapPriceToList(r.plans))
    }, [])

    const subscribe = async (priceId: any) => {
        setLoading(true)
        try {
            const {data} = await axios.post('/api/stripe/subscription', {priceId})
            console.log(data)
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)
            await stripe?.redirectToCheckout({sessionId: data.id})
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const getPriceList = async () => {
        const data = await axios.get('/api/stripe/price')
        return data?.data
    }

    const mapPriceToList = (price: any) => {
        let data: any = {
            enterprise: {
                month: {
                    id: "",
                    price: 16.99
                },
                year: {
                    id: "",
                    price: 12.99 * 12
                }
            }
        }
        //loop
        price.map((item: any) => {
            data = {
                ...data,
                [item.name.toLowerCase()]: {
                    ...data[item.name.toLowerCase()],
                    [item.interval]: {
                        id: item.id,
                        price: item.price / 100
                    }
                }
            }
        })
        console.log(data)
        setPriceMonthlyAndYearly(data)
        setLoading(false)
    }

    const checkDataIsExist = (plan: any = 'pro') => {
        const interval = yearly ? 'year' : 'month'
        return !!priceMonthlyAndYearly[plan][interval].id;
    }

    return (
        <>
            <div className={'flex justify-center space-x-3 my-10'}>
                <span className={'font-bold'}>Monthly</span>
                <span className={''}><Switch checked={yearly} onCheckedChange={(e) => setYearly(e)} id="airplane-mode"/></span>
                <span className={'font-bold'}>Yearly <Badge variant="destructive">~ 25%</Badge></span>
            </div>
            <div className={'flex items-center'}>
                <div className={'flex-1 border h-[400px] rounded-md shadow-lg bg-background p-5 relative'}>
                    <h2 className={'text-3xl font-bold'}>Basic</h2>
                    <p className={'my-2'}>All the basics tools to create beautiful forms.</p>
                    <h3 className={'text-3xl font-bold text-center my-5'}>
                        Free
                    </h3>
                    <div className={'flex flex-col space-y-1'}>
                        {PriceDetailList.basic.map((item, index) => (
                            <div className={'flex space-x-3'} key={index}>
                                <Check size={24} color={'#f2272a'}/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className={'w-full absolute bottom-[10px] left-0 flex justify-center p-5'}>
                        <Link href={'/home'} className={'w-full'}>
                            <Button className={'w-full'}>
                                Try Now
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={'flex-1 border h-[500px] rounded-md shadow-lg bg-primary text-secondary p-5 relative'}>
                    <h2 className={'text-3xl font-bold'}>Pro</h2>
                    <p className={'my-2'}>Everything you need to create
                        beautiful and professional forms.</p>
                    <h3 className={'text-3xl font-bold text-center my-5'}>
                        {priceMonthlyAndYearly.pro.month.price === 0 ? (
                            <div className={'flex justify-center'}>
                                <Skeleton className="w-[130px] h-[40px] rounded-full"/>
                            </div>
                        ) : (
                            <div>
                                <span className={'text-3xl font-bold'}>$</span>
                                <span
                                    className={'text-3xl font-bold'}>{yearly ? (priceMonthlyAndYearly.pro.year.price / 12).toFixed(2) : priceMonthlyAndYearly.pro.month.price}</span>
                                <span className={'text-lg font-bold'}>/mo</span>
                            </div>
                        )}
                    </h3>
                    <div className={'flex flex-col space-y-1'}>
                        {PriceDetailList.pro.map((item, index) => (
                            <div className={'flex space-x-3'} key={index}>
                                <Check size={24} color={"#f2272a"}/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className={'w-full absolute bottom-[10px] left-0 flex justify-center p-5'}>
                        <Button disabled={!checkDataIsExist() || loading}
                                onClick={() => subscribe(yearly ? priceMonthlyAndYearly.pro.year.id : priceMonthlyAndYearly.pro.month.id)}
                                className={'w-full'} variant={'secondary'}>
                            {loading ? <Icons.spinner className="animate-spin mr-2 h-5 w-5"/> : 'Start Trail'}
                        </Button>
                    </div>

                </div>
                <div className={'flex-1 border h-[400px] rounded-md shadow-lg bg-background p-5 relative'}>
                    <h2 className={'text-3xl font-bold'}>Advanced</h2>
                    <p className={'my-2'}>Unlock advanced tools for exquisite form creation.</p>
                    <h3 className={'text-3xl font-bold text-center my-5'}>
                        <div>
                            <span className={'text-3xl font-bold'}>$</span>
                            <span
                                className={'text-3xl font-bold'}>{yearly ? (priceMonthlyAndYearly.enterprise.year.price / 12).toFixed(2) : priceMonthlyAndYearly.enterprise.month.price}</span>
                            <span className={'text-lg font-bold'}>/mo</span>
                        </div>
                    </h3>
                    <div className={'flex flex-col space-y-1'}>
                        {PriceDetailList.enterprise.map((item, index) => (
                            <div className={'flex space-x-3'} key={index}>
                                <Check size={24} color={"#f2272a"}/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className={'w-full absolute bottom-[10px] left-0 flex justify-center p-5'}>
                        <Button disabled={true} className={'w-full'}>Start Trial</Button>
                    </div>
                </div>
            </div>
            <div className={'flex justify-center'}>
                <p className={'text-center text-md text-gray-500 my-5'}>All plans include a 14-day free trial. Cancel
                    anytime</p>
            </div>
        </>
    )
}

export default PricingBox
