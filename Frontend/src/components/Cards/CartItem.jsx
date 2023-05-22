import PropTypes from "prop-types";
const ProductItem = (props) => {
  const { name, description, price, image } = props.data;
  return (
    <div className="p-10 hover:shadow-2xl transition duration-500">
      <div className="max-w-sm rounded overflow-hidden">
        <img className="w-full" src={image} alt="Mountain" />
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <div className="font-bold text-3xl my-3"> ${price}</div>
        </div>
        <div className="flex justify-center">
          <button className="bg-lightPrimary hover:bg-white hover:text-primary hover:shadow-lg transition duration-500 text-secondary rounded-2xl border-black py-1 px-3 my-3">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ProductItem;
