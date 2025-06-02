import { ToastAction, useToastContext } from "@/providers/ToastProvider";

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  actions?: ToastAction[];
}

export const useToastMessage = () => {
  const { addToast, removeToast } = useToastContext();

  const showSuccess = (options: ToastOptions) => {
    return addToast({
      type: "success",
      ...options,
    });
  };

  const showError = (options: ToastOptions) => {
    return addToast({
      type: "error",
      duration: options.duration || 8000, // Longer for errors
      ...options,
    });
  };

  const showWarning = (options: ToastOptions) => {
    return addToast({
      type: "warning",
      duration: options.duration || 6000,
      ...options,
    });
  };

  const showInfo = (options: ToastOptions) => {
    return addToast({
      type: "info",
      ...options,
    });
  };

  const dismiss = (id: string) => {
    removeToast(id);
  };

  // Convenience methods with common e-commerce use cases
  const showOrderSuccess = (orderNumber?: string) => {
    return showSuccess({
      title: "Order Placed Successfully!",
      description: orderNumber
        ? `Order #${orderNumber} has been confirmed and is being processed.`
        : "Your order has been confirmed and is being processed.",
      duration: 7000,
    });
  };

  const showPaymentError = (retryAction?: () => void) => {
    return showError({
      title: "Payment Failed",
      description:
        "There was an issue processing your payment. Please try again.",
      actions: retryAction
        ? [
            {
              label: "Retry Payment",
              onClick: retryAction,
            },
          ]
        : undefined,
    });
  };

  const showInventoryWarning = (productName: string) => {
    return showWarning({
      title: "Low Stock Alert",
      description: `Only a few ${productName} items left in stock!`,
      duration: 6000,
    });
  };

  const showCartUpdate = (
    action: "added" | "removed",
    productName: string,
    undoAction?: () => void
  ) => {
    const title = action === "added" ? "Added to Cart" : "Removed from Cart";
    const description = `${productName} has been ${
      action === "added" ? "added to" : "removed from"
    } your cart.`;

    return showInfo({
      title,
      description,
      duration: 4000,
      actions: undoAction
        ? [
            {
              label: "Undo",
              onClick: undoAction,
            },
          ]
        : undefined,
    });
  };

  return {
    // Core methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismiss,

    // E-commerce specific methods
    showOrderSuccess,
    showPaymentError,
    showInventoryWarning,
    showCartUpdate,
  };
};
