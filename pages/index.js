import Head from 'next/head';
import Image from 'next/image';


export default function Home() {
  return (
    <div>
    <Head>
      <title>Growing Up+</title>
      <meta name="description" content="Únete a Growing Up+!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="text-center my-5">
      <div className="container">
        <Image src="/images/banner.jpg" alt="Hero Image" width={800} height={400} className="img-fluid" />
        <h1 className="mt-4">¡Únete a Growing Up+!</h1>
      </div>
    </main>
  </div>
   
  );
}
