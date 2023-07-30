"use client"
import {Plus,Trash} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useAppDispatch} from "@/app/redux/hook";
import {setLayerWithId} from "@/app/redux/slice/formController.slice";
import {useCallback} from "react";

const AddOptions = ({
                        data
                    }: {
    data: any;
}) => {
    const dispatch = useAppDispatch();

    const addOption = useCallback(() => {
        console.log("add option");
        const newOption = {
            name: `Option ${data?.options?.length + 1 || 1}`,
            color: "gray"
        };
        const listOptions: any = [];
        data?.options?.map((item: any) => {
            listOptions.push(item);
        });
        listOptions.push(newOption);
        const newData = {
            ...data,
            ["options"]: listOptions
        };
        dispatch(setLayerWithId({
            id: data?.id,
            value: {
                ...newData
            }
        }));
    }, [data, dispatch]);

    const updateNameWithId = (e: any, index: number) => {
        const listOptions: any = []
        data?.options?.map((item: any, i: number) => {
            if (i === index) {
                listOptions.push({
                    ...item,
                    ['name']: e
                })
            } else {
                listOptions.push(item)
            }
        })
        const newData = {
            ...data,
            ['options']: listOptions
        }
        dispatch(setLayerWithId({
            id: data?.id,
            value: {
                ...newData
            }
        }))
    }

    const removeOptionById = (index: number) => {
        const listOptions: any = []
        data?.options?.map((item: any, i: number) => {
            if (i !== index) {
                listOptions.push(item)
            }
        })
        const newData = {
            ...data,
            ['options']: listOptions
        }
        dispatch(setLayerWithId({
            id: data?.id,
            value: {
                ...newData
            }
        }))
    }


    return (
        <div>
            <span className={'text-lg font-medium'}>Select Options</span>
            <div className={'mt-2 flex flex-col space-y-2'}>
                {/* List Options */}
                {data?.options?.map((item: any, index: number) => (
                    <div key={index} className={'flex space-x-2'}>
                        <Input
                            key={index}
                            onChange={(e) => {
                                updateNameWithId(e.target.value, index)
                            }}
                            placeholder={'Option ' + (index + 1)}
                            value={
                                item?.name
                            }/>
                        <button onClick={()=>removeOptionById(index)} className={'bg-secondary px-3 rounded-md'}><Trash className={'w-4 h-4 '}/></button>
                    </div>
                ))}
                <button
                    onClick={addOption}
                    className={'flex items-center text-gray-700 px-2 py-1 hover:bg-gray-200 duration-100 rounded-md'}>
                    <Plus className={'h-4 w-4 mr-2'}/>
                    Add Option
                </button>
            </div>
        </div>
    );
};

export default AddOptions;