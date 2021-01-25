import Head from "next/head";
import db from "../../../db.json";

export default function CustomHead() {
  return (
    <Head>
      <title>DemocraQuiz</title>
      <meta property="og:image" content={db.bg} key="image" />
    </Head>
  );
}
