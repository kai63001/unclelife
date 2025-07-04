import PomodoroToolbar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar";
import PomodoroWidget from "@/app/(dashboard)/widget/pomodoro/components/Pomodoro";
import SaveButtonPomodoroToolbar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/SaveButton";

const PomodoroDashboardPage = () => {
    return (
        <div className={'flex w-full'}>
            <div className={'m-auto mt-[10%] ml-14 shadow-md w-[70%] rounded-md h-[500px]'}>
                <div className={'rounded-md overflow-hidden h-full'}>
                    <PomodoroWidget/>
                </div>
                <SaveButtonPomodoroToolbar/>
            </div>
            <PomodoroToolbar/>
        </div>
    )
}

export default PomodoroDashboardPage
