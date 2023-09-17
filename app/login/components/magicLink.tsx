"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {supabase} from "@/lib/supabase";

const MagicLink = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const sendMagicLink = async () => {
        setError('')
        console.log(email)
        //check email
        if (!email) {
            setError('Email is required')
            return
        }
        //validate email
        if (!validateEmail(email)) {
            setError('Email is invalid. Please try again.')
            return
        }

        //send a magic link
        const {data, error} = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback`,
            },
        })
        if (error) {
            setError(error.message)
        }


    }

    const validateEmail = (email: string) => {
        // eslint-disable-next-line no-useless-escape
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <div>
            <Input className={''} onChange={(e)=>{
                setEmail(e.target.value)
                setError('')
            }} placeholder={'Email Address...'}/>
            {error && (
                <p className={'text-red-400 text-sm'}>
                    {error}
                </p>
            )}
            <Button className={'w-full mt-2'} onClick={sendMagicLink}>
                Send Magic Link
            </Button>
        </div>
    )
}

export default MagicLink
