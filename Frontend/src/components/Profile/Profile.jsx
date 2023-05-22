import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const UPDATE_URL = "auth/edit";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  const [email, setEmail] = useState(auth.email);
  const [image, setImage] = useState(auth.image);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
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

    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("image", image);
    data.append("role", auth.role);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}${UPDATE_URL}`,
        data,
        { 
          headers: { "Content-Type": "multipart/form-data" },
          params: {
            id: auth.id
          }
        },
      );

      // eslint-disable-next-line no-constant-condition
      navigate("/login");
    } catch (error) {
      console.log("auth error: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <p className="text-4xl my-10 font-bold">Profile</p>
      </div>
      <div className="flex justify-center ml-10 mt-10">
        <form
          className="py-3 w-30p px-10 mb-10 overflow-y-auto rounded-2xl shadow-xl box-border bg-[#d6dce9]"
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
              <label className="block my-2">Second Name</label>
              <input
                className="box-border shadow py-2 px-5 rounded-md w-100p placeholder:font-medium"
                placeholder="Second name"
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
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
