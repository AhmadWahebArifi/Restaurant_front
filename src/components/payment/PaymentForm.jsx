import { useRef, useState, useContext } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import { useTranslation } from "react-i18next";

const PaymentForm = ({ onCustomerAdded }) => {
    const [t] = useTranslation();

    const amountInput = useRef();
    const PhoneInput = useRef();
    const AddressInput = useRef();
    const ctx = useContext(authContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // Populate form when editing customer
    if (editingCustomer && !isEditing) {
        amountInput.current.value = editingCustomer.name || "";
        PhoneInput.current.value = editingCustomer.phone || "";
        AddressInput.current.value = editingCustomer.address || "";
        setIsEditing(true);
    }

    const clearForm = () => {
        amountInput.current.value = "";
        PhoneInput.current.value = "";
        AddressInput.current.value = "";
        setIsEditing(false);
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();

        if (!ctx.isLogin) {
            setError("Please login first to add customers.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const customerData = {
                name: amountInput.current.value,
                phone: PhoneInput.current.value,
                address: AddressInput.current.value,
            };

            let response;
            if (isEditing && editingCustomer) {
                // Update existing customer
                response = await api.put(`/api/customer/${editingCustomer.id}`, customerData);
            } else {
                // Create new customer
                response = await api.post("/api/customer", customerData);
            }

            if (response.status === 201 || response.status === 200) {
                clearForm();
                if (onCustomerAdded) {
                    onCustomerAdded();
                }
            } else {
                setError(`Failed to ${isEditing ? 'update' : 'add'} customer. Please try again.`);
            }
        } catch (error) {
            setError(`Failed to ${isEditing ? 'update' : 'add'} customer. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!editingCustomer || !editingCustomer.id) {
            setError("No customer selected for deletion.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this customer?")) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.delete(`/api/customer/${editingCustomer.id}`);

            if (response.status === 200 || response.status === 204) {
                clearForm();
                if (onCustomerAdded) {
                    onCustomerAdded();
                }
            } else {
                setError("Failed to delete customer. Please try again.");
            }
        } catch (error) {
            setError("Failed to delete customer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        clearForm();
        if (onCancelEdit) {
            onCancelEdit();
        }
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
                        ref={amountInput}
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

            {error && (
                <div className="px-5 py-2 rounded-lg bg-red-100 text-red-800">
                    {error}
                </div>
            )}

            <div className="flex gap-4 m-12">
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex rounded-full border border-transparent bg-blue-950 px-7 py-3 text-center text-base font-medium text-white shadow-1 hover:bg-blue-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:bg-gray-2 dark:shadow-box-dark dark:hover:bg-dark-3"
                >
                    <span className="pr-[10px] flex items-center">
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
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
                        )}
                    </span>
                    {loading ? `${t("adding")}` : isEditing ? "Update Customer" : `${t("addcustomer")}`}
                </button>

                {isEditing && (
                    <>
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="inline-flex rounded-full border border-gray-600 bg-transparent px-7 py-3 text-center text-base font-medium text-gray-300 shadow-1 hover:bg-gray-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};
export default PaymentForm;
