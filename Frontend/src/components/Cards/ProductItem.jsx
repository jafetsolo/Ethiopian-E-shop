import PropTypes from "prop-types";
import { useContext } from "react";
import { StoreContext } from "../../contexts/store-context";
import {BsCartPlusFill, BsFillCartDashFill} from "react-icons/bs"

const ProductItem = (props) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const { id, name, description, price, image } = props.data;

  return (
    <div className="p-5 shadow-xl hover:shadow-2xl transition duration-500">
      <div className="w-100p rounded overflow-hidden">
        <img className="w-100p h-[200px] bg-cover" src={image} alt={name} />
        <div className="px-3 py-4">
          <div className="font-bold text-2xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <div className="font-bold text-3xl my-3"> ${price}</div>
        </div>
        <div className="flex font-bold justify-between">
          <BsFillCartDashFill style={{fontSize: "35px", cursor: "pointer"}} onClick={() => removeFromCart(id)}/>
          <p>Quantity: {cartItems[id]}</p>
          <BsCartPlusFill style={{fontSize: "35px", cursor: "pointer"}} onClick={() => addToCart(id)}/>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ProductItem;
