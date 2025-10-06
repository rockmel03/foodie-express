// components/AddressForm.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAddress, updateAddress } from "../addressThunks";

const AddressForm = ({ onSuccess, initialData, isEditing = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      addressLine: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "India",
      zipcode: "",
      isDefault: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Processing...");
    try {
      let promise;
      if (isEditing) {
        promise = dispatch(updateAddress(data));
      } else {
        promise = dispatch(addAddress(data));
      }

      const response = await promise.unwrap();
      toast.success(
        isEditing
          ? "Address updated successfully"
          : "Address added successfully",
        { id: toastId }
      );

      onSuccess?.(response.data);
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address Line*
        </label>
        <input
          type="text"
          {...register("addressLine", { required: "Address line is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.addressLine && (
          <p className="text-red-500 text-xs mt-1">
            {errors.addressLine.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone*
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit phone number",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            {...register("city")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            {...register("state")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            {...register("country")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            {...register("zipcode", {
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Please enter a valid 6-digit ZIP code",
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.zipcode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.zipcode.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isDefault"
          type="checkbox"
          {...register("isDefault")}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
          Set as default address
        </label>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditing ? "Update Address" : "Add Address"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
