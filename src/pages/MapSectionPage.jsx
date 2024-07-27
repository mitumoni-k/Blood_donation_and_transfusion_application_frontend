import MapSection from "../components/MapSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, Bounce } from "react-toastify";
export default function MapSectionPage({authorized,userRole}) {
  return (
    <div className="wrapper">
      <Navbar />
      <MapSection authorized={authorized} userRole={userRole}  />
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
      <Footer />
    </div>
  );
}
