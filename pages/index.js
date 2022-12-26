/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Productitem from '../components/Productitem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';


export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry, the Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added to the cart');
  };
  return (
    <Layout
      title="Home Page"
      className="bg-color-black-200 grid md:grid-cols-4 md:gap-5"
    >
      <div className="grid md:grid-cols-4 md:gap-5 ">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-2">
            <Carousel showThumbs={false} autoPlay>
              {featuredProducts.map((product) => (
                <div key={product._id}>
                  <Link href={`/product/${product.slug}`} passHref>
                    <a className="flex">
                      <img src={product.banner} alt={product.name} />
                    </a>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="card p-2">
          <h1 className="text-center text-lg font-bold bg-orange-200 text-black">
            Overview
          </h1>
          <div className="overscroll-auto">
            <p>
              Our online ordering system is designed to make ordering your food
              as easy and convenient as possible. You can browse through our
              menu and add items to your cart, then checkout and pay all in one
              place. We accept all major credit cards and our system is secure
              so you can be confident your information is safe. Plus, we offer a
              100% satisfaction guarantee on all of our food, so if you&apos;re
              not happy with your order, just let us know and we&apos;ll make it
              right.
            </p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <h1 className="h2 my-3 text-lg text-center mx-10">
          <b>Our Products</b>
        </h1>
      </div>
      <div className="productss">
        <div className="grid grid-cols-1 gap-4 mx-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Productitem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
            ></Productitem>
          ))}
        </div>
      </div>
      <div className="container mt-4 mx-auto p-4 md:p-10">
        <h1 className="text-lg text-center font-bold">About Us</h1>
        <div className="shadow-lg  flex flex-wrap w-full lg:w-4/5 mx-auto">
          <div className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative">
            <img src="image/cake2.jpg"></img>
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
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
