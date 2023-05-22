/* eslint-disable react/no-children-prop */
import { useContext } from "react";
import Dropdown from "../dropdown";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { BsCart } from "react-icons/bs";
import { AuthContext } from "../../contexts/auth-context";
const Navbar = () => {
  const navigate = useNavigate();

  const { auth, setAuth, setIsLoggedIn, resetAuth, resetIsLoggedIn } = useContext(AuthContext);
  const handleLogout = (e) => {
    e.preventDefault();
    setAuth(resetAuth);
    setIsLoggedIn(resetIsLoggedIn);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 py-5 flex flex-row flex-wrap items-center justify-between backdrop-blur-xl shadow-xl">
      <div className="ml-7">
        <Link to="/" className="flex ml-2 md:mr-24">
          <img src={logo} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
            Ethiopian Ingredient Store
          </span>
        </Link>
      </div>

      <div></div>

      <div className="flex mr-7">
        <Link to="/cart">
          <BsCart
            style={{ fontSize: "40px", marginRight: "50px", cursor: "pointer" }}
          />
        </Link>
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={auth.image}
              alt="profile"
            />
          }
          children={
            <div className="flex py-3 mt-8 right-0 pr-10 flex-col justify-start rounded-[20px] bg-grey font-bold bg-cover bg-no-repeat shadow-xl shadow-shadow-500 ">
              <div className="mt-3 ml-4 flex flex-col">
                <Link to="/profile">
                  <h5 className="my-2 text-primary">Profile</h5>
                </Link>
                {auth.roles[0] === "ROLE_ADMIN" && (
                  <Link to="/orders">
                    <h5 className="my-2 text-primary">Orders</h5>
                  </Link>
                )}
                {auth.roles[0] === "ROLE_ADMIN" && (
                  <Link to="/create-account">
                    <h5 className="my-2 text-primary">Create Account</h5>
                  </Link>
                )}
                {auth.roles[0] === "ROLE_ADMIN" && (
                  <Link to="/create-item">
                    <h5 className="my-2 text-primary">Create Item</h5>
                  </Link>
                )}
                <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-500 dark:opacity-50" />
                <button onClick={handleLogout}>
                  <h5 className="my-2 text-red">
                    Logout
                  </h5>
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
