import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    let stockId = req.body.stockId as string;
    let orderId = req.body.orderId as string;
    let quantity: number = + (req.body.quantity as string);
    let cost: number = + (req.body.cost as string);
    let marketId: string = (req.body.marketId as string);
    let orderline = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'POST':
            let val : any = {
                stockId,
                orderId,
                quantity,
                cost,
                marketId
            }; 
            orderline = await prisma.orderLine.create({
                data: val
            }
            );

            res.status(200).json(orderline)
            break
        case 'GET':
            // Get Stands
            orderline = await prisma.orderLine.findMany();
            
            console.log("GET");
            res.status(200).json(orderline)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}