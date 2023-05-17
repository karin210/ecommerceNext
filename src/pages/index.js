import Head from "next/head";
import Layout from "@layouts/Layout";
import ProductItem from "components/ProductItem";
import styles from "@styles/Home.module.scss";
import db from "../../utils/db";
import Product from "../../models/Product.";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Homepage">
        <div className={styles.main}>
          {products.map((product) => (
            <ProductItem product={product} key={product.slug} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
