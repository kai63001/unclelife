import {TextCursorInput, AlarmClock, Music} from "lucide-react";
import Link from "next/link";

const FeatureIndex = () => {
    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/*form*/}
                <Link href={'/form/create'} className={'border shadow-md rounded-md overflow-hidden cursor-pointer'}>
                    <div className={'h-44 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center'}>
                        <TextCursorInput size={64} className={'text-white'}/>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold">Form Builder</h3>
                        <ul className="text-muted-foreground text-sm">
                            <li>
                                Customizable fields
                            </li>
                            <li>
                                Integration with Notion databases
                            </li>
                        </ul>
                    </div>
                </Link>
                <div className={'border shadow-md rounded-md overflow-hidden cursor-pointer'}>
                    <div className={'h-44 bg-gradient-to-r from-rose-400 to-red-500 flex justify-center items-center'}>
                        <AlarmClock size={64} className={'text-white'}/>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold flex items-center">Pomodoro
                            <span
                                className={'rounded-full px-3 bg-red-600 text-white text-xs font-bold py-1 ml-2'}>SOON</span>
                        </h3>
                        <ul className="text-muted-foreground text-sm">
                            <li>
                                Set work and break intervals
                            </li>
                            <li>
                                Audio and visual alerts
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={'border shadow-md rounded-md overflow-hidden cursor-pointer'}>
                    <div className={'h-44 bg-gradient-to-r from-lime-400 to-lime-500 flex justify-center items-center'}>
                        <Music size={64} className={'text-white'}/>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold flex items-center">Ambient Sound
                            <span
                                className={'rounded-full px-3 bg-red-600 text-white text-xs font-bold py-1 ml-2'}>SOON</span>
                        </h3>
                        <ul className="text-muted-foreground text-sm">
                            <li>
                                Designed to enhance the user experience by providing a range of calming and immersive background sounds.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureIndex
