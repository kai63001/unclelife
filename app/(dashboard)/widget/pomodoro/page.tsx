import PomodoroToolbar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar";
import PomodoroWidget from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro";

const PomodoroDashboardPage = () => {
    return (
        <div className={'flex w-full min-h-screen h-fit'}>
            <div className={'m-auto mt-[20%] ml-14 shadow-md w-[70%] rounded-md h-[500px]'}>
                <PomodoroWidget/>
            </div>
            <PomodoroToolbar/>
        </div>
    )
}

export default PomodoroDashboardPage
