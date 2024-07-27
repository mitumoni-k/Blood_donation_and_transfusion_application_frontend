import DonateForm from "../components/DonateForm";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
export default function DonatePage({token, decodedToken}){
    return (
        <div className="wrapper">
            <Navbar />
            <DonateForm token={token} decodedToken={decodedToken}/>
            <Footer />

        </div>

    );
}
