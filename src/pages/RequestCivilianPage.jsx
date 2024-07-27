import RequestCivilian from "../components/ReqCivilian";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function RequestCivilianPage({decodedToken}){
    return (
        <div className="wrapper">
            <Navbar />
            <RequestCivilian decodedToken={decodedToken} />
            <Footer />
        </div>
        
    );
}
