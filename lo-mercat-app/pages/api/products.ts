// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  id: number,
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Product>>
) {
  res.status(200).json([
    {
      id: 123,
      name: 'Apple'
    },
    {
      id: 129,
      name: 'Banana'
    },
    {
      id: 139,
      name: 'Strawberry'
    },
    {
      id: 229,
      name: 'Pineapple'
    }
  ])
}
