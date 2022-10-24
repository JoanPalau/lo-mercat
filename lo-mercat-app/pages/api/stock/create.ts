import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { updateOrCreate } from '../api_utils';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { product_id, farmer_id },
        method,
    } = req
    
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'PUT':
            let farmerId = farmer_id as string;
            let productId = product_id as string;
            let quantity = 30;
            let cost = 20;
            // Update or create data in your database

            let stock = await updateOrCreate({
                schema: prisma.stock,
                where: {
                    farmerId,
                    productId
                },
                update: {
                    quantity,
                    cost
                },
                create: {
                    quantity,
                    cost,
                    farmerId,
                    productId
                },
            }
        );

            res.status(200).json({ stock })
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}