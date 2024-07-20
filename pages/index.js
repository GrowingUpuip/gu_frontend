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
      <main className="text-center my-5">
        <div className="container">
          <Image
            src="/images/banner.jpg"
            alt="Hero Image"
            width={800}
            height={400}
            className="img-fluid"
          />
          <h1 className="mt-4">¡Únete a Growing Up+!</h1>
          <p className="text-justify">
            La etapa universitaria es una fase crucial en el desarrollo personal
            y profesional de cualquier estudiante. Durante estos años, los
            eventos universitarios, las prácticas profesionales y los proyectos
            ofrecen oportunidades invaluables para crecer en diversos ámbitos.
            Los eventos universitarios, como seminarios, conferencias y
            hackatones, permiten a los estudiantes conectarse con expertos de la
            industria, adquirir conocimientos prácticos y expandir sus redes
            profesionales.
          </p>
        </div>
      </main>
    </div>
  );
}
