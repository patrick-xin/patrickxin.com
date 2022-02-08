import create from "zustand";

type Position = "topCenter" | "bottomCenter" | "topRight" | "bottomRight";
type ToastType = "success" | "error" | "warning";
type Direction = "fadeUp" | "fadeLeft";
type ToastOption = {
  position?: Position;
  direction?: Direction;
  icon?: JSX.Element;
};
type ToastState = {
  isToastOpen: boolean;
  closeToast: () => void;
  message: string;
  toastType: ToastType;
  position: Position;
  direction: Direction;
  toast: {
    success: (message: string, toastOption: ToastOption) => void;
    error: (message: string, toastOption: ToastOption) => void;
    warning: (message: string, toastOption: ToastOption) => void;
  };
};

const useToastStore = create<ToastState>((set) => ({
  isToastOpen: false,
  closeToast: () => set(() => ({ isToastOpen: false })),
  message: "",
  toastType: "success",
  position: "topRight",
  direction: "fadeUp",
  toast: {
    success: (message, { position, direction }: ToastOption) =>
      set(() => ({
        isToastOpen: true,
        toastType: "success",
        message,
        position: position ?? "bottomCenter",
        direction: direction ?? "fadeUp",
      })),
    error: (message, { position, direction }: ToastOption) =>
      set(() => ({
        isToastOpen: true,
        toastType: "error",
        message,
        position: position ?? "bottomCenter",
        direction: direction ?? "fadeUp",
      })),
    warning: (message, { position, direction }: ToastOption) =>
      set(() => ({
        isToastOpen: true,
        toastType: "warning",
        message,
        position: position ?? "bottomCenter",
        direction: direction ?? "fadeUp",
      })),
  },
}));

export default useToastStore;
