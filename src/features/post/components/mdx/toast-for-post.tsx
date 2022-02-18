import { useToastStore } from "@/common/hooks";
import React from "react";

const ToastForPost = () => {
  const { toast } = useToastStore();
  return (
    <span className="gap-4 my-4 inline-flex">
      <button
        onClick={() =>
          toast.success("I'm a success message!", {
            position: "topRight",
            direction: "fadeLeft",
          })
        }
        className="px-2 py-2 text-white rounded shadow-lg bg-green-600"
      >
        success
      </button>
      <button
        onClick={() =>
          toast.error("Opps, something went wrong!", {
            position: "topCenter",
            direction: "fadeUp",
          })
        }
        className="px-2 py-2 text-white rounded shadow-lg bg-red-600"
      >
        error
      </button>
      <button
        onClick={() =>
          toast.warning("You've been warned!", {
            position: "bottomRight",
            direction: "fadeLeft",
          })
        }
        className="px-2 py-2 text-white rounded shadow-lg bg-yellow-600"
      >
        warning
      </button>
    </span>
  );
};

export default ToastForPost;
