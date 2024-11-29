import Tip from '@/components/shared/tooltip'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface ToolbarButtonProps {
    icon: LucideIcon
    label: string
    onclick: () => void
    isActive: boolean
    isDisabled: boolean
}

const ToolbarButton = ({
    icon: Icon,
    label,
    onclick,
    isActive,
    isDisabled }: ToolbarButtonProps) => {
    return (
        <Tip label={label} side='right'>
            <Button disabled={isDisabled} onClick={onclick} variant={isActive ?'activeBoard':'board'}>
                <Icon />
            </Button>
        </Tip>
    )
}

export default ToolbarButton
