import { AlertHandle } from "@/components/ui/alert";

export const reportErrors = (
  alert: AlertHandle,
  error: string | Error | Record<string, string>
) => {
  if (typeof error === "string") {
    alert?.showAlert("error", error);
  }

  if (typeof error === "object") {
    if (error?.message) {
      alert?.showAlert("error", error?.message);
    }
  }
};
