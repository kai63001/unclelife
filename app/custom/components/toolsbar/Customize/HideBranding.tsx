import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"

const HideBranding = ({onChangeHook, form}: any) => {

    const hideBranding = (e: any) => {
        onChangeHook({
            ...form?.pro,
            customizations: {
                ...form?.pro?.customizations,
                ['hideBranding']: e
            }
        }, 'pro')
    }

    return (
        <div className="flex items-center space-x-2 pt-4">
            <Switch onCheckedChange={hideBranding} id="airplane-mode"/>
            <Label htmlFor="airplane-mode">
                Remove UncleLife Branding</Label>
        </div>
    )
}

export default HideBranding
