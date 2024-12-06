/* eslint-disable react/display-name */
import { Loader } from "lucide-react";
import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAlert } from "react-icons/io";

enum variantEnum {
  success = "bg-[#4FFFB0]/50 border border-green-200",
  error = "text-destructive bg-red-100 border border-red-200",
  info = "bg-blue-100 border border-blue-200",
}

export type AlertHandle = {
  showAlert(variant: keyof typeof variantEnum, message: string): void;
  showProgress(message: string): void;
  closeAlert(): void;
};

const Alert = forwardRef<AlertHandle, { autoClose?: boolean }>((props, ref) => {
  const { autoClose = true } = props;

  const [variant, setVariant] = useState<variantEnum>(variantEnum.success);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const showAlert = (
    variant: keyof typeof variantEnum,
    alertMessage: string = ""
  ) => {
    setIsOpen(true);
    setMessage(alertMessage);
    setVariant(variantEnum[variant]);
    if (autoClose) {
      setTimeout(() => {
        closeAlert();
      }, 5000);
    }
  };

  const showProgress = (message: string) => {
    setIsOpen(true);
    setMessage(message);
    setVariant(variantEnum.info);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    showAlert,
    showProgress,
    closeAlert,
  }));

  return (
    <Fragment>
      {isOpen && (
        <div className={`${variant} p-3 rounded flex items-center w-full mb-2`}>
          <div className="mr-2">
            <span>
              {variant === variantEnum.error && (
                <IoMdAlert className="size-5" />
              )}
              {variant === variantEnum.info && (
                <Loader className="animate-spin" />
              )}
            </span>
          </div>

          <div className="flex-1 p-0 text-sm">{message}</div>

          {!autoClose && (
            <div className="w-12 flex items-center justify-center">
              <span>
                <AiOutlineClose onClick={closeAlert} className="size-4" />
              </span>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
});

export default Alert;
