import { useContext } from "react";
import ProductItem from "../Cards/ProductItem";
import { StoreContext } from "../../contexts/store-context";


const Items = () => {
  const {items} = useContext(StoreContext)

  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      {items.map((data, index) => {
        return <ProductItem key={index} data={data} />;
      })}
    </div>
  );
};

export default Items;
