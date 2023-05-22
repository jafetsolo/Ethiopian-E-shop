import axios from "axios";
import { useContext, useState } from "react";
import { StoreContext } from "../../contexts/store-context";
import Navbar from "../Navbar/Navbar";
import Items from "./Items";

const GET_SEARCH_ITEMS_URL = "item/all";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setItems } = useContext(StoreContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}${GET_SEARCH_ITEMS_URL}`,
        {
          params: {
            searchQuery: searchTerm,
            pageStart: 0,
          },
        }
      );
      setItems(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-10">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <input
              className="w-[400px] py-5 px-5 border-2 border-darkGrey bg-white rounded-2xl"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
            />
            <button className="border-lightGrey rounded-2xl bg-darkPrimary text-secondary hover:border-darkPrimary hover:text-blue hover:bg-white hover:border-2 transition duration-500 hover:m-0 px-5">
              Search
            </button>
          </div>
        </form>
      </div>
      <Items className="mt-5 mb-10" />
      <div className="mt-5"></div>
    </div>
  );
};

export default Home;
