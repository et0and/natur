import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl = "https://api.are.na/v2/channels/natur/contents";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      // Handle non-successful response
      console.error(`API error: ${data.description}`);
      res.status(500).json({ message: "Error fetching random image" });
      return;
    }

    const imageContents = data.contents.filter(
      (content: any) => content.class === "Image"
    );

    if (imageContents.length === 0) {
      res.status(404).json({ message: "No images found" });
    } else {
      const randomIndex = Math.floor(Math.random() * imageContents.length);
      const randomImage = imageContents[randomIndex];
      res.status(200).json(randomImage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching random image" });
  }
}
