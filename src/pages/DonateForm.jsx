import DonateForm from "../components/DonateForm";
import Footer from "../components/Footer"
export default function DonatePage({decodedToken}){
    return (
        <div>
            <DonateForm decodedToken={decodedToken}/>
            <Footer />

        </div>

    );
}
