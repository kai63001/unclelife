import {getPomodoroData} from "@/lib/pomodoro";
import PomodoroWidget from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro";

export const revalidate = 3

const PomodoroPublicPage = async ({params : {id}}: any) => {
    const {data} = await getPomodoroData(id)

    return (
        <div className={'h-screen w-screen'}>
            <PomodoroWidget data={data}/>
        </div>
    )
}

export default PomodoroPublicPage
