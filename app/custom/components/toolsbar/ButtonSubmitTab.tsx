import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {setForm} from "@/app/redux/slice/formController.slice";

const ButtonSubmitTab = () => {
    const dispatch = useAppDispatch();
    const {form} = useAppSelector((state) => state.formReducer);

    const handleClickChangePosition = (e: any) => {
        const value = (e.target?.outerText).toLowerCase();
        switch (value) {
            case "left":
                console.log("left")
                dispatch(setForm({
                    name: "button",
                    value: {
                        ...form?.button,
                        ['position']: 'flex-start'
                    }
                }))
                break;
            case "center":
                dispatch(setForm({
                    name: "button",
                    value: {
                        ...form?.button,
                        ['position']: 'center'
                    }
                }))
                break;
            case "right":
                dispatch(setForm({
                    name: "button",
                    value: {
                        ...form?.button,
                        ['position']: 'flex-end'
                    }
                }))
                console.log("right");
                break;
            default:
                break;
        }
    }

    return (
        <Tabs onClick={(e: any) => {
            handleClickChangePosition(e)
        }} defaultValue="left" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="left">Left</TabsTrigger>
                <TabsTrigger value="center">Center</TabsTrigger>
                <TabsTrigger value="right">Right</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default ButtonSubmitTab;
