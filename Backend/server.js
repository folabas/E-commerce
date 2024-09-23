require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./models/User");
const Address = require("./models/Address");
const Seller = require("./models/Seller");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const Cart = require("./models/Carts");
const Product = require("./models/Product");
const Message = require("./models/Message");

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Function to setup Nodemailer transporter dynamically
const createTransporter = (emailUser, emailPass) => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

const sendSignupEmail = async (userEmail, userName, emailUser, emailPass) => {
  try {
    const transporter = createTransporter(emailUser, emailPass);

    const mailOptions = {
      from: emailUser,
      to: userEmail,
      subject: "Welcome to Our Service!",
      text: `Hi ${userName},\n\nThank you for signing up. We're excited to have you onboard!`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Signup email sent successfully");
  } catch (error) {
    console.error("Error sending signup email:", error.message);
  }
};


// Add the /api/auth/refresh-token route
app.post("/api/auth/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Find the user associated with the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: user._id, sellerId: user.sellerId },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

// POST /api/auth/signup route
app.post("/api/auth/signup", async (req, res) => {
  console.log("Received signup request data:", req.body);
  const { email, password, name, surname, emailUser, emailPass } = req.body;

  try {
    // Check for missing fields
    if (!email || !password || !name || !surname) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({ email, password, name, surname });
    await user.save();
    console.log("User saved:", user);

    // Send signup email
    if (emailUser && emailPass) {
      await sendSignupEmail(email, name, emailUser, emailPass);
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/auth/login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate access token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7h', // Set access token expiration
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d', // Set refresh token expiration
    });

    // Optionally: Store the refresh token in the database if required
    user.refreshToken = refreshToken; // Save refresh token to the user record
    await user.save();

    // Send both access and refresh tokens, along with user information, to the frontend
    res.status(200).json({
      accessToken,
      refreshToken,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});




app.post('/api/auth/store-token', authMiddleware, async (req, res) => {
  const { token } = req.body;
  const userId = req.user.id;

  try {
    // Find the user by ID and update the token field
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.token = token; 
    await user.save();

    res.status(200).json({ message: 'Token stored successfully' });
  } catch (error) {
    console.error('Error storing token:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



// GET /api/auth/profile - Get user's profile including seller status
app.get("/api/auth/profile", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    console.log("Fetching profile for userId:", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the user object to verify its state
    console.log("Fetched user data:", user);

    res.status(200).json({
      name: user.name,
      email: user.email,
      isSeller: !!user.isSeller,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



// POST /api/address - Save an address
app.post("/api/address", authMiddleware, async (req, res) => {
  const { name, phoneNumber, street, postalCode, city, state, country } =
    req.body;
  const userId = req.user.id;

  try {
    const address = new Address({
      user: userId,
      name,
      phoneNumber,
      street,
      postalCode,
      city,
      state,
      country,
    });

    await address.save();
    res.status(201).json({ message: "Address saved successfully", address });
  } catch (error) {
    console.error("Error saving address:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/address - Get all addresses for the user
app.get("/api/address", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const addresses = await Address.find({ user: userId });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error retrieving addresses:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/address/:id - Update an address
app.put("/api/address/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    let address = await Address.findOne({ _id: id, user: userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const updatedData = req.body;
    address = await Address.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error("Error updating address:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/address/:id - Delete an address
app.delete("/api/address/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const address = await Address.findOneAndDelete({ _id: id, user: userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/sellers - Create a seller account
app.post("/api/sellers", async (req, res) => {
  const {
    businessName,
    businessEmail,
    yearInBusiness,
    phoneNumber,
    businessDescription,
    nin,
    socialMedia,
    userEmail, // Include userEmail to update user status
  } = req.body;

  if (!businessEmail || !businessEmail.trim()) {
    return res.status(400).json({ message: "Business email is required." });
  }

  try {
    const existingSeller = await Seller.findOne({ businessEmail });
    if (existingSeller) {
      return res
        .status(400)
        .json({ message: "A seller with this email already exists." });
    }

    const seller = new Seller({
      businessName,
      businessEmail,
      yearInBusiness,
      phoneNumber,
      businessDescription,
      nin,
      socialMedia,
    });

    await seller.save();

    // Update user's seller status
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.isSeller = true; // Set the seller status to true
      user.sellerId = seller._id; // Associate the seller with the user
      await user.save();

      // Generate a new token for the user after updating
      const token = jwt.sign({ id: user._id, sellerId: seller._id }, process.env.JWT_SECRET, {
        expiresIn: "7h",
      });

      return res.status(201).json({
        message: "Seller account created successfully",
        seller,
        user: { ...user.toObject(), sellerId: seller._id },
        token, // Include token in response
      });
    }

    res.status(201).json({ message: "Seller account created successfully", seller });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate key error: " + error.message });
    }
    console.error("Error creating seller account:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// GET /api/sellers/:id - Get a seller's details by ID
app.get("/api/sellers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find seller by ID
    const seller = await Seller.findById(id);
    
    // If seller is not found
    if (!seller) {
      console.log(`Seller with ID ${id} not found`);
      return res.status(404).json({ message: "Seller not found" });
    }

    // Log the seller details
    console.log("Retrieved seller details:", seller);

    // Respond with seller details
    res.status(200).json(seller);
  } catch (error) {
    console.error("Error retrieving seller:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /api/sellers/:id - Update a seller's details
app.put("/api/sellers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = req.body;
    const seller = await Seller.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json({ message: "Seller updated successfully", seller });
  } catch (error) {
    console.error("Error updating seller:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/sellers/:id - Delete a seller's account
app.delete('/api/sellers/:id', async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Find and update the associated user
    const user = await User.findOne({ email: seller.businessEmail });
    if (user) {
      user.isSeller = false;
      user.sellerId = null; // Clear sellerId
      await user.save();
    }

    res.status(200).json({ message: 'Seller account deleted successfully' });
  } catch (error) {
    console.error('Error deleting seller account:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get("/api/cart", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/cart - Add an item to the cart
app.post("/api/cart", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/cart/:productId - Update the quantity of an item
app.put("/api/cart/:productId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating item quantity:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/cart/:productId - Remove an item from the cart
app.delete("/api/cart/:productId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



// Create products
// POST /api/products - Create a new product
app.post('/api/products', authMiddleware, async (req, res) => {
  const { productName, price, sku, description, weight, currency, category, variants, images, status } = req.body;

  // Extract sellerId from the authenticated user
  const sellerId = req.user.id;

  if (!sellerId) {
    return res.status(400).json({ message: 'Seller ID is required' });
  }

  try {
    const product = new Product({
      productName,
      price,
      sku,
      description,
      weight,
      currency,
      category,
      variants,
      images,
      status,
      sellerId, // Include sellerId when creating the product
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products - Get products for a specific seller or all products
app.get("/api/products", authMiddleware, async (req, res) => {
  try {
    let products;

    // Check if the user is a seller
    if (req.user.isSeller) {
      products = await Product.find({ sellerId: req.user.sellerId }); // Fetch only the seller's products
    } else {
      products = await Product.find(); // Fetch all products
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /api/products/:id - Update a product by its ID
app.put("/api/products", async (req, res) => {
  const updatedData = req.body;

  try {
    const { filter, update } = updatedData;
    const result = await Product.updateMany(filter, update, { new: true });

    res.status(200).json({ message: "Products updated successfully", result });
  } catch (error) {
    console.error("Error updating products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/products/:id - Delete a single product by its ID
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/messages/:productId/:userId
app.get(
  "/api/messages/:productId/:userId",
  authMiddleware,
  async (req, res) => {
    const { productId, userId } = req.params;

    try {
      const messages = await Message.find({
        productId,
        $or: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id },
        ],
      }).populate("senderId receiverId", "name email");

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/messages
app.post("/api/messages", authMiddleware, async (req, res) => {
  const { receiverId, productId, message } = req.body;

  if (!receiverId || !productId || !message) {
    return res
      .status(400)
      .json({ message: "Receiver ID, product ID, and message are required" });
  }

  try {
    const newMessage = new Message({
      senderId: req.user.id,
      receiverId,
      productId,
      message,
    });

    await newMessage.save();
    res
      .status(201)
      .json({ message: "Message sent successfully", message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
