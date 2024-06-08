import { ToastContainer , Bounce } from "react-toastify";
import MyProfile from "../components/MyProfile";

export default function MyProfilepage() {
  return (
    <>
      <MyProfile />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition = {Bounce}
      />
    </>
  );
}
