import React from "react";

const Product = props => {
  return (
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a href="/#" class="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          class="object-cover object-center w-full h-full block"
          src={props.image}
        />
      </a>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          {props.category}
        </h3>
        <h2 class="text-white title-font text-lg font-medium">{props.name}</h2>
        <p class="mt-1">${props.price}</p>
      </div>
      <button
        className="btn bg-green-600 hover:bg-green-700 my-2 text-white px-3 py-1 rounded-lg"
        onClick={props.handleClick}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
