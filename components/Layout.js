import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/' });
  };
  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <Head>
        <title>{title ? title + ' - Mommynets' : 'Mommynets'}</title>
        <meta name="description" content="Online Ordering" />
        <link rel="icon" href="image/logo.png" />
      </Head>
      <ToastContainer position="buttom-center" limit={1}></ToastContainer>
      <div className="flex min-h-screen mx-10 bg-white rounded flex-col justify-between">
        <header>
          <nav className="flex h-20 items-center rounded-lg bg-orange-200 px-4 justify-between shadow-md">
            <Link href="/">
              <a>
                <div className="w-12 h-12">
                  <Image
                    src="/image/logo.png"
                    alt="logo"
                    width={400}
                    height={400}
                    layout="responsive"
                  />
                </div>
              </a>
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto hidden w-full justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-700 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>
            <Link href="/contact">
              <a className="p-2 text-lg font-bold bg-white-500 rounded-md shadow-lg">
                Contact
              </a>
            </Link>
            <Link href="/propage">
              <a className="p-2 text-lg font-bold bg-white-500 rounded-md shadow-lg">
                Product
              </a>
            </Link>
            <Link href="/aboutus">
              <a className="p-2 mr-4 text-lg font-bold bg-white-500 rounded-md shadow-lg">
                AboutUs
              </a>
            </Link>
            <div>
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-lg font-bold text-black-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 text-lg font-bold">Login/SignUp</a>
                </Link>
              )}
            </div>
            <Link href="/cart">
              <a className="p-2 ml-2 inline-flex items-center justify-center p-2 bg-yellow-500 rounded-md shadow-lg">
                🛍️
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </a>
            </Link>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="p-4 bg-orange-200 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-white-800">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-900">
            <b>© 2022 Mommynets Pastry. All Rights Reserved.</b>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Terms and Condition
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
