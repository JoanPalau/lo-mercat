// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Market = {
  id: number,
  name: string,
  location: string,
  description: string,
  schedule: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Market>>
) {
  res.status(200).json([
    {
      id: 123,
      name: 'Mercat Balafia',
      location: 'Balafia lol',
      description: 'Cool market',
      schedule: 'Every saturday'
    },
    {
      id: 124,
      name: 'Mercat Camp Esports',
      location: 'Camp Esports',
      description: 'Fast market',
      schedule: 'Every wednesday'
    },
  ])
}
