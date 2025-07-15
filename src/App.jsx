import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FoodDetails from "./components/Category/Category";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserContextProvider from "./context/userContext/UserContextProvider";
import Seafood from "./components/Seafood/Seafood";
import Beef from "./components/Beef/Beef";
import Breakfast from "./components/Breakfast/Breakfast";
import Chiken from "./components/Chiken/Chiken";
import Dessert from "./components/Dessert/Dessert";
import Goat from "./components/Goat/Goat";
import Lamb from "./components/Lamb/Lamb";
import Miscellaneos from "./components/Miscellaneos/Miscellaneos";
import Pasta from "./components/Pasta/Pasta";
import Pork from "./components/Pork/Pork";
import Side from "./components/Side/Side";
import Strater from "./components/Strater/Strater";
import Vegan from "./components/Vegan/Vegan";
import Vegetarian from "./components/Vegetarian/Vegetarian";
import RandomFood from "./components/RandomFood/RandomFood";
import Intro from "./components/Intro/Intro";
import ForgotPassword from "./components/ForgetPassword/ForgotPassword";
import ResetPasword from "./components/ResetPasword/ResetPasword";
import Notfound from "./components/Notfound/Notfound";

let query = new QueryClient()
let routes = createBrowserRouter([
  {
    path:"",
    element: <Layout/>,
    children:[
      {index:true, element:<Home/>},
      {path:"random/:randomid", element:<RandomFood/>},
      {path:"intro", element:<Intro/>},
      { path: "forgotpassord", element: <ForgotPassword/> },
      { path: "resetPassword", element: <ResetPasword /> },
      {path: "categoryfood/:category", element:<FoodDetails/>},
      {path: "itemdetails/:iditem", element:<ItemDetails/>},
      {path: "login", element:<Login/>},
      {path: "register", element:<Register/>},
      {path: "seafood/:categorys", element:<Seafood/>},
      {path: "beef/:categoryb", element:<Beef/>},
      {path: "Breakfast/:categorybs", element:<Breakfast/>},
      {path: "Chiken/:categoryc", element:<Chiken/>},
      {path: "Dessert/:categoryd", element:<Dessert/>},
      {path: "Goat/:categoryg", element:<Goat/>},
      {path: "Lamb/:categoryl", element:<Lamb/>},
      {path: "Miscellaneos/:categorym", element:<Miscellaneos/>},
      {path: "Pasta/:categoryp", element:<Pasta/>},
      {path: "Pork/:categorypk", element:<Pork/>},
      {path: "Side/:categoryse", element:<Side/>},
      {path: "Strater/:categorysr", element:<Strater/>},
      {path: "Vegan/:categoryvn", element:<Vegan/>},
      {path: "Vegetarian/:categoryvan", element:<Vegetarian/>},
      {path:"*", element:<Notfound/>},
    ]
  }
])
function App() {
  return (
    <> 
    <UserContextProvider>
            <QueryClientProvider client={query}>
                <RouterProvider router={routes}></RouterProvider>
            </QueryClientProvider>
    </UserContextProvider>

    
    </>
  );
}

export default App;
