// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Stand = {
  farmer_id: number,
  market_id: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Stand>>
) {
  res.status(200).json([
    {
      farmer_id: 123,
      market_id: 123
    },
    {
      farmer_id: 123,
      market_id: 124
    },
    {
      farmer_id: 129,
      market_id: 124
    },
    {
      farmer_id: 229,
      market_id: 123
    },
    {
      farmer_id: 123,
      market_id: 124
    }
  ])
}
