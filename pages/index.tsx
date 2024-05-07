import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("/api/random-image");
        const data = await response.json();
        setRandomImage(data);
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };
if (typeof window !== "undefined") {
    fetchRandomImage();
  }
}, []);

  return (
    <>
      <Head>
        <title>Natur</title>
        <meta property="og:title" content="Natur" key="title" />
        <meta property="twitter:title" content="Natur" />
        <meta
          property="description"
          content="I took a walk in the forest and found myself surrounded by natur."
        />
        <meta
          property="og:description"
          content="I took a walk in the forest and found myself surrounded by natur."
        />
        <meta
          property="twitter:description"
          content="I took a walk in the forest and found myself surrounded by natur."
        />
        <meta property="og:url" content="https://natur.tom.so" />
        <meta property="og:image" content="og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="og.png" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        {randomImage ? (
          <div className="max-w-full">
            <Image
              src={randomImage.image.display.url}
              alt={randomImage.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
