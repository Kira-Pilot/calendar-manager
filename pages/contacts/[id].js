import React from 'react';
import Layout from '../../components/layout/Layout';

export default function Contact() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // returns a list of possible IDs
}

export async function getStaticProps({ params }) {
  // returns data for the contact
}
