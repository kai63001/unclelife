"use client"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setCustomization} from "@/app/redux/slice/pomodoroController.slice";
import ColorSelectComponent
    from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/Customization/ColorSelectComponent";

const CustomizationPomodoroToolbar = () => {
    const dispatch = useAppDispatch()
    const {customization} = useAppSelector(state => state.pomodoroReducer)

    return (
        <AccordionItem value="customization">
            <AccordionTrigger>
                Customization Color
            </AccordionTrigger>
            <AccordionContent className={'pt-1 px-1'}>
                <div className={'mb-4'}>
                    <h2 className={'font-bold text-muted-foreground mb-2'}>
                        Pomodoro
                    </h2>
                    <div className={'grid grid-cols-2 gap-2'}>
                        <ColorSelectComponent label={'Text Timer'} name={'TimeTextColor'} type={'pomodoro'}
                                              keyValue={'color'} value={customization.pomodoro.color}
                                              hideHidden={true}/>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'font-bold text-muted-foreground mb-2'}>
                        Tab Selected
                    </h2>
                    <div className={'grid grid-cols-2 gap-2'}>
                        <ColorSelectComponent label={'Background Color'} name={'tabSelectedBackgroundColor'}
                                              type={'tabSelected'} keyValue={'backgroundColor'}
                                              value={customization.tabSelected.backgroundColor}/>
                        <ColorSelectComponent label={'Background Hover'} name={'tabSelectedBackgroundHover'}
                                              type={'tabSelected'} keyValue={'backgroundColorHover'}
                                              value={customization.tabSelected.backgroundColorHover}/>
                        <ColorSelectComponent label={'Text Color'} name={'tabSelectedTextColor'} type={'tabSelected'}
                                              keyValue={'color'} value={customization.tabSelected.color}/>
                        <ColorSelectComponent label={'Text Hover'} name={'tabSelectedTextHover'} type={'tabSelected'}
                                              keyValue={'colorHover'} value={customization.tabSelected.colorHover}/>
                        <ColorSelectComponent label={'Border Color'} name={'tabSelectedBorderColor'}
                                              type={'tabSelected'}
                                              keyValue={'borderColor'} value={customization.tabSelected.borderColor}/>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'font-bold text-muted-foreground mb-2'}>
                        Tab
                    </h2>
                    <div className={'grid grid-cols-2 gap-2'}>
                        <ColorSelectComponent label={'Background Color'} name={'tabBackgroundColor'}
                                              type={'tab'} keyValue={'backgroundColor'}
                                              value={customization.tab.backgroundColor}/>
                        <ColorSelectComponent label={'Background Hover'} name={'tabBackgroundHover'}
                                              type={'tab'} keyValue={'backgroundColorHover'}
                                              value={customization.tab.backgroundColorHover}/>
                        <ColorSelectComponent label={'Text Color'} name={'tabTextColor'} type={'tab'}
                                              keyValue={'color'} value={customization.tab.color}/>
                        <ColorSelectComponent label={'Text Hover'} name={'tabTextHover'} type={'tab'}
                                              keyValue={'colorHover'} value={customization.tab.colorHover}/>
                        <ColorSelectComponent label={'Border Color'} name={'tabBorderColor'} type={'tab'}
                                              keyValue={'borderColor'} value={customization.tab.borderColor}/>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'font-bold text-muted-foreground mb-2'}>
                        Start Button
                    </h2>
                    <div className={'grid grid-cols-2 gap-2'}>
                        <ColorSelectComponent label={'Background Color'} name={'StartBackgroundColor'}
                                              type={'start'} keyValue={'backgroundColor'}
                                              value={customization.start.backgroundColor}/>
                        <ColorSelectComponent label={'Background Hover'} name={'StartBackgroundHover'}
                                              type={'start'} keyValue={'backgroundColorHover'}
                                              value={customization.start.backgroundColorHover}/>
                        <ColorSelectComponent label={'Text Color'} name={'StartTextColor'} type={'start'}
                                              keyValue={'color'} value={customization.start.color}/>
                        <ColorSelectComponent label={'Text Hover'} name={'StartTextHover'} type={'start'}
                                              keyValue={'colorHover'} value={customization.start.colorHover}/>
                        <ColorSelectComponent label={'Border Color'} name={'StartBorderColor'} type={'start'}
                                              keyValue={'borderColor'} value={customization.start.borderColor}/>
                    </div>
                </div>
                <div className={'mb-4'}>
                    <h2 className={'font-bold text-muted-foreground mb-2'}>
                        Pause Button
                    </h2>
                    <div className={'grid grid-cols-2 gap-2'}>
                        <ColorSelectComponent label={'Background Color'} name={'pauseBackgroundColor'}
                                              type={'pause'} keyValue={'backgroundColor'}
                                              value={customization.pause.backgroundColor}/>
                        <ColorSelectComponent label={'Background Hover'} name={'pauseBackgroundHover'}
                                              type={'pause'} keyValue={'backgroundColorHover'}
                                              value={customization.pause.backgroundColorHover}/>
                        <ColorSelectComponent label={'Text Color'} name={'pauseTextColor'} type={'pause'}
                                              keyValue={'color'} value={customization.pause.color}/>
                        <ColorSelectComponent label={'Text Hover'} name={'pauseTextHover'} type={'pause'}
                                              keyValue={'colorHover'} value={customization.pause.colorHover}/>
                        <ColorSelectComponent label={'Border Color'} name={'pauseBorderColor'} type={'pause'}
                                              keyValue={'borderColor'} value={customization.pause.borderColor}/>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export default CustomizationPomodoroToolbar
