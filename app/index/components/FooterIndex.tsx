import Link from 'next/link'

const FooterIndex = () => {
    return (
        <footer className="max-w-6xl mx-auto w-full flex-col justify-between pt-8 items-center relative pb-10">
            <div className={'pb-5 grid grid-cols-4 gap-4'}>
                <ul className={'text-muted-foreground p-0 m-0'}>
                    <li>
                        <h2 className={'font-bold text-2xl text-foreground'}>Uncle Life</h2>
                    </li>
                    <li>
                        <Link href={'https://uncle-life.canny.io/feedback'} target={'_blank'} rel={'noopener noreferrer'}>Feedback</Link>
                    </li>
                    <li>
                        <Link href={'https://uncle-life.canny.io/feature-requests'} target={'_blank'} rel={'noopener noreferrer'}>Feature Request</Link>
                    </li>
                </ul>
                <ul className={'text-muted-foreground p-0 m-0'}>
                    <li>
                        <p className={'text-foreground font-bold'}>Features</p>
                    </li>
                    <li>
                        <Link href={'/form/create'} target={'_blank'} rel={'noopener noreferrer'}>Form Builder</Link>
                    </li>
                    <li>
                        <Link href={'https://unclelife.co/'} target={'_blank'} rel={'noopener noreferrer'}>Pomodoro</Link>
                    </li>
                    <li>
                        <Link href={'https://unclelife.co/'} target={'_blank'} rel={'noopener noreferrer'}>Ambient Sound</Link>
                    </li>
                </ul>
                <ul className={'text-muted-foreground p-0 m-0'}>
                    <li>
                        <p className={'text-foreground font-bold'}>Page</p>
                    </li>
                    <li>
                        <Link href={'/about'} target={'_blank'} rel={'noopener noreferrer'}>About</Link>
                    </li>
                    <li>
                        <Link href={'https://unclelife.co/blog'} target={'_blank'} rel={'noopener noreferrer'}>Blog</Link>
                    </li>
                    <li>
                        <Link href={'/contact'} target={'_blank'} rel={'noopener noreferrer'}>Contact</Link>
                    </li>
                </ul>
                <ul className={'text-muted-foreground p-0 m-0'}>
                    <li>
                        <p className={'text-foreground font-bold'}>Legal</p>
                    </li>
                    <li>
                        <Link href={'/privacy-policy'} target={'_blank'} rel={'noopener noreferrer'}>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href={'/terms-conditions'} target={'_blank'} rel={'noopener noreferrer'}>Terms of Service</Link>
                    </li>
                </ul>

            </div>
            <div className={'border-t pt-5'}>
                <p className={'text-center'}>
                    © Copyright {new Date().getFullYear()} UncleLife. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default FooterIndex
