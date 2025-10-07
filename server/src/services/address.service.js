import mongoose from "mongoose";
import Address from "../models/address.model.js";
import ApiError from "../utils/ApiError.js";

export const getAddressById = async (addressId) => {
  const address = await Address.findOne({ _id: addressId });
  if (!address) {
    throw new ApiError(400, "Invalid address");
  }

  return address;
};

export const getAddresses = async ({ userId }) => {
  try {
    const addresses = await Address.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return addresses;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

export const addAddress = async ({ userId, address }) => {
  const session = await mongoose.startSession();
  const useTransactions = process.env.NODE_ENV === "production";

  if (useTransactions) {
    session.startTransaction();
  }

  try {
    const {
      addressLine,
      phone,
      street,
      city,
      state,
      country,
      zipcode,
      isDefault,
    } = address;

    // If setting as default, unset any existing default address
    if (isDefault) {
      await Address.updateMany(
        { userId, isDefault: true },
        { $set: { isDefault: false } },
        useTransactions ? { session } : {}
      );
    }

    const newAddress = new Address({
      userId,
      addressLine,
      phone,
      street,
      city,
      state,
      country,
      zipcode,
      isDefault: isDefault || false,
    });

    await newAddress.save(useTransactions ? { session } : {});

    if (useTransactions) {
      await session.commitTransaction();
      session.endSession();
    }

    return newAddress;
  } catch (error) {
    if (useTransactions) {
      await session.abortTransaction();
      session.endSession();
    }
    throw new ApiError(400, error.message);
  }
};

export const updateAddress = async ({ userId, addressId: id, address }) => {
  const session = await mongoose.startSession();
  const useTransactions = process.env.NODE_ENV === "production";

  if (useTransactions) {
    session.startTransaction();
  }

  try {
    const { isDefault, ...updateData } = address;

    // If setting as default, unset any existing default address
    if (isDefault) {
      await Address.updateMany(
        { userId, isDefault: true, _id: { $ne: id } },
        { $set: { isDefault: false } },
        { session }
      );
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, userId },
      { ...updateData, isDefault: isDefault || false },
      { new: true, session }
    );

    if (!updatedAddress) {
      throw new Error("Address not found or unauthorized");
    }

    if (useTransactions) {
      await session.commitTransaction();
      session.endSession();
    }
    return updatedAddress;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400, error.message);
  }
};

export const deleteAddress = async ({ userId, addressId }) => {
  try {
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      throw new Error("Address not found or unauthorized");
    }

    return deletedAddress;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
