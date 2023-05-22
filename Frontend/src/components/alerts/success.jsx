import { BsCheckCircle } from "react-icons/bs";

const success = () => {
  return (
    <div>
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <BsCheckCircle />
          </div>
          <div>
            <p className="font-bold">Sucess</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default success;
