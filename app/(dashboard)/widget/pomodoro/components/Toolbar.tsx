import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Accordion,
} from "@/components/ui/accordion"
import CustomTimerPomodoroToolBar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/CustomTimer";
import CustomizationPomodoroToolbar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/Customization";
import PomodoroCustomToolBar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/PomodoroCustom";
import BackgroundPomodoroToolBar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/BackgroundPomodoro";
const PomodoroToolbar = () => {
    return (
        <div className={'fixed right-0 top-0 h-screen w-96 flex flex-col border-l bg-background pl-5'}>
            <ScrollArea className={'pr-5'}>
                <h2 className={'my-5 font-bold text-xl text-muted-foreground'}>
                    SETTINGS
                </h2>
                <Accordion type="multiple" defaultValue={['customTimer','pomodoroCustom']}>
                    <CustomTimerPomodoroToolBar/>
                    <PomodoroCustomToolBar/>
                    <BackgroundPomodoroToolBar/>
                    <CustomizationPomodoroToolbar/>
                </Accordion>
            </ScrollArea>
        </div>
    )
}

export default PomodoroToolbar
