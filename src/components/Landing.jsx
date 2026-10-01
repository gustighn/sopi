import React, {useContext} from "react";
import LandingProduct from "./LandingProduct";

import { CartContext } from "../App";

const Landing = () => {

  // Removed unused stateProvider
  return (
    <section class="text-gray-400 body-font bg-gray-900">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Catch up on the latest products!
            </h1>
            <div class="h-1 w-20 bg-green-500 rounded"></div>
          </div>
          <p class="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom prism
            food truck ugh squid celiac humblebrag.
          </p>
        </div>
        <div class="flex flex-wrap -m-4">
        <LandingProduct image="https://images.pexels.com/photos/4050325/pexels-photo-4050325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

        <LandingProduct image="https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

        <LandingProduct image="https://images.pexels.com/photos/3707744/pexels-photo-3707744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

        <LandingProduct image="https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
      </div>
    </section>
  );
};

export default Landing;