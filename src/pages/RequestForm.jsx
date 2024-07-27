import RequestForm from "../components/RequestForm";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function RequestPage({token,decodedToken}){
    return (
        <div className="wrapper">
            <Navbar />
            <RequestForm token={token} decodedToken={decodedToken}/>
            <Footer />
        </div>
        
    );
}
