import "./App.css";

import { useState, useContext, useEffect } from "react";

import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import products from "./data/products.js";

import { CartContext } from "./contexts/CartContext.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";

/* =========================
   HOME PAGE
========================= */

function Home() {

  const { addToCart } = useContext(CartContext);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-subtitle">
            WELCOME TO SHOPEASE
          </p>

          <h1>
            Shop Everything, <br />
            <span>Anywhere.</span>
          </h1>

          <p>
            Discover products with fast delivery,
            easy returns, and unbeatable prices.
          </p>

          <div className="hero-buttons">

            <Link to="/products">
              <button className="shop-btn">
                Shop Now →
              </button>
            </Link>

            <Link to="/login">
              <button className="account-btn">
                Create Account
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats">

        <div>
          <h3>10K+</h3>
          <p>Products</p>
        </div>

        <div>
          <h3>50K+</h3>
          <p>Customers</p>
        </div>

        <div>
          <h3>99%</h3>
          <p>Satisfaction</p>
        </div>

        <div>
          <h3>24/7</h3>
          <p>Support</p>
        </div>

      </section>

      {/* PRODUCTS */}

      <section className="products">

        <div className="products-header">

          <h2>Featured Products</h2>

          <p className="view-all">
            View All →
          </p>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* PRODUCT GRID */}

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <div className="card" key={product.id}>

              <img
                src={product.image}
                alt={product.name}
              />

              <p className="product-category">
                {product.category}
              </p>

              <h3>{product.name}</h3>

              <p className="product-desc">
                {product.description}
              </p>

              <div className="product-bottom">

                <span className="price">
                  ₹{product.price}
                </span>

                <span className="stock">
                  {product.stock} left
                </span>

              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} added to cart`);
                }}
              >
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </section>
    </>
  );
}

/* =========================
   PRODUCTS PAGE
========================= */

function Products() {

  const { addToCart } = useContext(CartContext);

  return (
    <div className="products">

      <div className="products-header">
        <h2>All Products</h2>
      </div>

      <div className="product-grid">

        {products.map((product) => (

          <div className="card" key={product.id}>

            <img
              src={product.image}
              alt={product.name}
            />

            <p className="product-category">
              {product.category}
            </p>

            <h3>{product.name}</h3>

            <p className="product-desc">
              {product.description}
            </p>

            <div className="product-bottom">

              <span className="price">
                ₹{product.price}
              </span>

              <span className="stock">
                {product.stock} left
              </span>

            </div>

            <button
              onClick={() => {
                addToCart(product);
                alert(`${product.name} added to cart`);
              }}
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

/* =========================
   CART PAGE
========================= */

function Cart() {

  const { cart, setCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const removeItem = (indexToRemove) => {

    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);
  };

  const handleCheckout = () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const newOrder = {
      items: cart,
      total
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    );

    alert("Payment Successful");

    setCart([]);
  };

  return (
    <div className="cart-container">

      <h1 className="cart-title">
        Shopping Cart
      </h1>

      <div className="cart-box">

        {cart.length === 0 ? (

          <h2>Your cart is empty</h2>

        ) : (

          <>
            {cart.map((item, index) => (

              <div className="cart-item" key={index}>

                <div>

                  <h3>{item.name}</h3>

                  <p>{item.category}</p>

                </div>

                <div className="cart-actions">

                  <h3>₹{item.price}</h3>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            <div className="cart-total">
              Total: ₹{total}
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed To Payment
            </button>

          </>
        )}

      </div>

    </div>
  );
}

/* =========================
   LOGIN PAGE
========================= */

function Login() {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (!email || !password) {

      alert("Please fill all fields");

      return;
    }

    login({ email });

    alert("Login Successful");

    navigate("/");
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <Link
          to="/forgot-password"
          className="forgot-link"
        >
          Forgot Password?
        </Link>

      </div>

    </div>
  );
}

/* =========================
   FORGOT PASSWORD
========================= */

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleReset = () => {

    if (!email) {

      alert("Enter your email");

      return;
    }

    alert("Password reset link sent to email");
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleReset}>
          Send Reset Link
        </button>

      </div>

    </div>
  );
}

/* =========================
   ORDERS PAGE
========================= */

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

  return (
    <div className="page">

      <h1>Past Orders</h1>

      {orders.length === 0 ? (

        <p>No orders placed yet.</p>

      ) : (

        <div className="orders-container">

          {orders.map((order, index) => (

            <div
              className="order-card"
              key={index}
            >

              <h3>
                Order #{index + 1}
              </h3>

              {order.items.map((item, i) => (

                <div
                  className="order-item"
                  key={i}
                >

                  <p>{item.name}</p>

                  <p>₹{item.price}</p>

                </div>

              ))}

              <h2>
                Total: ₹{order.total}
              </h2>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

/* =========================
   MAIN APP
========================= */

function App() {

  const { cart } = useContext(CartContext);

  const { user, logout } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

  }, [darkMode]);

  return (
    <>
      {/* NAVBAR */}

      <div className="navbar">

        <div className="logo">
          Shop<span>Ease</span>
        </div>

        <ul>

          <li>
            <Link to="/">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products">
              Products
            </Link>
          </li>

          <li>
            <Link to="/cart">
              Cart ({cart.length})
            </Link>
          </li>

          <li>
            <Link to="/orders">
              Orders
            </Link>
          </li>

          {!user ? (

            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

          ) : (

            <li
              className="logout-btn"
              onClick={() => {
                logout();
                alert("Logged Out");
              }}
            >
              Logout
            </li>

          )}

          <li>
            <button
              className="dark-btn"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </li>

        </ul>

      </div>

      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Routes>

      {/* FOOTER */}

      <footer>

        <div className="footer-container">

          <div>

            <div className="footer-logo">
              ShopEase
            </div>

            <p className="footer-text">
              Your one-stop shop, delivered fast.
            </p>

          </div>

          <div>

            <h3 className="footer-title">
              Quick Links
            </h3>

            <div className="footer-links">

              <Link to="/">
                Home
              </Link>

              <Link to="/products">
                Products
              </Link>

              <Link to="/cart">
                Cart
              </Link>

              <Link to="/orders">
                Orders
              </Link>

            </div>

          </div>

          <div>

            <h3 className="footer-title">
              Support
            </h3>

            <div className="contact-info">

              <p>support@shopease.com</p>

              <p>1800-123-4567</p>

            </div>

          </div>

        </div>

        <div className="footer-bottom">
          © 2025 ShopEase • React • Node.js • MongoDB
        </div>

      </footer>
    </>
  );
}

export default App;