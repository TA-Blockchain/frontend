import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "max-age=0, s-maxage=31536000");

  const latPengirim = req.query.latPengirim as string;
  const longPengirim = req.query.longPengirim as string;
  const latPenerima = req.query.latPenerima as string;
  const longPenerima = req.query.longPenerima as string;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${latPenerima},${longPenerima}&origins=${latPengirim},${longPengirim}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  const data = await response.json();

  return res.status(200).json(data);
}
