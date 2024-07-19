import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Growing Up+</title>
        <meta name="description" content="Únete a Growing Up+!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="text-center my-5">
        <div class="container">
          <Image
            src="/images/banner.jpg"
            alt="Hero Image"
            width={800}
            height={400}
            class="img-fluid"
          />
          <h1 class="mt-4">¡Únete a Growing Up+!</h1>
        </div>
      </main>
    </div>
  );
}
