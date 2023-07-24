import { Skeleton } from "@/components/ui/skeleton"

const RenderMyFormLoading = () => {
    return (
        <div className={`grid grid-cols-4 gap-4`}>
            {[...Array(4)].map((_, index: number) => (
                <Skeleton key={index} className={`w-full h-24`}/>
            ))}
        </div>
    );
};

export default RenderMyFormLoading;