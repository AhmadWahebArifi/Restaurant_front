import { useEffect, useState } from "react";
import api from "../../axios";
import {Edit , Trash2} from "lucide-react";
import CustomerForm from "./CustomerForm";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-blue-950 dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/api/customer");
      setCustomers(response.data.data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      try {
        await api.delete(`/api/customer/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error("Failed to delete customer:", err);
      }
    }
  };

  return (
    <div className="p-6">
      
      {/* جدول مشتریان */}
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full text-sm text-gray-800 dark:text-white">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b text-cyan-50 border-gray-300">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.address}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setEditingCustomer(customer)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18}/>
                    </button>

                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-400 hover:text-red-300">
                   <Trash2 size={18} />
                      
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-5">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* مودال فرم ویرایش */}
      {editingCustomer && (
        <Modal onClose={() => setEditingCustomer(null)}>
          <CustomerForm
            customerToEdit={editingCustomer}
            onUpdateDone={() => {
              setEditingCustomer(null);
              fetchCustomers();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomerTable;
