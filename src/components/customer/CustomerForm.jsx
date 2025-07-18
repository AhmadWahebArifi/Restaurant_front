import { useRef, useState, useContext } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import { useTranslation } from "react-i18next";

const CustomerForm = ({ onCustomerAdded }) => {
  const [t] = useTranslation();

  const nameInput = useRef();
  const PhoneInput = useRef();
  const AddressInput = useRef();
  const ctx = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!ctx.isLogin) {
      setMessage("Please login first to add customers.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const customerData = {
        name: nameInput.current.value,
        phone: PhoneInput.current.value,
        address: AddressInput.current.value,
      };

      // Make API call to save customer
      const response = await api.post("/api/customer", customerData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Customer added successfully!");
        // Clear form fields
        nameInput.current.value = "";
        PhoneInput.current.value = "";
        AddressInput.current.value = "";

        // Notify parent component to refresh the table
        if (onCustomerAdded) {
          onCustomerAdded();
        }
      } else {
        setMessage("Failed to add customer. Please try again.");
      }
    } catch (error) {
      console.log("Error saving customer:", error.response?.data);
      console.log("Error status:", error.response?.status);
      console.log("Error headers:", error.response?.headers);
      console.log("Full error:", error);
      setMessage("Failed to add customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const editHandler = (id) => {
    console.log('Edit incoming'); // or combine both logs
  };

  return (
    <form method="post" onSubmit={SubmitHandler}>
      <div className="flex flex-wrap">
        <div className="p-5">
          <label
            htmlFor="name"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("name")}
          </label>
          <input
            ref={nameInput}
            type="text"
            name="name"
            placeholder="Enter full name"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="Phone"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("phone")}
          </label>
          <input
            ref={PhoneInput}
            type="text"
            name="Phone"
            placeholder="Enter Phone number"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="Address"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("address")}
          </label>
          <input
            ref={AddressInput}
            type="text"
            name="Address"
            placeholder="Enter Address"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
      </div>

      {message && (
        <div
          className={`px-5 py-2 rounded-lg ${message.includes("successfully")
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex m-12 rounded-full border border-transparent bg-blue-950 px-7 py-3 text-center text-base font-medium text-white shadow-1 hover:bg-blue-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:bg-gray-2 dark:shadow-box-dark dark:hover:bg-dark-3"
      >
        <span className="pr-[10px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            <g clipPath="url(#clip0_906_8052)">
              <path d="M13.1875 9.28125H10.6875V6.8125C10.6875 6.4375 10.375 6.125 9.96875 6.125C9.59375 6.125 9.28125 6.4375 9.28125 6.84375V9.3125H6.8125C6.4375 9.3125 6.125 9.625 6.125 10.0312C6.125 10.4062 6.4375 10.7187 6.84375 10.7187H9.3125V13.1875C9.3125 13.5625 9.625 13.875 10.0312 13.875C10.4062 13.875 10.7187 13.5625 10.7187 13.1562V10.6875H13.1875C13.5625 10.6875 13.875 10.375 13.875 9.96875C13.875 9.59375 13.5625 9.28125 13.1875 9.28125Z" />
              <path d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.8125 19.4688 10.0312 19.4688C15.25 19.4688 19.5 15.2188 19.5 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.5625 18.0625 10C18.0625 14.4375 14.4375 18.0625 10 18.0625Z" />
            </g>
            <defs>
              <clipPath id="clip0_906_8052">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        {loading ? `${t("adding")}` : `${t("addcustomer")}`}
      </button>
    </form>
  );
};
export default CustomerForm;
