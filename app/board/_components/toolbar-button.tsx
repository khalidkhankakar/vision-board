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
            <Button disabled={isDisabled} onClick={onclick} variant={isActive ?'activeBoard':'board'} className='h-9 w-9 rounded-md p-0 text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] disabled:opacity-40 data-[state=open]:bg-[var(--color-paper-2)]'>
                <Icon className='h-4 w-4' />
            </Button>
        </Tip>
    )
}

export default ToolbarButton
