
import Signup from "../components/Signup";
import {ToastContainer , Bounce} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export default function SignupPage({fcmToken}){
    return( 
        <>
                <Signup fcmToken={fcmToken}/>
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
                transition={Bounce}
                />
        </> 
    )
}