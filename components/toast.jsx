import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "error") => {
  if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  } else {
    toast(message);
  }
};
