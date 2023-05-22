/* eslint-disable no-unused-vars */
import { useContext } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { StoreContext } from "../../contexts/store-context";
import { items } from "../../api/Items";
import PaymentForm from "./PaymentForm";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const ORDER_URL = "order"

const Checkout = () => {
  const { cartItems, getTotalCost, resetCart } = useContext(StoreContext);
  const navigate = useNavigate()
  const {auth} = useContext(AuthContext)

  const handleClick = async (e) => {
    e.preventDefault()
    var allItems = items.map((item) => {
      if (cartItems[item.id] > 0){
        return {
          item : item.id,
          quantity: cartItems[item.id]
        }
      }else{
        return null
      }
    })

    const checkItem = (item) => {
      if (item === null){
        return false
      }
      return true
    }
    const filterAllItems = () => {
      const tempAllItems = allItems.filter(checkItem)
      return tempAllItems
    }
    
    allItems = filterAllItems()
    
    const data = {
      orderedBy: auth.id,
      items: allItems
    }
    try {
      
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}${ORDER_URL}`,
        data)

      // console.log(response.data)
      resetCart()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <p className="text-4xl mt-10 font-bold">Payment</p>
      </div>
      <div className="w-50p shadow-xl mx-auto mt-10 mb-10 p-5 divide-y">
        <div className="">
          <p className="font-semibold text-2xl my-5">Order Summary</p>
          {items.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <div key={item.id} className="my-3">
                  <p className="font-semibold text-lg my-2">{item.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-base">
                      Quantity: {cartItems[item.id]}
                    </p>
                    <p className="font-bold text-xl">
                      ${cartItems[item.id] * item.price}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="font-bold text-2xl my-7 py-4 flex justify-between">
          <p>Total:</p>
          <div>${getTotalCost()}</div>
        </div>
        <div>
          <PaymentForm />
          <div className="flex justify-center">
            <button className="py-4 px-16 bg-lightPrimary text-secondary hover:bg-white hover:border-lightPrimary hover:border-2 hover:text-blue transition duration-500 my-3 rounded-lg" onClick={handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
