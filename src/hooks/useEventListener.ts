import { useEffect } from 'react';
import { eventEmitter, messageHandler } from '@/utils';

const useEventListener = () => {
  const onSuccess = (message: string) => messageHandler.showSuccessMessage(message);
  const onError = (message: string) => messageHandler.showErrorMessage(message);
  useEffect(() => {
    eventEmitter.on("success", onSuccess);
    eventEmitter.on("error", onError);

    return () => {
      eventEmitter.off("success", onSuccess);
      eventEmitter.off("error", onError);
    };
  }, []);
}

export default useEventListener;
