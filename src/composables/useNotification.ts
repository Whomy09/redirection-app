import { useToast } from '@/components/ui/toast/use-toast'

type ToastConfig = {
  title: string
  description?: string
  class: string
}

const { toast } = useToast()

export const useNotification = () => {
  function toastSuccess(title: string, description: string = '') {
    const config: ToastConfig = {
      title,
      description,
      class: 'bg-[#DEF2D6] text-lime-800 font-bold border border-lime-800'
    }

    if (!description) delete config.description

    toast(config)
  }

  function toastError(title: string, description: string = '') {
    const config: ToastConfig = {
      title,
      description,
      class: 'bg-[#EBC8C4] text-red-800 font-bold border border-red-800'
    }

    if (!description) delete config.description

    toast(config)
  }

  return {
    toastError,
    toastSuccess
  }
}
