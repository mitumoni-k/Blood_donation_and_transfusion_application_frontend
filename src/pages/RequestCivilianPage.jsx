import RequestCivilian from "../components/ReqCivilian";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function RequestCivilianPage({token,decodedToken}){
    return (
        <div className="wrapper">
            <Navbar />
            <RequestCivilian token={token} decodedToken={decodedToken} />
            <Footer />
        </div>
        
    );
}
