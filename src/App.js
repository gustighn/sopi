import "./App.css";
import Navbar from "./components/Navbar";
import ProductsPage from "./components/ProductsPage";
import Footer from "./components/Footer";
import { createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`${product.name} dimasukkan ke keranjang`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const stateProvider = { cart, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={stateProvider}>
      <div className="App relative min-h-screen">
        <Navbar />
        <ProductsPage />
        <Footer />

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              className="fixed bottom-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

export default App;
