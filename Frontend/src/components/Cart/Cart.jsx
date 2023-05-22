import { useContext } from "react";
import { Link } from "react-router-dom";
import { items } from "../../api/Items";
import ProductItem from "../Cards/ProductItem";
import Navbar from "../Navbar/Navbar";
import { StoreContext } from "../../contexts/store-context";

const Cart = () => {
  const { cartItems, resetCart } = useContext(StoreContext);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-10 text-4xl font-bold">
        <h2> All Cart Items </h2>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4 mt-10">
          {items.map((item) => {
            if (cartItems[item.id] > 0) {
              return <ProductItem data={item} key={item.id} />;
            }
          })}
        </div>
      </div>
      <div className="flex justify-center my-10 gap-6">
        <Link to="/">
          <button
            className="py-3 px-8 bg-red hover:bg-white hover:border-2 transition duration-500 hover:border-red hover:text-red text-secondary rounded-xl"
            onClick={() => resetCart()}
          >
            Cancel
          </button>
        </Link>
        <Link to="/checkout">
          <button className="py-3 px-8 bg-lightPrimary hover:bg-white hover:border-2 transition duration-500 hover:border-lightPrimary hover:text-blue text-secondary rounded-xl">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
