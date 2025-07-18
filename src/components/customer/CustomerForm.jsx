import { useRef, useState, useEffect, useContext } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import { useTranslation } from "react-i18next";

const CustomerForm = ({ onCustomerAdded, customerToEdit, onUpdateDone }) => {
  const [t] = useTranslation();

  const nameInput = useRef();
  const PhoneInput = useRef();
  const AddressInput = useRef();
  const ctx = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // مقداردهی اولیه فرم هنگام ویرایش
  useEffect(() => {
    if (customerToEdit) {
      nameInput.current.value = customerToEdit.name || "";
      PhoneInput.current.value = customerToEdit.phone || "";
      AddressInput.current.value = customerToEdit.address || "";
      setMessage("");
    } else {
      if (nameInput.current) nameInput.current.value = "";
      if (PhoneInput.current) PhoneInput.current.value = "";
      if (AddressInput.current) AddressInput.current.value = "";
      setMessage("");
    }
  }, [customerToEdit]);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (!ctx.isLogin) {
      setMessage("Please login first.");
      return;
    }

    setLoading(true);
    setMessage("");

    const customerData = {
      name: nameInput.current.value,
      phone: PhoneInput.current.value,
      address: AddressInput.current.value,
    };

    try {
      if (customerToEdit) {
        // ویرایش مشتری
        const response = await api.put(`/api/customer/${customerToEdit.id}`, customerData);
        if (response.status === 200) {
          setMessage("Customer updated successfully!");
          if (onUpdateDone) onUpdateDone();
        } else {
          setMessage("Failed to update customer.");
        }
      } else {
        // افزودن مشتری جدید
        const response = await api.post("/api/customer", customerData);
        if (response.status === 201 || response.status === 200) {
          setMessage("Customer added successfully!");
          if (nameInput.current) nameInput.current.value = "";
          if (PhoneInput.current) PhoneInput.current.value = "";
          if (AddressInput.current) AddressInput.current.value = "";
          if (onCustomerAdded) onCustomerAdded();
        } else {
          setMessage("Failed to add customer.");
        }
      }
    } catch (error) {
      console.error("Error saving customer:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={SubmitHandler}>
      <div className="flex flex-wrap">
        <div className="p-5">
          <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
            {t("name")}
          </label>
          <input
            ref={nameInput}
            type="text"
            placeholder="Enter full name"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
            {t("phone")}
          </label>
          <input
            ref={PhoneInput}
            type="text"
            placeholder="Enter Phone number"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
            {t("address")}
          </label>
          <input
            ref={AddressInput}
            type="text"
            placeholder="Enter Address"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
      </div>

      {message && (
        <div
          className={`px-5 py-2 rounded-lg ${
            message.includes("successfully")
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
        {loading
          ? customerToEdit
            ? t("updating")
            : t("adding")
          : customerToEdit
          ? t("updatecustomer")
          : t("addcustomer")}
      </button>
    </form>
  );
};

export default CustomerForm;
