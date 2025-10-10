import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../src/models/user.model.js";
import Category from "../src/models/category.model.js";
import Food from "../src/models/food.model.js";

// Load environment variables
dotenv.config({ path: "./src/.env" });

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Food.deleteMany({});
    console.log("Cleared existing data");
  } catch (err) {
    console.error("Error clearing data:", err);
    process.exit(1);
  }
};

// Seed users
const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash("@Test123", 10);

  const users = [
    {
      fullname: "Admin User",
      username: "admin",
      email: "admin@foodieexpress.com",
      password: hashedPassword,
      role: "admin",
      phoneNumber: "+1234567890",
      isVerified: true,
    },
    {
      fullname: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: hashedPassword,
      phoneNumber: "+1987654321",
      isVerified: true,
    },
    {
      fullname: "Kamal Melkani",
      username: "rockmel03",
      email: "rockmel03@test.com",
      password: hashedPassword,
      phoneNumber: "+1987654321",
      isVerified: true,
    },
  ];

  try {
    const createdUsers = await User.insertMany(users);
    console.log("Seeded users");
    return createdUsers;
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

// Seed categories
const seedCategories = async () => {
  const categories = [
    {
      title: "pizza",
      description: "Delicious Italian-style pizzas with various toppings",
      image: {
        url: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
        fileId: "pizza123",
      },
      isActive: true,
    },
    {
      title: "burger",
      description: "Juicy burgers with fresh ingredients",
      image: {
        url: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg",
        fileId: "burger123",
      },
      isActive: true,
    },
    {
      title: "sushi",
      description: "Fresh and delicious Japanese sushi",
      image: {
        url: "https://images.pexels.com/photos/1052189/pexels-photo-1052189.jpeg",
        fileId: "sushi123",
      },
      isActive: true,
    },
  ];

  try {
    const createdCategories = await Category.insertMany(categories);
    console.log("Seeded categories");
    return createdCategories;
  } catch (err) {
    console.error("Error seeding categories:", err);
    process.exit(1);
  }
};

// Seed food items
const seedFoods = async (categories) => {
  const foods = [
    {
      title: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      discount: 0,
      categoryId: categories[0]._id,
      image: {
        url: "https://images.pexels.com/photos/19681747/pexels-photo-19681747.jpeg",
        fileId: "margherita123",
      },
      isActive: true,
    },
    {
      title: "Cheeseburger",
      description: "Beef patty with cheese, lettuce, and special sauce",
      price: 8.99,
      discount: 1.0,
      categoryId: categories[1]._id,
      image: {
        url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        fileId: "cheeseburger123",
      },
      isActive: true,
    },
    {
      title: "California Roll",
      description: "Crab, avocado, and cucumber roll with sesame seeds",
      price: 10.99,
      discount: 0,
      categoryId: categories[2]._id,
      image: {
        url: "https://images.pexels.com/photos/34227780/pexels-photo-34227780.jpeg",
        fileId: "caliroll123",
      },
      isActive: true,
    },
    {
      title: "Pepperoni Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and pepperoni",
      price: 14.99,
      discount: 2.0,
      categoryId: categories[0]._id,
      image: {
        url: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg",
        fileId: "pepperoni123",
      },
      isActive: true,
    },
  ];

  try {
    await Food.insertMany(foods);
    console.log("Seeded food items");
  } catch (err) {
    console.error("Error seeding food items:", err);
    process.exit(1);
  }
};

// Main function to run all seeders
const seedDatabase = async () => {
  try {
    await connectDB();
    await clearData();
    await seedUsers();
    const categories = await seedCategories();
    await seedFoods(categories);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
