import { Skeleton } from "@/components/ui/skeleton"

const RenderMyFormLoading = () => {
    return (
        <div className={`flex flex-col space-y-3`}>
            {[...Array(4)].map((_, index: number) => (
                <Skeleton key={index} className={`w-full h-10`}/>
            ))}
        </div>
    );
};

export default RenderMyFormLoading;
