// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  product_id: number,
  farmer_id: number,
  quantity: number,
  cost: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Product>>
) {
  res.status(200).json([
    {
      product_id: 123,
      farmer_id: 123,
      quantity: 30,
      cost: 10
    },
    {
      product_id: 123,
      farmer_id: 123,
      quantity: 30,
      cost: 20
    },
    {
      product_id: 129,
      farmer_id: 129,
      quantity: 30,
      cost: 30
    },
    {
      product_id: 139,
      farmer_id: 139,
      quantity: 30,
      cost: 40
    },
    {
      product_id: 229,
      farmer_id: 229,
      quantity: 30,
      cost: 50
    }
  ])
}
