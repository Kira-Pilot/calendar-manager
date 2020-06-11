import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout home>
      <h2>Welcome, Kira!</h2>
      <Link href="/contacts/contact-list">
        <a className="navButton" title="Go To Contacts">
          Go To Contacts
        </a>
      </Link>
    </Layout>
  );
}
