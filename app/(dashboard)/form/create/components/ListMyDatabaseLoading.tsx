import {Skeleton} from "@/components/ui/skeleton";

const ListMyDatabaseLoading = () => {
    return (
        <div className={`grid grid-cols-3 gap-4`}>
            {[...Array(6)].map((_, index: number) => (
                <Skeleton key={index} className={`w-full h-32`}/>
            ))}
        </div>
    )
}

export default ListMyDatabaseLoading
