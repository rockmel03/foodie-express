import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as addressService from "../services/address.service.js";

export const addAddress = asyncHandler(async (req, res) => {
  const {
    addressLine,
    phone,
    street,
    city,
    state,
    country,
    zipcode,
    isDefault,
  } = req.body;
  const userId = req.user._id;

  const newAddress = await addressService.addAddress({
    userId,
    address: {
      addressLine,
      phone,
      street,
      city,
      state,
      country,
      zipcode,
      isDefault,
    },
  });

  res
    .status(201)
    .json(ApiResponse.success(newAddress, "Address added successfully"));
});

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await addressService.getAddresses({
    userId: req.user._id,
  });

  res
    .status(200)
    .json(ApiResponse.success(addresses, "Addresses fetched successfully"));
});

// Update an address
export const updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isDefault, ...updateData } = req.body;
  const userId = req.user._id;

  const updatedAddress = await addressService.updateAddress({
    userId,
    addressId: id,
    address: {
      isDefault,
      ...updateData,
    },
  });

  res
    .status(200)
    .json(ApiResponse.success(updatedAddress, "Address updated successfully"));
});

// Delete an address
export const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const deletedAddress = await addressService.deleteAddress({
    userId,
    addressId: id,
  });

  res
    .status(200)
    .json(ApiResponse.success(deletedAddress, "Address deleted successfully"));
});
