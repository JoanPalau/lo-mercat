// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type OrderLine = {
  product_id: number,
  cost: number,
  quantity: number
}

type Order = {
  cost:number,
  lines:Array<OrderLine>
}

type Purchase = {
  date:Date,
  orders:Array<Order>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Purchase>>
) {
  res.status(200).json([
    {
      date: new Date(2022, 2, 10),
      orders: [
        {
          cost: 30,
          lines: [
            {
              product_id: 123,
              cost: 5,
              quantity: 2
            },
            {
              product_id: 129,
              cost: 10,
              quantity: 2
            }
          ]
        }
      ]
    },
    {
      date: new Date(2022, 2, 1),
      orders: [
        {
          cost: 30,
          lines: [
            {
              product_id: 123,
              cost: 5,
              quantity: 2
            },
            {
              product_id: 129,
              cost: 10,
              quantity: 2
            }
          ]
        },
        {
          cost: 100,
          lines: [
            {
              product_id: 139,
              cost: 50,
              quantity: 1
            },
            {
              product_id: 229,
              cost: 10,
              quantity: 5
            }
          ]
        },
      ]
    }
  ])
}
