const PaymentForm = () => {
  return (
    <div>
      <p className="py-5 font-semibold text-2xl">Card Details</p>
      <input
        className="w-100p border-2 bg-grey p-4 rounded-md"
        placeholder="1234 5678 XXXX XXXX"
      />
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <input
            className="w-100p border-2 bg-grey p-4 rounded-md"
            placeholder="03/26"
          />
        </div>
        <div>
          <input
            className="w-100p border-2 bg-grey p-4 rounded-md"
            placeholder="CVS"
          />
        </div>
      </div>
      
    </div>
  );
};

export default PaymentForm;
