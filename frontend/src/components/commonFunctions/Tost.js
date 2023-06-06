import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 //notification toast
 const TostSucess = (message) => {
  console.log("called")
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };


  const TostWarning = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  export  {TostSucess, TostWarning};