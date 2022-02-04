import create from "zustand";

type Position = "top" | "bottom" | "topRight" | "bottomRight";

type MessageModalState = {
  isMessageModalOpen: boolean;
  message: string;
  toast: {
    success: (message: string, position?: Position) => void;
    error: (message: string, position?: Position) => void;
    warning: (message: string, position?: Position) => void;
  };
  position: Position;
  closeMessageModal: () => void;
  messageType: "success" | "error" | "warning";
};

const useModalStore = create<MessageModalState>((set) => ({
  isMessageModalOpen: false,
  closeMessageModal: () => set({ isMessageModalOpen: false }),
  message: "",
  messageType: "success",
  position: "bottom",
  toast: {
    success: (message: string, position?: Position) =>
      set({
        isMessageModalOpen: true,
        messageType: "success",
        message,
        position: position ?? "bottom",
      }),
    error: (message: string, position?: Position) =>
      set({
        isMessageModalOpen: true,
        messageType: "error",
        message,
        position: position ?? "bottom",
      }),
    warning: (message: string, position?: Position) =>
      set({
        isMessageModalOpen: true,
        messageType: "warning",
        message,
        position: position ?? "bottom",
      }),
  },
}));

export default useModalStore;
