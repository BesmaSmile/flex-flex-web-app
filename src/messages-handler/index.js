import { toast } from 'react-toastify';

const showErrorMessage = (message) => {
  toast(message, {
    position: 'bottom-right',
    type: 'error',
    delay: 1000,
  });
};

const showSuccessMessage = (message) => {
  toast(message, {
    position: 'bottom-right',
    type: 'success',
    delay: 1000,
  });
};

export default { showErrorMessage, showSuccessMessage };
