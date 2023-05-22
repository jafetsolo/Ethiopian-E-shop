/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {createContext, useState, useEffect} from "react"

const GET_ALL_ITEMS_URL = "item/all";

export const StoreContext = createContext()

export const StoreContextProvider = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}${GET_ALL_ITEMS_URL}`,
          {
            params:{
              pageStart: 0
            }
          }
        );
        setItems(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const getDefaultCart = () => {
    const cart = {}
    for (let i = 0; i < items.length; i++){
      if (cart[items[i].id] === undefined){
        cart[items[i].id] = 0
      }
    }
    return cart
  }
  const [cartItems, setCartItems] = useState(getDefaultCart())
  const updateCartItems = () => {
    const cart = {}
    for (let i = 0; i < items.length; i++){
      if (cartItems[items[i].id] === undefined){
        cart[items[i].id] = 0
      } else {
        cart[items[i].id] = cartItems[items[i].id]
      }
    }
    return cart
  }
  useEffect(() => {
    setCartItems(updateCartItems())
  }, [items])

  const addToCart = (id) => {
    setCartItems((prev) => ({...prev, [id]: prev[id] + 1}))  
  }

  const removeFromCart = (id) => {
    if (cartItems[id] > 0){
      setCartItems((prev) => ({...prev, [id]: prev[id] - 1}))
    }
  }

  const resetCart = () => {
    setCartItems(getDefaultCart)
  }

  const getTotalCost = () => {
    var totalCost = 0
    items.map((item) => {
      totalCost += item.price * cartItems[item.id]
    })
    return totalCost
  }

  const contextValue = {cartItems, addToCart, removeFromCart, resetCart, getTotalCost, items, setItems}

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
