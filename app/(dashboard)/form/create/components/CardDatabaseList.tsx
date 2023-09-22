"use client"
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Database} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/Icons";
import {useCallback} from "react";
import {
    clearAllData,
    setDatabaseId,
    setDatabaseName,
    setForm,
    setTableOfDatabase,
    setWorkspaceId
} from "@/app/redux/slice/formController.slice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion"

const CardDatabaseList = ({listDatabase = [],selectedWorkspace}: any) => {
    const dispatch = useAppDispatch();
    const {form} = useAppSelector((state) => state.formReducer);
    const router = useRouter();
    const checkNotionImageUrl = (url: string) => {
        if (url.includes('notion.so')) {
            return url
        }
        return `https://www.notion.so${url}`
    }

    const selectedDatabase = useCallback(async (e: any, database: any) => {
        e.preventDefault();
        dispatch(clearAllData());
        // let properties: any = database?.properties;
        //reverse properties.options
        // for (let key in properties) {
        //     const type = properties[key].type
        //     if (properties[key][type].options != undefined) {
        //         properties[key][type].options.reverse()
        //     }
        // }
        dispatch(setWorkspaceId(selectedWorkspace));
        dispatch(setTableOfDatabase(database.properties));
        dispatch(setDatabaseId(database.id));
        const databaseName = database?.title?.length > 0 ? database?.title[0].plain_text : 'Untitled'
        dispatch(setDatabaseName(databaseName));
        dispatch(setForm({
            name: 'title',
            value: databaseName
        }))
        if (database?.description?.length > 0) {
            dispatch(setForm({
                name: 'description',
                value: database?.description[0].plain_text
            }))
        }
        // redirect to custom/form
        router.push("/custom/form");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, form, router]);

    const openNotion = (e: any, url: string) => {
        e.stopPropagation()
        window.open(url, '_blank')
    }

    return (
        <>
            {listDatabase?.map((database: any, index: any) => (
                <motion.div key={index}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.9}}
                            animate={{opacity: 1, x: 0}}
                            initial={{opacity: 0, x: 50}}
                >
                    <Card onClick={(e) => selectedDatabase(e, database)}
                          className={'hover:bg-secondary cursor-pointer'}>
                        <CardHeader>
                            <CardTitle className={'flex items-center'}>
                                {database?.icon?.type === 'emoji' ? (
                                    <div
                                        className={'mr-2'}>{database.icon.emoji}</div>) : database?.icon?.type === 'external' ? (
                                    <Image className={'mr-2'} src={checkNotionImageUrl(database.icon.external.url)}
                                           alt={'icon'} width={24}
                                           height={24}/>
                                ) : (
                                    <Database size={24} className={'mr-2'}/>
                                )}

                                <p className={'whitespace-nowrap overflow-hidden text-ellipsis'}>
                                    {database?.title?.length > 0 ? database?.title[0].plain_text : 'Untitled'}
                                </p>
                            </CardTitle>
                            <CardDescription>
                                <p className={'whitespace-nowrap overflow-hidden text-ellipsis'}>
                                    {database?.description?.length > 0 ? database?.description[0].plain_text : 'No description'}
                                </p>
                                <div className={'mt-5'}>
                                    <Button variant={'outline'} onClick={(e) => openNotion(e, database.url)}>
                                        <Icons.notion className={'w-6 h-6'}/>
                                    </Button>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </motion.div>

            ))}
            {listDatabase.length === 0 && (
                <div className={'col-span-3'}>
                    <p className={'text-muted-foreground text-center'}>{'No databases found. Please ensure you\'ve connected your Notion account.'}</p>
                </div>
            )}
        </>
    );
};

export default CardDatabaseList;
