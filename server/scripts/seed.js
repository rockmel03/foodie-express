import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import User from "../src/models/user.model.js";
import Category from "../src/models/category.model.js";
import Food from "../src/models/food.model.js";

dotenv.config({ path: "./src/.env" });

const __dirname = path.resolve();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected...");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const clearData = async () => {
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Food.deleteMany({})
  ]);
  console.log("🧹 Cleared existing data");
};

const seedUsers = async () => {
  const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, "data/users.json"), "utf-8"));
  const hashedPassword = await bcrypt.hash("@Test123", 10);
  const users = usersData.map(user => ({
    ...user,
    password: hashedPassword
  }));

  const createdUsers = await User.insertMany(users);
  console.log("👤 Seeded users");
  return createdUsers;
};

const seedCategories = async () => {
  const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, "data/categories.json"), "utf-8"));
  const createdCategories = await Category.insertMany(categoriesData);
  console.log("📦 Seeded categories");
  return createdCategories;
};

const seedFoods = async (categories) => {
  const foodsData = JSON.parse(fs.readFileSync(path.join(__dirname, "data/foods.json"), "utf-8"));

  // Map category name to _id
  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.title] = cat._id;
  });

  const foods = foodsData.map(food => ({
    ...food,
    categoryId: categoryMap[food.category]
  }));

  await Food.insertMany(foods);
  console.log("🍕 Seeded food items");
};

const seedDatabase = async () => {
  try {
    await connectDB();
    await clearData();
    await seedUsers();
    const categories = await seedCategories();
    await seedFoods(categories);
    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
