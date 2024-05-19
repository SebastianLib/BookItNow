import { create } from "zustand"

type AuthModalType = "signup" | "signin" | null;

type AuthModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    type: AuthModalType
    changeType: (type:AuthModalType) => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    type: null,
    changeType: (type:AuthModalType) => set({type: type}) 
}))