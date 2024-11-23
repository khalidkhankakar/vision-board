import { create} from 'zustand'

const defaultValues = { id:"", title:"" }

interface IRenameModel {
    isOpen: boolean
    onOpen: (id:string, title:string) => void
    initialValues: typeof defaultValues
    onClose: () => void
}

export const useRenameModel = create<IRenameModel>((set) => ({
    isOpen: false,
    onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title} }),
    onClose: () => set({ 
        isOpen: false,
        initialValues: defaultValues
     }),
    initialValues: defaultValues,
}))