import { messageHandler } from '@/utils';
import { useEffect } from 'react'


const useToastNotifications = ({ success, error }: { success?: string | null; error?: string | null }) => {
  useEffect(() => {
    if (error) {
      messageHandler.showErrorMessage(error)
    }
  }, [error])

  useEffect(() => {
    if (success) {
      messageHandler.showSuccessMessage(success)
    }
  }, [success])
}

export default useToastNotifications;