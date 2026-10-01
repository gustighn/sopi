import React, { useContext } from "react";
import { CartContext } from "../App";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const stateProvider = useContext(CartContext);
  const cartItems = stateProvider.cart || [];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <header className="text-gray-400 bg-gray-900 body-font sticky top-0 z-40 shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0 transform transition-transform hover:scale-105">
          <img src="/logo.png" alt="Sopi Logo" className="w-10 h-10 object-contain rounded-full bg-white p-1 shadow-sm" />
          <span className="ml-3 text-2xl font-bold tracking-wider">Sopi</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-6">
          <a href="#beranda" className="hover:text-white transition-colors hover:font-bold border-b-2 border-transparent hover:border-white pb-1">Beranda</a>
          <a href="#produk" className="hover:text-white transition-colors hover:font-bold border-b-2 border-transparent hover:border-white pb-1">Produk Kami</a>
          <a href="#promo" className="hover:text-white transition-colors hover:font-bold border-b-2 border-transparent hover:border-white pb-1">Promo Khusus</a>
          <a href="#tentang" className="hover:text-white transition-colors hover:font-bold border-b-2 border-transparent hover:border-white pb-1">Tentang Sopi</a>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="inline-flex items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-gray-700 rounded-lg text-base mt-4 md:mt-0 font-medium transition-transform hover:scale-105 group">
              <svg className="w-5 h-5 mr-2 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Keranjang: {cartItems.length}
            </button>
          </SheetTrigger>
          <SheetContent className="bg-gray-900 border-gray-800 text-white overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-white">Keranjang Belanja Anda</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-10">Keranjang masih kosong.</p>
              ) : (
                <>
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center bg-gray-800 p-3 rounded-lg relative">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-primary font-bold text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <button onClick={() => stateProvider.removeFromCart(index)} className="p-2 text-red-400 hover:text-red-500 hover:bg-gray-700 rounded-full transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-800 pt-4 mt-6">
                    <div className="flex justify-between items-center font-bold text-lg mb-4">
                      <span>Total:</span>
                      <span className="text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]">
                      Lanjutkan ke Pembayaran
                    </button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
