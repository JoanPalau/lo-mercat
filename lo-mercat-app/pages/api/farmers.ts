// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Farmer = {
  id: number,
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Farmer>>
) {
  res.status(200).json([
    {
      id: 123,
      name: 'Pepito'
    },
    {
      id: 129,
      name: 'Alfredo'
    },
    {
      id: 139,
      name: 'Canada'
    },
    {
      id: 229,
      name: 'Barbacoa rica'
    }
  ])
}
