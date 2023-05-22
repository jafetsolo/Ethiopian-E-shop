import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const REGISTER_URL = "auth/signup";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setlastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleImageChange = () => {
    setImage(document.getElementById("image").files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData()
    data.append("firstName", firstName)
    data.append("lastName", lastName)
    data.append("email", email)
    data.append("password", password)
    data.append("image", image)
    data.append("role", "user")
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}${REGISTER_URL}`, 
        data, 
        {headers: { 'Content-Type': 'multipart/form-data' }}
      );

      // eslint-disable-next-line no-constant-condition
        navigate("/login")
    } catch (error) {
      console.log("auth error: ", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="py-3 w-30p px-10 overflow-y-auto rounded-2xl shadow-md box-border bg-[#d6dce9]"
        onSubmit={handleClick}
      >
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="my-2">
            <label className="block my-2">First Name</label>
            <input
              className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
              placeholder="First name"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="my-2">
            <label className="block my-2">last Name</label>
            <input
              className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
              placeholder="last name"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
        </div>
        <div className="my-2">
          <label className="block my-2">Email</label>
          <input
            className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="my-2">
          <label className="block my-2">Password</label>
          <input
            className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="my-2">
          <label className="block my-2">Confirm Password</label>
          <input
            className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="my-2">
            <label className="block my-2">Image</label>
            <input
              id="image"
              className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        <button className="py-2 px-5 my-3 text-secondary rounded-md w-100p bg-lightPrimary hover:bg-darkPrimary">
          Sign up
        </button>
        <p className="my-3 text-center">
          Already have an account?{" "}
          <Link to="/login">
            {" "}
            <span className="text-blue">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
