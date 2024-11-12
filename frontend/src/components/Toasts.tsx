/**
 * Customized sonner toast messages
 */

import { toast } from "sonner";

interface ToastProps {
  message: string;
}

/**
 * Customized success sonner toast
 */
const SuccessToast = ({ message }: ToastProps) => {
  return toast.success(message, {
    classNames: {
      toast:
        "bg-emerald-100 border border-emerald-300 shadow-lg shadow-emerald-100",
      title: "text-emerald-600 text-base font-medium",
      description: "text-emerald-600 text-base",
      icon: "text-xl",
    },
  });
};

/**
 * Customized error sonner toast
 */
const ErrorToast = ({ message }: ToastProps) => {
  return toast.error(message, {
    classNames: {
      toast: "bg-red-100 border border-red-300 shadow-lg shadow-red-100",
      title: "text-red-500 text-base font-medium",
      description: "text-red-500 text-base",
      icon: "text-xl",
    },
  });
};

export { SuccessToast, ErrorToast };
