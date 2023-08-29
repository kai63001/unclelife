import {
    LogOut,
    AlignJustify, LogIn, Newspaper, Wallet, LayoutDashboard
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

function MobileToggle({session}: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'}><AlignJustify className={'h-4 w-4'}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <Link href={'/blog'}>
                        <DropdownMenuItem>
                            <Newspaper className="mr-2 h-4 w-4"/>
                            <span>Blog</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/pricing'}>
                        <DropdownMenuItem>
                            <Wallet className="mr-2 h-4 w-4"/>
                            <span>Pricing</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                {session ? (
                        <Link href={'/home'}>
                            <DropdownMenuItem>
                                <LayoutDashboard className="mr-2 h-4 w-4"/>
                                <span>Dashboard</span>
                            </DropdownMenuItem>
                        </Link>
                ) : (
                    <Link href={"/login"}>
                        <DropdownMenuItem>
                            <LogIn className="mr-2 h-4 w-4"/>
                            <span>Login</span>
                        </DropdownMenuItem>
                    </Link>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MobileToggle
