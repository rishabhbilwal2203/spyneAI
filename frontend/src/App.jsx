import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import AddCar from "./components/AddCar";
import EditCar from "./components/EditCar";


function App() {
  const location = useLocation();

  // Determine if the current route should show the Header
  const showHeader = location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <>
      {/* Conditionally render the Header */}
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/edit-car/:id" element={<EditCar/>}/>
        <Route path="/add-car" element={<AddCar />} />
      </Routes>
    </>
  );
}

export default App;
