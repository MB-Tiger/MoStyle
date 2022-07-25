import React from "react";
import Head from "next/head";

const PageHead = ({title, desc}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>
  );
};

export default PageHead;
