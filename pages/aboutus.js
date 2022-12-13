/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Layout from '../components/Layout';
export default function aboutus() {
  return (
    <Layout>
      <div className="container mt-4 mx-auto p-4 md:p-10">
        <h1 className="text-lg text-center font-bold">About Us</h1>
        <div className="shadow-lg  flex flex-wrap w-full lg:w-4/5 mx-auto">
          <div className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative">
            <img src="image/logo.png"></img>
            <div className="absolute text-xl"></div>
          </div>
          <div className="bg-white w-full md:w-2/3">
            <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">
              <div className="rounded-lg bg-orange-200 lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
                <div className="w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left">
                  <p className="mb-0 mt-3 text-grey-dark text-sm italic"></p>
                </div>
                <div className="w-full lg:w-3/5 lg:px-3">
                  <p className="text-md mt-4  lg:mt-0 text-justify md:text-left text-sm">
                    A house bustling with life is not just an ordinary family.
                    Mommy Net&apos;s baked goods started to bring joy to their
                    very own home and paved their way to others- bringing not
                    only delicious goods but also happiness. Mommy Net&apos;s
                    first operated in October 2020 as a modest family-bakery
                    takeout located at Greenland Executive Village, Cainta,
                    Rizal, and all the products are made by hand. The product
                    portfolio of Mommy Net&apos;s includes different nutritious
                    bread, cupcakes, cakes, and customized pastries as per
                    order. Despite the pandemic, Mommy Net&apos;s who bakes and
                    serves with a heart will remain focused on market
                    development and adapt to provide the best possible service
                    to our clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
