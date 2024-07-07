import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const showToastSuccessMessage = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    className: "mt-10 z-50",
  });
};

export const showToastInfoMessage = (msg) => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 3000,
    className: "mt-10",
  });
};
const Toast = () => {
  return <div>Toast
    
  </div>;
};
export default Toast;
