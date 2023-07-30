"use client"
import Link from 'next/link';

const SuccessPageComponent = () => {
    return (
        <div className="flex items-center justify-center">
                <div className="p-6 ">
                    <div className="flex items-center justify-center">
                        <p className='text-7xl'>🎉</p>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-5">
                        <h1 className="text-3xl font-bold text-muted-foreground">Success!</h1>
                        <p className="mt-2 text-gray-600">Your form has been submitted.</p>
                        <p className="mt-5 text-gray-400 text-sm">If you want to create your form, go to 
                            <Link href="https://www.unclelife.co" className="ml-1 underline">
                                unclelife.co
                            </Link>
                        </p>
                    </div>
                </div>
        </div>
    )
}

export default SuccessPageComponent;