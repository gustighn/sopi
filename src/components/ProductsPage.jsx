import React, {useContext} from "react";
import { ProductRevealCard } from "./ui/product-reveal-card";
import {Products} from "../Data/Products";

import { CartContext } from "../App";


const ProductsPage = () => {

  const stateProvider = useContext(CartContext);
  
  const handleAddToCart = (product) => {
    stateProvider.addToCart(product);
  }

  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <div class="container px-5 py-24 mx-auto">
        <h1 className="text-white mb-10 font-medium title-font text-2xl text-center">
          Produk Terbaru Kami
        </h1>

        <div class="flex flex-wrap -m-4">
          {Products.map(product => (
            <div key={product.id} className="p-4 flex justify-center w-full md:w-1/2 lg:w-1/4">
              <ProductRevealCard
                image={product.image}
                name={product.name}
                price={`Rp ${product.price.toLocaleString('id-ID')}`}
                originalPrice={`Rp ${product.originalPrice.toLocaleString('id-ID')}`}
                description={`Kategori: ${product.category}. Kualitas terbaik untuk Anda.`}
                onAdd={() => handleAddToCart(product)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
