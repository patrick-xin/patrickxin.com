import { useToastStore } from '@/common/hooks'

const ToastForPost = () => {
  const { toast } = useToastStore()
  return (
    <span className="inline-flex gap-4 my-4">
      <button
        onClick={() =>
          toast.success("I'm a success message!", {
            position: 'topRight',
            direction: 'fadeLeft',
          })
        }
        className="p-2 text-white bg-green-600 rounded shadow-lg"
      >
        success
      </button>
      <button
        onClick={() =>
          toast.error('Opps, something went wrong!', {
            position: 'topCenter',
            direction: 'fadeUp',
          })
        }
        className="p-2 text-white bg-red-600 rounded shadow-lg"
      >
        error
      </button>
      <button
        onClick={() =>
          toast.warning("You've been warned!", {
            position: 'bottomRight',
            direction: 'fadeLeft',
          })
        }
        className="p-2 text-white bg-yellow-600 rounded shadow-lg"
      >
        warning
      </button>
    </span>
  )
}

export default ToastForPost
