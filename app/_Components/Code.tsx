import {cn} from "@/lib/utils";
import {ComponentPropsWithoutRef} from "react";

export const Code = ({className, ...props}:ComponentPropsWithoutRef<'span'>)=>{
    return(
        <span className={cn("bg-accent/30 font-mono border border-accent p-1 rounded text-primary hover:bg-accent/50 inline-flex items-center gap-2",className)}{...props}/>
    )
}