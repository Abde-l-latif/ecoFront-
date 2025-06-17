import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Signin from "./pages/Signin.jsx";
import Products from "./pages/Products.jsx";
import Help from "./pages/Help.jsx";
import Footer from "./components/Footer.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./reduxToolKit/store.js";
import ProtectedProfile from "./pages/ProtectedProfile.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Product from "./pages/Product.jsx";
import Checkout from "./pages/Checkout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="signin" element={<Signin />} />
            <Route path="products" element={<Products />} />
            <Route path="product" element={<Product />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="help" element={<Help />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<ProtectedProfile />}>
              <Route index element={<Profile />} />
            </Route>
          </Route>
        </Routes>

        <Footer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
