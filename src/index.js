import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {
//       createBrowserRouter,RouterProvider} from "react-router-dom";
// import Login from './components/Login';
// import SignUp from './components/Signup';
// import DonateForm from './components/DonateForm';
// import RequestForm from './components/RequestForm'
// import MainPage from './components/MainPage';
import reportWebVitals from './reportWebVitals';

// const router = createBrowserRouter([

//   {
//     path:"/",
//     element:<MainPage />
//   },
//   {
//     path:"/Login",
//     element:<Login />
//   },
//   {
//     path:"/Signup",
//     element:<SignUp />
//   },
//   {
//     path:"/Donateform",
//     element:<DonateForm />
//   },
//   {
//     path:"/Requestform",
//     element:<RequestForm />
//   }
// ])      

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode >
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// reportWebVitals();
// // reportWebVitals(console.log);   for measuring peerformane of your app in the console.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();