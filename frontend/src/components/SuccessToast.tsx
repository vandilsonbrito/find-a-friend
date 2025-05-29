import { toast } from 'sonner'

export const SuccessToast = (message: string) =>
  toast.success(message, {
    style: {
      border: '1px solid #ff842e',
      padding: '16px',
      color: 'white',
      background: '#ff842e',
    },
  })
