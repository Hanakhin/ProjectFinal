import { toast, ToastOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type ToastType = 'success' | 'error' | 'info' | 'warning';

const toastConfig: Record<ToastType, ToastOptions> = {
    success: {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    },
    error: {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    },
    info: {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    },
    warning: {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    },
};

export const showToast = (message: string, type: ToastType = 'info') => {
    toast[type](message, toastConfig[type]);
};