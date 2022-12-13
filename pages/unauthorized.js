/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout tittle="Unathorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
