import RequestForm from "../components/RequestForm";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function RequestPage({decodedToken}){
    return (
        <div className="wrapper">
            <Navbar />
            <RequestForm decodedToken={decodedToken}/>
            <Footer />
        </div>
        
    );
}
