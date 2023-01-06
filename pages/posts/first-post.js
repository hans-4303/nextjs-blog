import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Layout from "../../components/Layout";
import React from "react";

const FirstPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      ></Script>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to Home</Link>
      </h2>
    </Layout>
  );
};

export default FirstPost;