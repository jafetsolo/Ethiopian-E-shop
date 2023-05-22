import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Profile,
  Login,
  Signup,
  Cart,
  Checkout,
  Orders,
  CreateAccount,
  CreateItem
} from "./components";
import { StoreContextProvider } from "./contexts/store-context";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth-context";
import Protected from "./utils/Protected";
import AdminProtected from "./utils/AdminProtected";
function App() {
  const {isLoggedIn, auth} = useContext(AuthContext)
  return (
    <div className="w-full">
      <StoreContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Protected isLoggedIn={isLoggedIn}><Home /></Protected>} />
            <Route path="/profile" element={<Protected isLoggedIn={isLoggedIn}><Profile /></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Protected isLoggedIn={isLoggedIn}><Cart /></Protected>} />
            <Route path="/checkout" element={<Protected isLoggedIn={isLoggedIn}><Checkout /></Protected>} />
            <Route path="/orders" element={<AdminProtected isLoggedIn={isLoggedIn} role={auth.roles[0]}><Orders /></AdminProtected>} />
            <Route path="/create-account" element={<AdminProtected isLoggedIn={isLoggedIn} role={auth.roles[0]}><CreateAccount /></AdminProtected>} />
            <Route path="/create-item" element={<AdminProtected isLoggedIn={isLoggedIn} role={auth.roles[0]}><CreateItem /></AdminProtected>} />
          </Routes>
        </Router>
      </StoreContextProvider>
    </div>
  );
}

export default App;
