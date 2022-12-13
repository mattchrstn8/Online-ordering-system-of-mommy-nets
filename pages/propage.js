import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Productitem from '../components/Productitem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {
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
      title="Product Page"
      className="bg-color-black-200 grid md:grid-cols-4 md:gap-5"
    >
      <div className="card p-2 bg-yellow-500">
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
