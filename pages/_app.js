import Head from "next/head";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
