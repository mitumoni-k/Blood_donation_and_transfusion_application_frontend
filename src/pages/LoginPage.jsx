import { ToastContainer, Bounce } from "react-toastify";
import Login from "../components/Login";

export default function LoginPage({fcmToken}) {
  return (
    <>
      <Login fcmToken={fcmToken}/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
