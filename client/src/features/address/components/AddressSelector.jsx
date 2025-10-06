import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AddressForm from "./AddressForm";
import { useDispatch } from "react-redux";
import { deleteAddress, getAddresses } from "../addressThunks";

const AddressSelector = ({ onSelect, selectedAddressId }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const toastId = toast.loading("Loading addresses...");

    const promise = dispatch(getAddresses());
    promise
      .unwrap()
      .then((response) => {
        setAddresses(response.data);
        toast.success("Addresses loaded successfully", { id: toastId });
      })
      .catch((error) => {
        console.log(error)
        if(error.name === "AbortError") {
          toast.error("Request aborted", { id: toastId });
        } else {
          toast.error(error, { id: toastId });
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      toast.dismiss(toastId);
      setLoading(false);
      promise?.abort?.();
    };
  }, []);

  const handleAddressAdded = (newAddress) => {
    setAddresses((prev) => [newAddress, ...prev]);
    setShowAddForm(false);
    // Auto-select the new address if it's the first one
    if (addresses.length === 0) {
      onSelect(newAddress._id);
    }
  };

  const handleAddressUpdated = (updatedAddress) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr
      )
    );
    setEditingAddress(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const toastId = toast.loading("Deleting address...");
      const promise = dispatch(deleteAddress(id));
      promise
        .unwrap()
        .then((response) => {
          if (response.status) {
            toast.success("Address deleted successfully", { id: toastId });
            setAddresses((prev) => prev.filter((addr) => addr._id !== id));
          }
        })
        .catch((error) => {
          toast.error(error, { id: toastId });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <div>Loading addresses...</div>
  }

  console.log(addresses)
  return (
    <div className="space-y-4">
      {!showAddForm && !editingAddress && (
        <div className="space-y-4">
          {addresses.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Select a delivery address</h3>
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`p-4 border rounded-lg cursor-pointer hover:border-indigo-500 ${
                    selectedAddressId === address._id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => onSelect(address._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{address.addressLine}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state}, {address.country} -{" "}
                        {address.zipcode}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {address.phone}
                      </p>
                      {address.isDefault && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingAddress(address);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(address._id);
                        }}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No addresses saved
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new address.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + Add New Address
          </button>
        </div>
      )}

      {showAddForm && (
        <div>
          <h3 className="text-lg font-medium mb-4">Add New Address</h3>
          <AddressForm
            onSuccess={handleAddressAdded}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {editingAddress && (
        <div>
          <h3 className="text-lg font-medium mb-4">Edit Address</h3>
          <AddressForm
            initialData={editingAddress}
            isEditing
            onSuccess={handleAddressUpdated}
            onCancel={() => setEditingAddress(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
